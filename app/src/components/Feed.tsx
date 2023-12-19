import axios, { AxiosRequestConfig } from 'axios';
import { IFeed, IFeedObject } from '../interfaces/Feed';
import { useCallback, useEffect, useState } from 'react';
import Entry from './Entry';
import '../styles/Feed.css';

interface IProps {
  appId: string;
  countryCode: string;
  page: number;
}

const { REACT_APP_API_URL } = process.env;

const Feed = (props: IProps) => {
  const [feed, setFeed] = useState<IFeed | null>();

  const fetchFeed = useCallback(async () => {
    try {
      const config: AxiosRequestConfig = {
        baseURL: REACT_APP_API_URL || '',
        params: {
          sortBy: 'mostRecent',
          page: props.page,
        },
      };
      const res = await axios.get(`/feed/${props.appId}/${props.countryCode}`, config);
      const { feed }: IFeedObject = res.data;
      setFeed(feed);
    } catch (err) {
      console.log('err', err);
    }
  }, [props.appId, props.countryCode, props.page]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed, props.appId]);

  return (
    <div>
      <h2 className="title">Instagram Reviews</h2>
      {feed?.entry.map((item, index) => <Entry entry={item} key={index} />)}
    </div>
  );
};

export default Feed;
