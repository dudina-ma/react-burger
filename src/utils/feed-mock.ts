import type { TFeedData, TIngredient, TOrder } from '@utils/types';

const pickIngredientIds = (ingredients: TIngredient[], count: number): string[] => {
  const ids: string[] = [];

  for (let index = 0; index < count; index += 1) {
    ids.push(ingredients[index % ingredients.length]._id);
  }

  return ids;
};

const createMockOrder = (
  ingredients: TIngredient[],
  order: Omit<TOrder, 'ingredients'> & { ingredientCount: number }
): TOrder => ({
  ...order,
  ingredients: pickIngredientIds(ingredients, order.ingredientCount),
});

export const createMockFeedData = (ingredients: TIngredient[]): TFeedData => {
  if (ingredients.length === 0) {
    return { orders: [], total: 0, totalToday: 0 };
  }

  const now = Date.now();

  const orders: TOrder[] = [
    createMockOrder(ingredients, {
      _id: 'mock-order-1',
      number: 34536,
      status: 'done',
      name: 'Death Star Starship Main бургер',
      createdAt: new Date(now - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 10).toISOString(),
      ingredientCount: 6,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-2',
      number: 34535,
      status: 'pending',
      name: 'Interstellar бургер',
      createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 20).toISOString(),
      ingredientCount: 4,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-3',
      number: 34534,
      status: 'done',
      name: 'Black Hole Singularity бургер',
      createdAt: new Date(now - 1000 * 60 * 60).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 25).toISOString(),
      ingredientCount: 8,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-4',
      number: 34533,
      status: 'created',
      name: 'Supernova Infinity бургер',
      createdAt: new Date(now - 1000 * 60 * 75).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 75).toISOString(),
      ingredientCount: 5,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-5',
      number: 34532,
      status: 'pending',
      name: 'Galaxy Miner бургер',
      createdAt: new Date(now - 1000 * 60 * 90).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 40).toISOString(),
      ingredientCount: 3,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-6',
      number: 34531,
      status: 'done',
      name: 'Cosmic Crunch бургер',
      createdAt: new Date(now - 1000 * 60 * 120).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 60).toISOString(),
      ingredientCount: 7,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-7',
      number: 34530,
      status: 'done',
      name: 'Asteroid Belt бургер',
      createdAt: new Date(now - 1000 * 60 * 130).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 80).toISOString(),
      ingredientCount: 4,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-8',
      number: 34529,
      status: 'done',
      name: 'Nebula Glow бургер',
      createdAt: new Date(now - 1000 * 60 * 140).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 90).toISOString(),
      ingredientCount: 5,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-9',
      number: 34528,
      status: 'done',
      name: 'Comet Tail бургер',
      createdAt: new Date(now - 1000 * 60 * 150).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 100).toISOString(),
      ingredientCount: 6,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-10',
      number: 34527,
      status: 'done',
      name: 'Lunar Cheese бургер',
      createdAt: new Date(now - 1000 * 60 * 160).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 110).toISOString(),
      ingredientCount: 3,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-11',
      number: 34526,
      status: 'done',
      name: 'Solar Flare бургер',
      createdAt: new Date(now - 1000 * 60 * 170).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 120).toISOString(),
      ingredientCount: 7,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-12',
      number: 34525,
      status: 'done',
      name: 'Meteor Storm бургер',
      createdAt: new Date(now - 1000 * 60 * 180).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 130).toISOString(),
      ingredientCount: 8,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-13',
      number: 34524,
      status: 'done',
      name: 'Orbit Crunch бургер',
      createdAt: new Date(now - 1000 * 60 * 190).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 140).toISOString(),
      ingredientCount: 4,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-14',
      number: 34523,
      status: 'done',
      name: 'Pulsar Bite бургер',
      createdAt: new Date(now - 1000 * 60 * 200).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 150).toISOString(),
      ingredientCount: 5,
    }),
    createMockOrder(ingredients, {
      _id: 'mock-order-15',
      number: 34522,
      status: 'pending',
      name: 'Andromeda бургер',
      createdAt: new Date(now - 1000 * 60 * 210).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 160).toISOString(),
      ingredientCount: 6,
    }),
  ];

  return {
    orders,
    total: 28752,
    totalToday: 138,
  };
};
