import React from 'react';
import styles from './SearchResultImage.module.css';
import type { image } from '../../../api/apis';
import Button from '../Button/Button';

export type SearchResultImageProps = {
  image: image;
  inCollection?: boolean;
  onClick: () => void;
  onCollectionClick: () => void;
  className?: string;
};

export default function SearchResultImage({
  image,
  inCollection = false,
  onClick,
  onCollectionClick,
  className = '',
}: SearchResultImageProps): JSX.Element {
  const { urlSource, author, urlAuthor, thumbnail, api } = image;

  return (
    <article className={`${styles.container} ${className}`}>
      <div className={styles.thumbnailWrapper}>
        <img src={thumbnail} className={styles.thumbnail} onClick={onClick} />
        <Button
          className={styles.collectionButton}
          icon={inCollection ? 'collectionAdded' : 'collectionAdd'}
          color={inCollection ? 'mediumGradient' : undefined}
          inactive={inCollection}
          small
          onClick={onCollectionClick}
        />
      </div>
      <span className={styles.author}>
        &copy;&nbsp;
        {urlAuthor ? (
          <a href={urlAuthor} target="_blank" className={styles.authorLink}>
            {author}
          </a>
        ) : (
          author
        )}
      </span>
      <span className={styles.api}>
        {urlSource ? (
          <a href={urlSource} target="_blank" className={styles.authorLink}>
            {api}
          </a>
        ) : (
          api
        )}
      </span>
    </article>
  );
}