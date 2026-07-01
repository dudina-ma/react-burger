import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '@services/current-ingredient/slice';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

const INGREDIENT_SECTIONS = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
] as const;

type TIngredientSectionType = (typeof INGREDIENT_SECTIONS)[number]['type'];

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const selectedIngredient = useAppSelector((state) => state.currentIngredient.item);
  const [activeTab, setActiveTab] = useState<TIngredientSectionType>(
    INGREDIENT_SECTIONS[0].type
  );
  const listRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Partial<Record<TIngredientSectionType, HTMLElement>>>({});
  const headerRefs = useRef<Partial<Record<TIngredientSectionType, HTMLElement>>>({});

  const sections = useMemo(
    () =>
      INGREDIENT_SECTIONS.map(({ type, title }) => ({
        id: type,
        title,
        items: ingredients.filter((item) => item.type === type),
      })),
    [ingredients]
  );

  const handleCloseModal = useCallback((): void => {
    dispatch(clearCurrentIngredient());
  }, [dispatch]);

  const handleTabClick = useCallback((type: TIngredientSectionType): void => {
    setActiveTab(type);
    sectionRefs.current[type]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const updateActiveTab = useCallback((): void => {
    const container = listRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    let closestType: TIngredientSectionType = INGREDIENT_SECTIONS[0].type;
    let minDistance = Infinity;

    for (const { type } of INGREDIENT_SECTIONS) {
      const header = headerRefs.current[type];
      if (!header) continue;

      const headerRect = header.getBoundingClientRect();
      const dx = headerRect.left - containerRect.left;
      const dy = headerRect.top - containerRect.top;
      const distance = Math.hypot(dx, dy);

      if (distance < minDistance) {
        minDistance = distance;
        closestType = type;
      }
    }

    setActiveTab(closestType);
  }, []);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = (): void => {
      updateActiveTab();
    };

    container.addEventListener('scroll', handleScroll);
    updateActiveTab();

    return (): void => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveTab, ingredients]);

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient): void => {
      dispatch(setCurrentIngredient(ingredient));
    },
    [dispatch]
  );

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {INGREDIENT_SECTIONS.map(({ type, title }) => (
            <Tab
              key={type}
              value={type}
              active={activeTab === type}
              onClick={() => {
                handleTabClick(type);
              }}
            >
              {title}
            </Tab>
          ))}
        </ul>
      </nav>

      <section ref={listRef} className={`${styles.ingredients_list} custom-scroll`}>
        {sections.map(({ id, title, items }) => (
          <section
            key={id}
            ref={(node) => {
              sectionRefs.current[id] = node ?? undefined;
            }}
            className={styles.ingredients_section}
            id={id}
          >
            <h2
              ref={(node) => {
                headerRefs.current[id] = node ?? undefined;
              }}
              className="text text_type_main-medium m-0 mb-6"
            >
              {title}
            </h2>
            <ul className={styles.cards_grid}>
              {items.map((ingredient) => (
                <li key={ingredient._id}>
                  <IngredientCard
                    ingredient={ingredient}
                    onClick={() => {
                      handleIngredientClick(ingredient);
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
