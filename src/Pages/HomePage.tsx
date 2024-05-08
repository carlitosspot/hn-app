import React, { useEffect, useState } from 'react';
import { fetchTopStories, fetchStory } from '../api/hnApi.ts';
import NewsItem, { NewsItemProps } from '../components/NewsItem';
import Skeleton from 'react-loading-skeleton';

const HomePage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);

  useEffect(() => {
    async function loadData() {
      const ids = (await fetchTopStories()) as number[];
      const topTenIds = ids.slice(0, 20);
      const stories: NewsItemProps[] = await Promise.all(
        topTenIds.map(id => fetchStory(id)),
      );
      setNewsItems(stories);
    }
    loadData();
  }, []);

  return (
    <div>
      {newsItems.map((story, index) => (
        <NewsItem key={story.id} {...story} index={index} />
      ))}
      {!newsItems.length && <Skeleton count={20} height={60} />}
    </div>
  );
};

export default HomePage;
