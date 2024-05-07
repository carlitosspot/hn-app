import React from 'react';

export interface NewsItemProps {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, url, by, time, score }) => {
  const date = new Date(time * 1000).toLocaleDateString();
  return (
    <div className="box" style={{ boxShadow: 'none', border: 'none' }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <strong>{title}</strong>
      </a>
      <div>
        <small>by {by}</small> | <small>{date}</small> | <small>{score} points</small>
      </div>
    </div>
  )
};

export default NewsItem;
