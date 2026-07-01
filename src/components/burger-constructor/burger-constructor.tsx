import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { addIngredient } from '@services/burger-constructor/slice';
import { createOrder } from '@services/order/actions';
import { resetOrder } from '@services/order/slice';
import { INGREDIENT_DRAG_TYPE } from '@utils/dnd';

import type { TIngredientDragItem } from '@utils/dnd';
import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TConstructorDropZoneProps = {
  text: string;
  variant: 'top' | 'bottom' | 'fillings';
};

const ConstructorDropZone = ({
  text,
  variant,
}: TConstructorDropZoneProps): React.JSX.Element => (
  <div
    className={`${styles.drop_zone} ${
      variant === 'top'
        ? styles.drop_zone_top
        : variant === 'bottom'
          ? styles.drop_zone_bottom
          : ''
    }`}
  >
    <span className="text text_type_main-default">{text}</span>
  </div>
);

type TConstructorDropSlotProps = {
  children: React.ReactNode;
  className: string;
  canDropIngredient: (ingredient: TIngredient) => boolean;
};

const ConstructorDropSlot = ({
  children,
  className,
  canDropIngredient,
}: TConstructorDropSlotProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop<
    TIngredientDragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: INGREDIENT_DRAG_TYPE,
    drop: (item) => {
      dispatch(addIngredient(item.ingredient));
    },
    canDrop: (item) => canDropIngredient(item.ingredient),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={`${className} ${isOver && canDrop ? styles.slot_hover : ''}`}
    >
      {children}
    </div>
  );
};

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const { isLoading: isOrderLoading, error: orderError } = useAppSelector(
    (state) => state.order
  );
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const total = useMemo(() => {
    if (!bun) {
      return 0;
    }

    return bun.price * 2 + ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [bun, ingredients]);

  const handlePlaceOrder = useCallback((): void => {
    if (!bun) {
      return;
    }

    const ingredientIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];

    void dispatch(createOrder(ingredientIds)).then((result) => {
      if (createOrder.fulfilled.match(result)) {
        setIsOrderModalOpen(true);
      }
    });
  }, [dispatch, bun, ingredients]);

  const handleCloseOrderModal = useCallback((): void => {
    setIsOrderModalOpen(false);
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <section className={styles.burger_constructor}>
      <ConstructorDropSlot
        className={styles.slot_top}
        canDropIngredient={(ingredient) => ingredient.type === 'bun'}
      >
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
            extraClass={styles.row_bun}
          />
        ) : (
          <ConstructorDropZone text="Выберите булки" variant="top" />
        )}
      </ConstructorDropSlot>

      <ConstructorDropSlot
        className={`${styles.slot_middle} custom-scroll`}
        canDropIngredient={(ingredient) => ingredient.type !== 'bun'}
      >
        {ingredients.length > 0 ? (
          <ul className={styles.list}>
            {ingredients.map((item) => (
              <li key={item.id} className={styles.row}>
                <DragIcon type="primary" className={styles.drag} />
                <ConstructorElement
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  extraClass={styles.element}
                  handleClose={() => {
                    /* TODO */
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ConstructorDropZone text="Выберите начинку" variant="fillings" />
        )}
      </ConstructorDropSlot>

      <ConstructorDropSlot
        className={styles.slot_bottom}
        canDropIngredient={(ingredient) => ingredient.type === 'bun'}
      >
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
            extraClass={styles.row_bun}
          />
        ) : (
          <ConstructorDropZone text="Выберите булки" variant="bottom" />
        )}
      </ConstructorDropSlot>

      <div className={`${styles.row} ${styles.row_footer}`}>
        <footer className={styles.footer}>
          <p className={styles.price}>
            <span className="text text_type_digits-medium">{total}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handlePlaceOrder}
            disabled={isOrderLoading || !bun}
          >
            {isOrderLoading ? 'Подождите...' : 'Оформить заказ'}
          </Button>
        </footer>
        {orderError && (
          <p className="text text_type_main-default text_color_error mt-2">
            {orderError}
          </p>
        )}
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
