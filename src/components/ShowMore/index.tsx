import React from 'react';
import styles from './showmore.module.css';

type Props = {
  onClick: () => void;
};
const ShowMore: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={`button is-small ${styles.showMore}`} onClick={onClick}>
      Show More
    </button>
  );
};

export default ShowMore;
