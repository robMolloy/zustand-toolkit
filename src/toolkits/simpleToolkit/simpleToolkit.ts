import { TUseSimpleToolkit } from './types';

// export type TSimpleToolkit = {
//   data: unknown
//   getData: () => void
//   setData: (payload: unknown) => void
// }

// export type TUseSimpleToolkit = TCreateStoreToolkit<TSimpleToolkit>

export const useSimpleToolkit: TUseSimpleToolkit = (set, get) => ({
  data: 0,
  getData: () => get().data,
  setData: payload => set({ data: payload }),
});
