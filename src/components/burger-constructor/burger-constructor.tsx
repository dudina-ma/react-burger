import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const mockBun = ingredients.find((item) => item.type === 'bun')!;
  const mockSauce = ingredients.find((item) => item.type === 'sauce')!;
  const mockMain = ingredients.find((item) => item.type === 'main')!;

  const mockFillings: TIngredient[] = [mockSauce, mockSauce, mockMain];

  const mockTotal =
    mockBun.price * 2 + mockFillings.reduce((sum, item) => sum + item.price, 0);

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
