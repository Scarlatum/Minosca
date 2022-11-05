export type Some<T> = T | undefined;

export type Result<V, E extends Error = Error> = V | E;