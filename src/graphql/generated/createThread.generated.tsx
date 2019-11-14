import * as Types from '../types.d';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CreateThreadMutationMutationVariables = {
  contextId: Types.Scalars['String'];
  comment: Types.CommentInput;
};

export type CreateThreadMutationMutation = {
  __typename?: 'RootMutationType';
} & {
  createThread: Types.Maybe<
    { __typename?: 'Comment' } & Pick<
      Types.Comment,
      | 'id'
      | 'canonicalUrl'
      | 'inReplyToId'
      | 'content'
      | 'isLocal'
      | 'isPublic'
      | 'isHidden'
      | 'createdAt'
      | 'updatedAt'
    > & {
        creator: Types.Maybe<
          { __typename?: 'User' } & Pick<Types.User, 'name' | 'icon'>
        >;
        thread: Types.Maybe<
          { __typename?: 'Thread' } & Pick<Types.Thread, 'id'>
        >;
      }
  >;
};

export const CreateThreadMutationDocument = gql`
  mutation createThreadMutation($contextId: String!, $comment: CommentInput!) {
    createThread(contextId: $contextId, comment: $comment) {
      id
      canonicalUrl
      inReplyToId
      content
      isLocal
      isPublic
      isHidden
      createdAt
      updatedAt
      creator {
        name
        icon
      }
      thread {
        id
      }
    }
  }
`;
export type CreateThreadMutationMutationFn = ApolloReactCommon.MutationFunction<
  CreateThreadMutationMutation,
  CreateThreadMutationMutationVariables
>;
export type CreateThreadMutationComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables
  >,
  'mutation'
>;

export const CreateThreadMutationComponent = (
  props: CreateThreadMutationComponentProps
) => (
  <ApolloReactComponents.Mutation<
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables
  >
    mutation={CreateThreadMutationDocument}
    {...props}
  />
);

export type CreateThreadMutationProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateThreadMutationMutation,
  CreateThreadMutationMutationVariables
> &
  TChildProps;
export function withCreateThreadMutation<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables,
    CreateThreadMutationProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables,
    CreateThreadMutationProps<TChildProps>
  >(CreateThreadMutationDocument, {
    alias: 'createThreadMutation',
    ...operationOptions
  });
}

/**
 * __useCreateThreadMutationMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutationMutation, { data, loading, error }] = useCreateThreadMutationMutation({
 *   variables: {
 *      contextId: // value for 'contextId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateThreadMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateThreadMutationMutation,
    CreateThreadMutationMutationVariables
  >(CreateThreadMutationDocument, baseOptions);
}
export type CreateThreadMutationMutationHookResult = ReturnType<
  typeof useCreateThreadMutationMutation
>;
export type CreateThreadMutationMutationResult = ApolloReactCommon.MutationResult<
  CreateThreadMutationMutation
>;
export type CreateThreadMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateThreadMutationMutation,
  CreateThreadMutationMutationVariables
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
