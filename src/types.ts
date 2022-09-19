import { StoreApi } from 'zustand';

export type TGetState<T> = StoreApi<T>['getState'];
export type TSetState<T> = StoreApi<T>['setState'];

export type TCreateStoreToolkit<T> = (
  set: TSetState<T>,
  get: TGetState<T>
) => T;
