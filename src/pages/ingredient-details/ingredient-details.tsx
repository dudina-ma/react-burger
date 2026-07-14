import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails as IngredientDetailsContent } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { useAppSelector } from '@hooks/use-redux-hooks';

export const IngredientDetails = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ingredient = useAppSelector((state) =>
    state.ingredients.items.find((item) => item._id === id)
  );

  const handleClose = useCallback((): void => {
    void navigate('/');
  }, [navigate]);

  if (!ingredient) {
    return null;
  }

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetailsContent ingredient={ingredient} />
    </Modal>
  );
};
