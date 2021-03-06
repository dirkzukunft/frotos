import React from 'react';
import { useHistory } from 'react-router';
import type { Image } from '../../../lib/types/image';
import useCollections from '../../hooks/useCollections';
import useCurrentUser from '../../hooks/useCurrentUser';
import useImageCollections from '../../hooks/useImageCollections';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import styles from './ImageCollections.module.css';

export type ImageCollectionsProps = {
  image: Image | null;
  className?: string;
};

export default function ImageCollections({
  image,
  className = '',
}: ImageCollectionsProps): JSX.Element {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const userCollections = useCollections(currentUser);
  const { collections, addToCollection, removeFromCollection } = useImageCollections(
    image,
    userCollections
  );

  return !currentUser ? (
    <>
      <div className={styles.signupNotice}>
        You have to sign up to add this image to a collections.
      </div>
      <Button icon="login" text="Sign up" onClick={() => history.push('/profile')} />
    </>
  ) : (
    <div className={className}>
      <ul>
        {collections &&
          collections.map((collection) => (
            <li className={styles.item} key={collection._id} id={collection._id}>
              <Checkbox
                checked={collection.hasSelectedImage}
                onChange={() =>
                  collection.hasSelectedImage
                    ? removeFromCollection(collection)
                    : addToCollection(collection)
                }
              >
                <div className={styles.itemBox}>
                  <div>
                    {collection.collectionName}
                    {collection.imageCount !== undefined && (
                      <span className={styles.imageCount}>{collection.imageCount} Images</span>
                    )}
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${
                        collection.imageCount ? collection.lastImage?.[0].image.thumbnail : ``
                      })`,
                    }}
                    className={styles.image}
                  ></div>
                </div>
              </Checkbox>
            </li>
          ))}
      </ul>
    </div>
  );
}
