import { useState } from 'react';
import useLoadFeed from '../hooks/useLoadFeed';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import Entry from './Entry';
import '../styles/Feed.css';

const { REACT_APP_STORE_ID } = process.env;

const Feed = () => {
  const [page, setPage] = useState(1);
  const feed = useSelector((state: RootState) => state.feed.feed);
  const maxPage = useSelector((state: RootState) => state.feed.maxPage);

  useLoadFeed({ appId: REACT_APP_STORE_ID ?? '', countryCode: 'us', page });

  if (!feed.entry.length || !feed.entry || !feed) {
    return <div>No reviews available.</div>;
  }
  return (
    <div className="feedContainer">
      <h2 style={{ textAlign: 'center' }}>Instagram Reviews</h2>

      {feed.entry.map((item, index) => (
        <Entry key={index} entry={item} />
      ))}

      <div className="buttonRow">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          {'<<'}
        </button>
        <p className="pageCenter">{page}</p>
        <button disabled={page === maxPage} onClick={() => setPage((p) => p + 1)}>
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Feed;
