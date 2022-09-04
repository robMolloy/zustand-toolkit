import { TCreateStoreToolkit } from '../../../types';

export type TSimpleToolkit = {
  data: unknown;
  getData: () => void;
  setData: (payload: unknown) => void;
};

export type TUseSimpleToolkit = TCreateStoreToolkit<TSimpleToolkit>;
