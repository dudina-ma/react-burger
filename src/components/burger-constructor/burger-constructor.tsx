import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { mockBun, mockFillings, mockTotal } = useMemo(() => {
    const bun = ingredients.find((item) => item.type === 'bun')!;
    const sauce = ingredients.find((item) => item.type === 'sauce')!;
    const main = ingredients.find((item) => item.type === 'main')!;
    const fillings: TIngredient[] = [sauce, sauce, main];
    const total = bun.price * 2 + fillings.reduce((sum, item) => sum + item.price, 0);

    return { mockBun: bun, mockFillings: fillings, mockTotal: total };
  }, [ingredients]);

  const handleOpenOrderModal = useCallback((): void => {
    setIsOrderModalOpen(true);
  }, []);

  const handleCloseOrderModal = useCallback((): void => {
    setIsOrderModalOpen(false);
  }, []);

  return (
    <section className={styles.burger_constructor}>
      <ConstructorElement
        type="top"
        isLocked
        text={`${mockBun.name} (верх)`}
        thumbnail={mockBun.image}
        price={mockBun.price}
        extraClass={styles.row_bun}
      />

      <div className={styles.middle}>
        <div className={`${styles.scroll_zone} custom-scroll`}>
          <ul className={styles.list}>
            {mockFillings.map((item, index) => (
              <li key={`${item._id}-${index}`} className={styles.row}>
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
        </div>

        <ConstructorElement
          type="bottom"
          isLocked
          text={`${mockBun.name} (низ)`}
          thumbnail={mockBun.image}
          price={mockBun.price}
          extraClass={styles.row_bun}
        />
      </div>

      <div className={`${styles.row} ${styles.row_footer}`}>
        <footer className={styles.footer}>
          <p className={styles.price}>
            <span className="text text_type_digits-medium">{mockTotal}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOpenOrderModal}
          >
            Оформить заказ
          </Button>
        </footer>
      </div>

      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
