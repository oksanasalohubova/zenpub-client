import { useInstanceFeaturedCollections } from 'fe/instance/featuredCollections/useInstanceFeaturedCollections';
import { useMe } from 'fe/session/useMe';
import React, { FC, useMemo, useReducer, useState } from 'react';
import {
  FeaturedCollections as FeaturedCollectionsUI,
  FeaturedCollectionsData
} from 'ui/modules/FeaturedCollections';
import CollectionSmall, { CollectionProps } from 'ui/modules/FeaturedCollections/preview';
import Modal from 'ui/modules/Modal';
import { FeatureModalHOC } from '../FeatureModal/FeatureModal';
import { CollectionFeatureFragment } from './featuredCollection.generated';

export interface FeaturedCollections {}
export const FeaturedCollections: FC<FeaturedCollections> = () => {
  const { isAdmin } = useMe();
  const { featuredCollectionsPage } = useInstanceFeaturedCollections();

  const [isEditing, toggleEdit] = useReducer(prev => !prev, false);
  const [
    selectedFeatureToRemove,
    setSelectedFeatureToRemove
  ] = useState<CollectionFeatureFragment | null>(null);

  const featuredCollections = useMemo<JSX.Element[]>(
    () =>
      featuredCollectionsPage.edges
        .map(feature => {
          const collectionFragment = feature.context;
          if (!collectionFragment || collectionFragment.__typename !== 'Collection') {
            return null;
          }
          const collection = {
            ...collectionFragment,
            icon: collectionFragment.icon?.url || ''
          };

          const props: CollectionProps = {
            collection,
            canEdit: isAdmin,
            isEditing,
            remove: () => setSelectedFeatureToRemove(feature)
          };
          return <CollectionSmall key={collectionFragment.id} {...props} />;
        })
        .filter((_): _ is JSX.Element => !!_),
    [featuredCollectionsPage.edges, isAdmin, isEditing]
  );

  const RemoveFeaturedModal = useMemo(
    () =>
      selectedFeatureToRemove &&
      selectedFeatureToRemove.context?.__typename === 'Collection' && (
        <Modal closeModal={() => setSelectedFeatureToRemove(null)}>
          <FeatureModalHOC
            ctx={selectedFeatureToRemove.context}
            done={() => setSelectedFeatureToRemove(null)}
            featureId={selectedFeatureToRemove.id}
          />
        </Modal>
      ),
    [selectedFeatureToRemove]
  );

  const propsUI = useMemo<FeaturedCollectionsData>(() => {
    const props: FeaturedCollectionsData = {
      featuredCollections,
      isEditing,
      toggleEdit,
      canEdit: isAdmin
    };
    return props;
  }, [featuredCollections, isEditing, isAdmin]);

  return (
    <>
      {RemoveFeaturedModal}
      <FeaturedCollectionsUI {...propsUI} />
    </>
  );
};
