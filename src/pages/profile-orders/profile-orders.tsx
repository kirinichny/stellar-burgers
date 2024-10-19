import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIsLoading, getOrders } from '../../services/orders/orders-slice';
import { getOrdersData } from '../../services/orders/orders-thunks';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(getOrdersData());
  }, []);

  const orders: TOrder[] = useSelector(getOrders);

  return isLoading ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
