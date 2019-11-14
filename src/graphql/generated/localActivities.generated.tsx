import * as Types from '../types.d';

import { BasicResourceFragment } from '../fragments/generated/basicResource.generated';
import { BasicCollectionFragment } from '../fragments/generated/basicCollection.generated';
import { BasicCommentFragment } from '../fragments/generated/basicComment.generated';
import { BasicCommunityFragment } from '../fragments/generated/basicCommunity.generated';
import { BasicUserFragment } from '../fragments/generated/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from '../fragments/generated/basicUser.generated';
import { BasicCommunityFragmentDoc } from '../fragments/generated/basicCommunity.generated';
import { BasicCommentFragmentDoc } from '../fragments/generated/basicComment.generated';
import { BasicCollectionFragmentDoc } from '../fragments/generated/basicCollection.generated';
import { BasicResourceFragmentDoc } from '../fragments/generated/basicResource.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type LocalActivitiesQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>;
  end?: Types.Maybe<Types.Scalars['String']>;
};

export type LocalActivitiesQuery = { __typename?: 'RootQueryType' } & {
  instance: Types.Maybe<
    { __typename?: 'Instance' } & {
      outbox: Types.Maybe<
        { __typename?: 'ActivitiesEdges' } & {
          pageInfo: { __typename?: 'PageInfo' } & Pick<
            Types.PageInfo,
            'startCursor' | 'endCursor'
          >;
          edges: Types.Maybe<
            Array<
              Types.Maybe<
                { __typename?: 'ActivitiesEdge' } & Pick<
                  Types.ActivitiesEdge,
                  'cursor'
                > & {
                    node: Types.Maybe<
                      { __typename?: 'Activity' } & Pick<
                        Types.Activity,
                        | 'id'
                        | 'canonicalUrl'
                        | 'verb'
                        | 'isLocal'
                        | 'isPublic'
                        | 'createdAt'
                      > & {
                          user: Types.Maybe<
                            { __typename?: 'User' } & BasicUserFragment
                          >;
                          context: Types.Maybe<
                            | ({
                                __typename?: 'Collection';
                              } & BasicCollectionFragment)
                            | ({
                                __typename?: 'Comment';
                              } & BasicCommentFragment)
                            | ({
                                __typename?: 'Community';
                              } & BasicCommunityFragment)
                            | ({
                                __typename?: 'Resource';
                              } & BasicResourceFragment)
                          >;
                        }
                    >;
                  }
              >
            >
          >;
        }
      >;
    }
  >;
};

export const LocalActivitiesDocument = gql`
  query localActivities($limit: Int, $end: String) {
    instance {
      outbox(limit: $limit, after: $end) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            canonicalUrl
            verb
            isLocal
            isPublic
            createdAt
            user {
              ...BasicUser
            }
            context {
              __typename
              ... on Community {
                ...BasicCommunity
              }
              ... on Comment {
                ...BasicComment
              }
              ... on Collection {
                ...BasicCollection
              }
              ... on Resource {
                ...BasicResource
              }
            }
          }
        }
      }
    }
  }
  ${BasicUserFragmentDoc}
  ${BasicCommunityFragmentDoc}
  ${BasicCommentFragmentDoc}
  ${BasicCollectionFragmentDoc}
  ${BasicResourceFragmentDoc}
`;
export type LocalActivitiesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >,
  'query'
>;

export const LocalActivitiesComponent = (
  props: LocalActivitiesComponentProps
) => (
  <ApolloReactComponents.Query<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >
    query={LocalActivitiesDocument}
    {...props}
  />
);

export type LocalActivitiesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  LocalActivitiesQuery,
  LocalActivitiesQueryVariables
> &
  TChildProps;
export function withLocalActivities<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables,
    LocalActivitiesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables,
    LocalActivitiesProps<TChildProps>
  >(LocalActivitiesDocument, {
    alias: 'localActivities',
    ...operationOptions
  });
}

/**
 * __useLocalActivitiesQuery__
 *
 * To run a query within a React component, call `useLocalActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useLocalActivitiesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >(LocalActivitiesDocument, baseOptions);
}
export function useLocalActivitiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LocalActivitiesQuery,
    LocalActivitiesQueryVariables
  >(LocalActivitiesDocument, baseOptions);
}
export type LocalActivitiesQueryHookResult = ReturnType<
  typeof useLocalActivitiesQuery
>;
export type LocalActivitiesLazyQueryHookResult = ReturnType<
  typeof useLocalActivitiesLazyQuery
>;
export type LocalActivitiesQueryResult = ApolloReactCommon.QueryResult<
  LocalActivitiesQuery,
  LocalActivitiesQueryVariables
>;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'ActivityContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FlagContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Community'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'LikeContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Resource'
          },
          {
            name: 'User'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'ThreadContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Flag'
          },
          {
            name: 'Resource'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'FollowContext',
        possibleTypes: [
          {
            name: 'Collection'
          },
          {
            name: 'Community'
          },
          {
            name: 'Thread'
          },
          {
            name: 'User'
          }
        ]
      }
    ]
  }
};

export default result;
