import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFeed } from '../store/slices/feedSlice';
import { AppDispatch } from '../store/configureStore';

const useLoadFeed = ({
  appId,
  countryCode,
  page,
}: {
  appId: string;
  countryCode: string;
  page: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (appId) {
      dispatch(fetchFeed({ appId, countryCode, page }));
    }
  }, [appId, countryCode, dispatch, page]);
};

export default useLoadFeed;
