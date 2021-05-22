import * as React from 'react';
import { FC } from 'react';
import { useActionsQuery } from '../IntentPanel/Actions.generated';

import EconomicEventManager, {
  EconomicEventManagerProps
} from '../../../ui/modules/EconomicEventManager';
import {
  useEconomicEventsFilteredQuery,
  useUnitsPagesQuery
} from './EconomicEventManager.generated';

export const EconomicEventManagerHOC: FC = () => {
  const [providerList, setProviderList] = React.useState<
    null | undefined | [] | { id: string; name: string }[]
  >([]);
  const [receiverList, setReceiverList] = React.useState<
    null | undefined | [] | { id: string; name: string }[]
  >([]);
  const [action, setAction] = React.useState('');

  const intentActionsQ = useActionsQuery();
  const { data } = useEconomicEventsFilteredQuery({
    variables: { action }
  });

  React.useEffect(() => {
    const providers =
      data && data.economicEventsFiltered && data?.economicEventsFiltered.map(el => el.provider);
    const receivers =
      data && data.economicEventsFiltered && data?.economicEventsFiltered.map(el => el.receiver);
    providers?.length && setProviderList(providers || null);
    receivers?.length && setReceiverList(receivers || []);
  }, [data]);

  const unitPagesQ = useUnitsPagesQuery();

  const intentActions = intentActionsQ.data?.actions;
  const unitPages = unitPagesQ.data?.unitsPages;
  const economicEventManager: EconomicEventManagerProps = {
    actionList: intentActions,
    providerList: providerList,
    receiverList: receiverList,
    unitPages,
    setAction
  };

  return <EconomicEventManager {...economicEventManager} />;
};
