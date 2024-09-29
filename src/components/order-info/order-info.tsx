import { FC, useMemo } from 'react';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/ingredients-slice';
import { getIsAuthChecked } from '../../services/auth/auth-slice';
import { getOrders } from '../../services/feed/feed-slice';
import { getOrders as getUserOrders } from '../../services/orders/orders-slice';

export const OrderInfo: FC = () => {
  const params = useParams();
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const isAuth = useSelector(getIsAuthChecked);
  const orders = useSelector(getOrders);
  const userOrders = useSelector(getUserOrders);
  const allOrders: TOrder[] = !isAuth ? orders : orders.concat(userOrders);

  const orderData: TOrder | undefined = allOrders.find(
    (order) => order.number === Number(params.number)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
