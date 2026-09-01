import { expect, type Page } from '@playwright/test';

import { dragAndDrop } from './dnd';

type TIngredientCard = {
  card: ReturnType<Page['locator']>;
  name: string;
  price: number;
};

const getIngredientCard = async (
  page: Page,
  sectionId: 'bun' | 'main' | 'sauce'
): Promise<TIngredientCard> => {
  const card = page.locator(`#${sectionId} article`).first();
  const name = (await card.locator('img').getAttribute('alt')) ?? '';
  const priceText = await card.locator('.text_type_digits-default').textContent();

  return {
    card,
    name,
    price: Number(priceText),
  };
};

export const runConstructorScenario = async (page: Page): Promise<void> => {
  const constructor = page.locator('section').filter({
    has: page.getByRole('button', { name: 'Оформить заказ' }),
  });

  const bun = await getIngredientCard(page, 'bun');
  const main = await getIngredientCard(page, 'main');
  const sauce = await getIngredientCard(page, 'sauce');

  const topBunSlot = constructor.getByText('Выберите булки').first();
  const middleSlot = constructor.getByText('Выберите начинку');

  await dragAndDrop(page, bun.card, topBunSlot);
  await expect(constructor.getByText(`${bun.name} (верх)`)).toBeVisible();
  await expect(constructor.getByText(`${bun.name} (низ)`)).toBeVisible();

  await dragAndDrop(page, main.card, middleSlot);
  await dragAndDrop(page, sauce.card, constructor.locator('ul'));

  const constructorList = constructor.locator('ul');
  await expect(constructorList.getByText(main.name)).toBeVisible();
  await expect(constructorList.getByText(sauce.name)).toBeVisible();

  const expectedTotal = bun.price * 2 + main.price + sauce.price;
  await expect(constructor.getByText(String(expectedTotal), { exact: true })).toBeVisible();

  await main.card.click();
  await expect(page.getByRole('heading', { name: 'Детали ингредиента' })).toBeVisible();
  await expect(page.getByRole('heading', { name: main.name, exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'Детали ингредиента' })).toBeHidden();
  await expect(page).toHaveURL('/');

  const mainInConstructor = constructorList.getByText(main.name).locator('xpath=ancestor::li[1]');
  const sauceInConstructor = constructorList.getByText(sauce.name).locator('xpath=ancestor::li[1]');

  await dragAndDrop(page, sauceInConstructor, mainInConstructor);

  const ingredientItems = constructorList.locator('li');
  await expect(ingredientItems.nth(0)).toContainText(sauce.name);
  await expect(ingredientItems.nth(1)).toContainText(main.name);

  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  const orderNumber = page.locator('.text_type_digits-large').first();
  await expect(page.getByText('идентификатор заказа')).toBeVisible({ timeout: 30_000 });
  await expect(orderNumber).toBeVisible();
  await expect(orderNumber).not.toHaveText('000000');
  await expect(page.getByText('Ваш заказ начали готовить')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByText('идентификатор заказа')).toBeHidden();
  await expect(constructor.getByText('Выберите булки').first()).toBeVisible();
  await expect(constructor.getByText('Выберите начинку')).toBeVisible();
};
