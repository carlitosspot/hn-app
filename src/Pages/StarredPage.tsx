import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store.ts';
import { fetchStory } from '../api/hnApi.ts';
import NewsItem, { NewsItemProps } from '../components/NewsItem';
import Skeleton from 'react-loading-skeleton';
import EmptyList from '../components/EmptyList';

const StarredPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);
  const starredItems = useSelector(
    (state: RootState) => state.starred.starredItems,
  );

  const isLoading = starredItems.length && !newsItems.length;
  const noStarred = !isLoading && starredItems.length === 0;

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
      {isLoading ? <Skeleton count={starredItems.length} height={60} /> : null}
      {noStarred && <EmptyList />}
    </div>
  );
};

export default StarredPage;
