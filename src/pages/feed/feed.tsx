import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, getOrders } from '../../services/feed/feed-slice';
import { getFeedData } from '../../services/feed/feed-thunks';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData());
  }, []);

  const handleGetFeeds = () => {
    location.assign('/feed');
    dispatch(getFeedData());
  };

  console.log(useSelector(getFeed));

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
