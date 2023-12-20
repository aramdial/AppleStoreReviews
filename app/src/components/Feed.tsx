import { useEffect, useMemo, useState } from 'react';
import useLoadFeed from '../hooks/useLoadFeed';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import Entry from './Entry';
import '../styles/Feed.css';
import { IEntry } from '../interfaces/Feed';

const { REACT_APP_STORE_ID } = process.env;
const STANDARD_FEED_SIZE = 50;

const Feed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feed = useSelector((state: RootState) => state.feed.feed);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<IEntry[]>([]);
  const maxPage = useSelector((state: RootState) => state.feed.maxPage);
  // const entries = useSelector((state: RootState) => state.feed.entries);

  useLoadFeed({ appId: REACT_APP_STORE_ID ?? '', countryCode: 'us', page: currentPage });

  const after48Hours = useMemo(() => {
    var endTime = new Date();
    endTime.setHours(endTime.getHours() - 48);
    console.log('Last 48 Hours:', endTime.toLocaleString());
    return endTime;
  }, []);

  useEffect(() => {
    if (feed.entry) {
      const results = feed.entry.filter((item) => {
        if (removeFilter) {
          return item;
        }
        const entryDate = new Date(item.updated.label);
        return entryDate > after48Hours;
      });
      setFilteredEntries(results);
    }
  }, [after48Hours, currentPage, feed.entry, removeFilter]);

  const Reviews = () => {
    return (
      <div>
        {filteredEntries.map((item, index) => (
          <Entry key={index} entry={item} />
        ))}
        <div className="buttonRow">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            {'<<'}
          </button>
          <p className="page center">{currentPage}</p>
          <button
            disabled={filteredEntries.length < STANDARD_FEED_SIZE || currentPage === maxPage}
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

  if (!feed) {
    return <div>Reviews are not available.</div>;
  }

  return (
    <div className="feedContainer">
      <h2 className="center">App Store Reviews</h2>
      <div className="filterBtnContainer">
        <button onClick={() => setRemoveFilter(!removeFilter)}>
          {removeFilter ? 'Add' : 'Remove'} Filter (Last 48 Hours)
        </button>
      </div>
      {!filteredEntries.length ? (
        <div className="center">
          <h4>End of last 48 Hour Reviews</h4>
        </div>
      ) : (
        <Reviews />
      )}
    </div>
  );
};

export default Feed;
