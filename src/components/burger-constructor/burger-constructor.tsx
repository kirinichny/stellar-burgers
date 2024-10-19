import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearOrderModalData,
  getConstructorItems,
  getModalData,
  getOrderRequest
} from '../../services/burger-constructor/burger-constructor-slice';
import { createOrderBurger } from '../../services/burger-constructor/burger-constructor-thunks';
import { getUser } from '../../services/auth/auth-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getModalData);

  const burgerIngredientIds = [
    constructorItems.bun,
    ...constructorItems.ingredients
  ]
    .filter((item): item is TConstructorIngredient => item !== null)
    .map((item: TConstructorIngredient) => item._id);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrderBurger(burgerIngredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (total: number, ingredient: TConstructorIngredient) =>
          total + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
