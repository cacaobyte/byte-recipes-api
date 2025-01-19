import productsRoutes from './products/routes';

export const routes = [productsRoutes] as const;

export type AppRoutes = (typeof routes)[number];
