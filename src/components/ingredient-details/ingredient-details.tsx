import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/ingredients-slice';

export const IngredientDetails: FC = () => {
  const urlParams = useParams();

  const ingredientData = useSelector(getIngredients).find(
    (ingredient) => ingredient._id === urlParams.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
