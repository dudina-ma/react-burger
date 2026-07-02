import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import {
  addIngredient,
  moveConstructorIngredient,
  removeConstructorIngredient,
} from '@services/burger-constructor/slice';
import { createOrder } from '@services/order/actions';
import { resetOrder } from '@services/order/slice';
import { CONSTRUCTOR_INGREDIENT_DRAG_TYPE, INGREDIENT_DRAG_TYPE } from '@utils/dnd';

import type { TConstructorIngredientDragItem, TIngredientDragItem } from '@utils/dnd';
import type { TConstructorIngredient, TIngredient } from '@utils/types';

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

type TConstructorIngredientProps = {
  item: TConstructorIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: string) => void;
};

const ConstructorIngredient = ({
  item,
  index,
  moveIngredient,
  onRemove,
}: TConstructorIngredientProps): React.JSX.Element => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag<
    TConstructorIngredientDragItem,
    void,
    { isDragging: boolean }
  >({
    type: CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<TConstructorIngredientDragItem, void, Record<string, never>>({
    accept: CONSTRUCTOR_INGREDIENT_DRAG_TYPE,
    hover(dragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={styles.row} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <DragIcon type="primary" className={styles.drag} />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        price={item.price}
        extraClass={styles.element}
        handleClose={() => {
          onRemove(item.id);
        }}
      />
    </li>
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

  const handleMoveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const handleRemoveIngredient = useCallback(
    (id: string): void => {
      dispatch(removeConstructorIngredient(id));
    },
    [dispatch]
  );

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
            {ingredients.map((item, index) => (
              <ConstructorIngredient
                key={item.id}
                item={item}
                index={index}
                moveIngredient={handleMoveIngredient}
                onRemove={handleRemoveIngredient}
              />
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
