import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { createHttpLink } from 'apollo-link-http';
import { hasSubscription } from '@jumpn/utils-graphql';
import apolloLogger from 'apollo-link-logger';
import * as AbsintheSocket from '@absinthe/socket';
const introspectionQueryResultData = require('../fragmentTypes.json');
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import {
  GRAPHQL_ENDPOINT,
  PHOENIX_SOCKET_ENDPOINT,
  LOCAL_STORAGE_USER_ACCESS_TOKEN,
  IS_DEV
} from '../constants';

import { onError } from 'apollo-link-error';

// const { meQuery } = require('../graphql/me.graphql');
const { setUserMutation } = require('../graphql/setUser.client.graphql');

export default async function initialise() {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({ fragmentMatcher });
  let token = localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
  const defaults = {
    user: {
      __typename: 'User',
      isAuthenticated: !!token
      // data: user ? JSON.parse(user) : null
    }
  };

  const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
    typeDefs
  });

  /**
   * This context link is used to assign the necessary Authorization header
   * to all HTTP requests to the GraphQL backend. In the case that the user
   * is authenticated it sets their access token as the value, otherwise null.
   */
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from localstorage if it exists
    let token = localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    };
  });

  function handleError(message) {
    alert(message); //TODO: nicer display of errors
  }

  function handleErrorGraphQL(message, locations, path) {
    console.log(
      `! GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
    );

    if (!message.includes('You need to log in first')) {
      // don't display this error - we redirect to login screen instead
      handleError(message);
    }
  }

  const errorLink = onError(
    ({ operation, response, graphQLErrors, networkError }) => {
      // console.log( 'errorLink', operation, response );

      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          handleErrorGraphQL(message, locations, path)
        );
      }

      if (networkError) {
        console.log(`! Network error: ${networkError}`);
        handleError(networkError);
      }
    }
  );

  const headersLink = setContext((_, ctx) => {
    const { headers } = ctx;
    return {
      ...ctx,
      clientAwareness: undefined,
      headers: {
        ...headers
      }
    };
  });

  // used for graphql query and mutations
  const httpLink = ApolloLink.from(
    [
      IS_DEV ? apolloLogger : null,
      errorLink,
      stateLink,
      authLink,
      headersLink,
      createHttpLink({ uri: GRAPHQL_ENDPOINT })
    ].filter(Boolean)
  );

  // used for graphql subscriptions
  const absintheSocket = createAbsintheSocketLink(
    AbsintheSocket.create(new PhoenixSocket(PHOENIX_SOCKET_ENDPOINT))
  );

  // if the operation is a subscription then use
  // the absintheSocket otherwise use the httpLink
  const link = ApolloLink.split(
    operation => hasSubscription(operation.query),
    absintheSocket,
    httpLink
  );

  const client = new ApolloClient({
    cache,
    link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  });

  // interface MeQueryResult extends ApolloQueryResult<object> {
  //   // TODO don't use any type
  //   me: any;
  // }

  /**
   * Initialise the Apollo client by fetching the logged in user
   * if the user has an existing token in local storage.
   * @returns {ApolloClient} the apollo client
   */
  let localUser;

  try {
    // const result = await client.query<MeQueryResult>({
    //   query: meQuery
    // });
    // console.log('logged in');
    // console.log(result);
    localUser = {
      isAuthenticated: true
      // data: {
      //   ...result.data.me.user,
      //   email: result.data.me.email
      // }
    };
  } catch (err) {
    console.log('err');
    console.error(err.message);

    if (err.message.includes('You are not logged in')) {
      localStorage.removeItem('user_access_token');
    } else {
      //TODO handle unknown error / warn user?
    }

    localUser = {
      isAuthenticated: false
      // data: null
    };
  }

  await client.mutate({
    variables: localUser,
    mutation: setUserMutation
  });

  return client;
}
