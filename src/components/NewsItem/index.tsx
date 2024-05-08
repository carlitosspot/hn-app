import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import styles from './newsitem.module.css';
import { IStory } from '../../api/hnApi.ts';
import StarToggle from '../StarToggle';

const Index: React.FC<IStory> = ({
  id,
  title,
  url,
  by,
  time,
  score,
  descendants,
  index = 0,
}) => {
  const itemSource = URL.canParse(url) ? new URL(url) : null;
  const itemUrl = itemSource ? itemSource.origin : '';

  return (
    <div className={`box ${styles.container}`}>
      <div className={styles.content}>
        <span className={styles.itemNumber}>{index + 1}. </span>
        <div className={styles.textContainer}>
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
          </div>
          <div className={styles.metadata}>
            <span>
              {score} points by {by}
              {formatDistanceToNow(new Date(time * 1000))} ago
            </span>
            <span>|</span>
            <Link to={`/details/${id}`}>
              <span className={styles.comments}>{descendants} comments</span>
            </Link>
            <span>|</span>
            <StarToggle id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
