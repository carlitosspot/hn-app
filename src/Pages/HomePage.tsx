import React, { useEffect, useState } from 'react';
import { fetchTopStories, fetchStory } from '../api/hnApi.ts';
import Index, { NewsItemProps } from '../components/NewsItem';

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
        <Index key={story.id} {...story} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
