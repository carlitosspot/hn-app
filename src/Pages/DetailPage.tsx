import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory, IStory } from '../api/hnApi.ts';
import StarToggle from '../components/StarToggle';
import Error from '../components/Error';

const DetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<IStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        if (typeof id === 'string') {
          const storyId = Number.parseInt(id);
          const story = await fetchStory(storyId);
          setItem(story);
        }
      } catch (err) {
        setError('Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="card">
        <progress className="progress is-large is-dark" max="100">
          99%
        </progress>
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!item && !loading) {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">No record found</p>
        </header>
      </div>
    );
  }

  if (item) {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{item.title}</p>
        </header>
        <div className="card-content">
          <div className="content">
            <p>Posted By: {item.by}</p>

            <time dateTime={new Date(item.time * 1000).toISOString()}>
              Posted on: {new Date(item.time * 1000).toLocaleDateString()}
            </time>
            <p>Points: {item.score}</p>
            <p>Comments: {item.descendants}</p>
          </div>
        </div>
        <footer className="card-footer">
          <a
            href={item.url}
            className="card-footer-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
          <div className="card-footer-item">
            <StarToggle id={item.id} />
          </div>
        </footer>
      </div>
    );
  }
};

export default DetailsPage;
