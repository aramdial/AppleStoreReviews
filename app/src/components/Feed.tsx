import { useEffect, useMemo, useState } from 'react';
import useLoadFeed from '../hooks/useLoadFeed';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import Entry from './Entry';
import '../styles/Feed.css';
import { IEntry } from '../interfaces/Feed';

const { REACT_APP_STORE_ID } = process.env;

const Feed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feed = useSelector((state: RootState) => state.feed.feed);
  // const entries = useSelector((state: RootState) => state.feed.entries);

  useLoadFeed({ appId: REACT_APP_STORE_ID ?? '', countryCode: 'us', page: currentPage });

  const after48Hours = useMemo(() => {
    var endTime = new Date();
    endTime.setHours(endTime.getHours() - 48);
    console.log('Last 48 Hours:', endTime.toLocaleString());
    return endTime;
  }, []);

  const [filtered, setFiltered] = useState<IEntry[]>([]);
  useEffect(() => {
    if (feed.entry) {
      const res = feed.entry.filter((item, index) => {
        const entryDate = new Date(item.updated.label);
        return entryDate > after48Hours;
      });
      setFiltered(res);
    }
  }, [after48Hours, currentPage, feed.entry]);

  const Reviews = () => {
    if (!filtered.length) {
      return <h4 className="center">End of Last 48 Hour Reviews</h4>;
    }

    return (
      <div>
        {filtered.map((item, index) => (
          <Entry key={index} entry={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="feedContainer">
      <h2 className="center">Instagram Reviews</h2>
      <Reviews />
      <div className="buttonRow">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          {'<<'}
        </button>
        <p className="page center">{currentPage}</p>
        <button
          disabled={filtered.length < 23}
          onClick={() => {
            setCurrentPage((p) => {
              return p + 1;
            });
          }}>
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Feed;
