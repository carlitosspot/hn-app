import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchNewsItems, Status } from '../features/newsItemsSlice';
import NewsItem from '../components/NewsItem';
import { RootState, useAppDispatch } from '../store.ts';
import Skeleton from 'react-loading-skeleton';
import Error from '../components/Error';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const newsItems = useSelector((state: RootState) => state.newsItems.items);
  const newsStatus = useSelector((state: RootState) => state.newsItems.status);
  const error = useSelector((state: RootState) => state.newsItems.error);
  const isIdle = newsStatus === Status.IDLE;
  const isLoading = newsStatus === Status.LOADING;
  const hasError = !!error;

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchNewsItems());
    }
  }, [dispatch, isIdle]);

  return (
    <div>
      {isLoading && <Skeleton count={20} height={60} />}
      {hasError && <Error message={'Unable to load list of latest stories'} />}
      {newsItems.map((story, index) => (
        <NewsItem key={story.id} {...story} index={index} />
      ))}
    </div>
  );
};

export default HomePage;
