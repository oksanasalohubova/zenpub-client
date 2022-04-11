import * as GQL from './useUser.generated';
import { useMe } from 'fe/session/useMe';
import { useMemo } from 'react';

export const useUser = (userName: string) => {
  const userQ = GQL.useUserDataQuery({ variables: { username: userName } });
  const { me } = useMe();

  const user = userQ.data?.user;
  const isMe = useMemo(() => !!(me?.users && me?.users[0] && me?.users[0].id === user?.id), [
    me,
    user
  ]);

  return {
    isMe,
    user
  };
};
