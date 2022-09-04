import { StoreApi } from 'zustand';

export type TSimpleToolkit = {
  data: unknown;
  getData: () => void;
  setData: (payload: unknown) => void;
};

export type TUseSimpleToolkit = TCreateStoreToolkit<TSimpleToolkit>;

export type TGetState<T> = StoreApi<T>['getState'];
export type TSetState<T> = StoreApi<T>['setState'];

export type TCreateStoreToolkit<T> = (
  set: TSetState<T>,
  get: TGetState<T>
) => T;

export const useSimpleToolkit: TUseSimpleToolkit = (set, get) => ({
  data: 0,
  getData: () => get().data,
  setData: payload => set({ data: payload }),
});
