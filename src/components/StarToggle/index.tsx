import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleStar } from '../../features/starredSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlinedStar } from '@fortawesome/free-regular-svg-icons';
import styles from './startoggle.module.css';

const mainBrandColor = '#FE7139';

type StarToggleType = {
  id: number;
};
const StarToggle: React.FC<StarToggleType> = ({ id }) => {
  const dispatch = useDispatch();
  const starredItems = useSelector(
    (state: RootState) => state.starred.starredItems,
  );
  const isStarred = starredItems.includes(id);
  const starIcon = isStarred ? solidStar : outlinedStar;
  const buttonLabel = isStarred ? 'Saved' : 'Save';
  const handleStarClick = () => {
    dispatch(toggleStar(id));
  };

  return (
    <button
      aria-label={isStarred ? 'Unsave this item' : 'Save this item'}
      onClick={handleStarClick}
      className={styles.starButton}
    >
      <FontAwesomeIcon
        icon={starIcon}
        color={isStarred ? mainBrandColor : ''}
        size="sm"
        className={styles.starIcon}
      />
      {buttonLabel}
    </button>
  );
};

export default StarToggle;
