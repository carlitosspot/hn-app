import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
import { toggleStar } from '../../features/starredSlice.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import styles from './newsitem.module.css';

export interface NewsItemProps {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
}

const Index: React.FC<NewsItemProps> = ({
  id,
  title,
  url,
  by,
  time,
  score,
  descendants,
}) => {
  const dispatch = useDispatch();
  const starredItems = useSelector(
    (state: RootState) => state.starred.starredItems,
  );
  const isStarred = starredItems.includes(id);
  const buttonLabel = isStarred ? 'Saved' : 'Save';
  const itemSource = URL.canParse(url) ? new URL(url) : null;
  const itemUrl = itemSource ? itemSource.origin : '';

  const handleStarClick = () => {
    dispatch(toggleStar(id));
  };

  return (
    <div className={`box ${styles.container}`}>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.title}
        >
          {title}
        </a>
        {itemUrl && <span className={styles.itemUrl}>({itemUrl})</span>}
        <div className={styles.metadata}>
          <span>
            {score} points by {by} {formatDistanceToNow(new Date(time * 1000))}
            ago
          </span>
          <span>|</span>
          <span>{descendants} comments</span>
          <span>|</span>
          <button
            aria-label={isStarred ? 'Unsave this item' : 'Save this item'}
            onClick={handleStarClick}
            className={styles.starButton}
          >
            <FontAwesomeIcon
              icon={faStar}
              color={isStarred ? '#FE7139' : 'grey'}
              size="sm"
              className={styles.starIcon}
            />
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
