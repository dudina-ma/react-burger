import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { ingredients } from '@utils/ingredients';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

const mockBun = ingredients.find((item) => item.type === 'bun')!;

const mockFillings: TIngredient[] = [
  ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b9')!,
  ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b9')!,
  ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b6')!,
];

const mockTotal =
  mockBun.price * 2 + mockFillings.reduce((sum, item) => sum + item.price, 0);

export const BurgerConstructor = (): React.JSX.Element => {
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
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className="text text_type_digits-medium">{mockTotal}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};
