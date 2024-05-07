import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store.ts';
import { fetchStory } from '../api/hnApi.ts';
import NewsItem, { NewsItemProps } from '../components/NewsItem';

const StarredPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);
  const starredItems = useSelector(
    (state: RootState) => state.starred.starredItems,
  );

  useEffect(() => {
    async function loadData() {
      const stories: NewsItemProps[] = await Promise.all(
        starredItems.map(id => fetchStory(id)),
      );
      setNewsItems(stories);
    }
    loadData();
  }, [starredItems]);

  return (
    <div>
      {newsItems.map(story => (
        <NewsItem key={story.id} {...story} />
      ))}
    </div>
  );
};

export default StarredPage;
