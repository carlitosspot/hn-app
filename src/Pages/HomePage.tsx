import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchNewsItems, Status } from '../features/newsItemsSlice';
import NewsItem from '../components/NewsItem';
import { RootState, useAppDispatch } from '../store.ts';
import Skeleton from 'react-loading-skeleton';
import Error from '../components/Error';
import ShowMore from '../components/ShowMore';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const newsItems = useSelector((state: RootState) => state.newsItems.items);
  const newsStatus = useSelector((state: RootState) => state.newsItems.status);
  const error = useSelector((state: RootState) => state.newsItems.error);
  const [page, setPage] = useState(0);
  const pageSize = 25;
  const isLoading = newsStatus === Status.LOADING;
  const hasError = !!error;

  // This is a "manual way" to indicate the end of the list
  const hasReachedEnd = pageSize * (page + 1) === 500;

  useEffect(() => {
    dispatch(fetchNewsItems({ pageNumber: page, pageSize }));
  }, [dispatch, page]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      {hasError && <Error message={'Unable to load list of latest stories'} />}
      {newsItems.map((story, index) => (
        <NewsItem key={story.id} {...story} index={index} />
      ))}
      {isLoading && <Skeleton count={pageSize} height={60} />}
      {!isLoading && !hasReachedEnd && (
        <div className={'container'} style={{ marginLeft: 35, marginTop: 35 }}>
          <ShowMore onClick={handleNextPage} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
