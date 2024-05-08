import React from 'react';
const EmptyList: React.FC = () => {
  return (
    <div className="card">
      <div className="card-content">
        <p className="subtitle">
          You don't have anything saved yet. Start saving your favorite posts
          and find them here later
        </p>
      </div>
    </div>
  );
};

export default EmptyList;
