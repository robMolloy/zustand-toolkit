import { TUseSimpleToolkit } from './useSimpleToolkitTypes';

export const useSimpleToolkit: TUseSimpleToolkit = (set, get) => ({
  data: 3213,
  getData: () => get().data,
  setData: payload => set({ data: payload }),
});
