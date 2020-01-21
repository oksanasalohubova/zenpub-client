// View a Community (with list of collections)

import { Trans } from '@lingui/macro';
import { useGetAgentQueryQuery } from 'graphql/getAgent.generated';
import { ActivityPreviewHOC } from 'HOC/modules/ActivityPreview/activityPreviewHOC';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { Button } from 'rebass/styled-components';
import CollectionCard from '../../components/elements/Collection/Collection';
import CommunityCard from '../../components/elements/Community/Community';
import Loader from '../../components/elements/Loader/Loader';
// import FollowingCollectionsLoadMore from '../../components/elements/Loadmore/followingCollections';
// import JoinedCommunitiesLoadMore from '../../components/elements/Loadmore/joinedCommunities';
// import LoadMoreTimeline from '../../components/elements/Loadmore/timelineoutbox';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { Nav, Panel, PanelTitle, WrapperPanel } from '../../sections/panel';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';
import { OverlayTab, WrapperTab } from '../communities.community/Community';
import { List, ListCollections } from '../Profile';
import HeroComp from '../Profile/Hero';

const Follow = styled(Button)`
  color: ${props => props.theme.colors.orange};
  display: block;
  width: 100%;
  background: ${props => props.theme.colors.lighter};
  border: 2px solid ${props => props.theme.colors.orange};
  cursor: pointer;
`;

enum TabsEnum {
  Overview = 'Overview',
  Communities = 'Joined communities',
  Collections = 'Followed collections'
}

interface Props {
  userId: string;
}

const CommunitiesFeatured: React.SFC<Props> = ({ userId }) => {
  const query = useGetAgentQueryQuery({
    variables: {
      userId: userId,
      limitComm: 15,
      limitColl: 15,
      limitTimeline: 15
    }
  });
  const { /* fetchMore, */ data, loading, error } = query;

  return (
    <MainContainer>
      <HomeBox>
        {loading ? (
          <Loader />
        ) : error || !data || !data.user ? (
          <span>
            <Trans>Error loading user</Trans>
          </span>
        ) : (
          <>
            <WrapperCont>
              <Wrapper>
                <HeroComp user={data.user} />

                <WrapperTab>
                  <OverlayTab>
                    <Tabs>
                      <SuperTabList>
                        <SuperTab>
                          <h5>
                            <Trans>Recent activities</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <h5>
                            <Trans>Followed Collections</Trans>
                          </h5>
                        </SuperTab>
                        <SuperTab>
                          <h5>
                            <Trans>Joined Communities</Trans>
                          </h5>
                        </SuperTab>
                      </SuperTabList>
                      <TabPanel>
                        <div>
                          {data.user.outbox.edges.map(
                            (t, i) =>
                              t && (
                                <ActivityPreviewHOC
                                  activityId={t.node.id}
                                  key={t.node.id}
                                />
                              )
                          )}
                          {/* <LoadMoreTimeline
                            fetchMore={fetchMore}
                            community={data.user}
                          /> */}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <>
                          <ListCollections>
                            {data.user.followedCollections.edges.map(
                              (collection, i) =>
                                collection && (
                                  <CollectionCard
                                    key={i}
                                    collection={collection.node.collection}
                                  />
                                )
                            )}
                          </ListCollections>
                          {/* <FollowingCollectionsLoadMore
                            collections={data.user.followedCollections}
                            fetchMore={fetchMore}
                          /> */}
                        </>
                      </TabPanel>
                      <TabPanel
                        label={`${TabsEnum.Communities}`}
                        key={TabsEnum.Communities}
                        style={{ height: '100%' }}
                      >
                        <>
                          <List>
                            {data.user.followedCommunities.edges.map(
                              (community, i) =>
                                community && (
                                  <CommunityCard
                                    key={i}
                                    summary={
                                      community.node.community.summary || ''
                                    }
                                    title={community.node.community.name}
                                    collectionsCount={
                                      community.node.community.collections
                                        .totalCount
                                    }
                                    threadsCount={
                                      community.node.community.threads
                                        .totalCount
                                    }
                                    icon={
                                      community.node.community.icon ||
                                      community.node.community.image ||
                                      ''
                                    }
                                    followed={
                                      !!community.node.community.myFollow
                                    }
                                    id={community.node.community.id}
                                    externalId={
                                      community.node.community.canonicalUrl ||
                                      ''
                                    }
                                    followersCount={
                                      community.node.community.followers
                                        .totalCount
                                    }
                                  />
                                )
                            )}
                          </List>
                          {/* <JoinedCommunitiesLoadMore
                            communities={data.user.followedCommunities}
                            fetchMore={fetchMore}
                          /> */}
                        </>
                      </TabPanel>
                    </Tabs>
                  </OverlayTab>
                </WrapperTab>
              </Wrapper>
            </WrapperCont>
          </>
        )}
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <Follow variant={'outline'}>
            <Trans>Follow</Trans>
          </Follow>
        </Panel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Links</Trans>
          </PanelTitle>
          <Nav />
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

export default CommunitiesFeatured;
