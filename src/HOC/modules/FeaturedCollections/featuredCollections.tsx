import React, { FC, useMemo } from 'react';
import {
  FeaturedCollections as FeaturedCollectionsUI,
  FeaturedCollectionsData
} from 'ui/modules/FeaturedCollections';
import { useMe } from 'fe/session/me';
import { useInstanceFeatured } from 'fe/instance/featured/useInstanceFeatured';
import { DiscoverPageFeaturedCollectionInfoFragment } from 'HOC/pages/discover/DiscoverPage.generated';
import { CollectionBase } from 'ui/modules/FeaturedCollections/preview';
import { FeatureModalHOC } from '../FeatureModal/FeatureModal';

export interface FeaturedCollections {}
export const FeaturedCollections: FC<FeaturedCollections> = () => {
  const { isAdmin } = useMe();
  const { featuredCollectionsPage } = useInstanceFeatured();
  const featuredCollections = useMemo<CollectionBase[]>(
    () =>
      featuredCollectionsPage.edges
        .map(feature => feature.context)
        .filter(
          //FIXME: remove when fixed nullable context
          (maybeCtx): maybeCtx is DiscoverPageFeaturedCollectionInfoFragment =>
            !!maybeCtx && maybeCtx.__typename === 'Collection'
        )
        .map<CollectionBase>(collection => ({
          ...collection,
          icon: collection.icon || ''
        })),
    [featuredCollectionsPage]
  );

  const FeaturedModal = useMemo<FeaturedCollectionsData['FeaturedModal']>(
    () => ({ collection, done }) => {
      const collectionFeature = featuredCollectionsPage.edges.find(
        feature =>
          feature.context?.__typename === 'Collection' && //FIXME: remove ? when fixed
          feature.context.id === collection.id
      );
      const featureId = collectionFeature?.id;
      return (
        <FeatureModalHOC ctx={collection} done={done} featureId={featureId} />
      );
    },
    [featuredCollections]
  );

  const propsUI = useMemo<FeaturedCollectionsData>(() => {
    const props: FeaturedCollectionsData = {
      FeaturedModal,
      featuredCollections,
      isAdmin
    };
    return props;
  }, [isAdmin, featuredCollections, FeaturedModal]);

  return <FeaturedCollectionsUI {...propsUI} />;
};
