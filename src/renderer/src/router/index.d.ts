// app/router/types.d.ts
declare type AppRoute = {
  path: string;
  element?: React.ReactNode;
  children?: AppRoute[];
  guard?: React.ComponentType;
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
    title?: string;
  };
};
