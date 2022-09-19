import { TSetState, TGetState } from '../types';
import { z, ZodTypeAny, ZodArray } from 'zod';
import Fuse from 'fuse.js';

export type TZodPlural<TSchema extends ZodTypeAny> = ZodArray<TSchema, 'many'>;

export type TZodZustandStoreData<TSchema extends ZodTypeAny> =
  | z.infer<TZodPlural<TSchema>>
  | null
  | undefined;

export type TSafeParseReturnTypeFromSchema<
  TSchema extends ZodTypeAny
> = ReturnType<TSchema['safeParse']>;

export type TArrayOfObjectsAPIToolkit<TSchema extends ZodTypeAny> = {
  data: TZodZustandStoreData<TSchema>;
  itemSchema: TSchema;
  itemsSchema: TZodPlural<TSchema>;
  error: null;
  loading: undefined;
  empty: [];
  useParser: (
    payload: unknown
  ) => TSafeParseReturnTypeFromSchema<TZodPlural<TSchema>>;
  setData: (payload: TZodZustandStoreData<TSchema>) => void;
  handleSetData: (payload: unknown) => void;
  safeSetData: (payload: unknown) => void;
  fetchData: (...params: unknown[]) => Promise<unknown>;
  fetchAndSetData: (...params: unknown[]) => void;
  isError: () => boolean;
  isLoading: () => boolean;
  isEmpty: () => boolean;
  getSafeParsed: () => TSafeParseReturnTypeFromSchema<TZodPlural<TSchema>>;
  isValid: () => boolean;
  isInvalid: () => boolean;
  getValidData: () => z.infer<TZodPlural<TSchema>>;
  search: (
    needle: string,
    keys: Fuse.FuseOptionKey<TSchema['_output']>[]
  ) => z.infer<TZodPlural<TSchema>>;
};

export const useArrayOfObjectsAPIToolkit = <
  TSchema extends ZodTypeAny,
  TToolkit extends TArrayOfObjectsAPIToolkit<TSchema>
>(
  set: TSetState<TToolkit>,
  get: TGetState<TToolkit>,
  itemSchema: TSchema,
  fetchDataFn: (...params: unknown[]) => Promise<unknown>
): {
  data: TZodZustandStoreData<TSchema>;
  itemSchema: TSchema;
  itemsSchema: TZodPlural<TSchema>;
  error: null;
  loading: undefined;
  empty: [];
  useParser: (
    payload: unknown
  ) => TSafeParseReturnTypeFromSchema<TZodPlural<TSchema>>;
  setData: (payload: TZodZustandStoreData<TSchema>) => void;
  handleSetData: (payload: unknown) => void;
  safeSetData: (payload: unknown) => void;
  fetchData: (...params: unknown[]) => Promise<unknown>;
  fetchAndSetData: (...params: unknown[]) => void;
  isError: () => boolean;
  isLoading: () => boolean;
  isEmpty: () => boolean;
  getSafeParsed: () => TSafeParseReturnTypeFromSchema<TZodPlural<TSchema>>;
  isValid: () => boolean;
  isInvalid: () => boolean;
  getValidData: () => z.infer<TZodPlural<TSchema>>;
  search: (
    needle: string,
    keys: Fuse.FuseOptionKey<TSchema['_output']>[]
  ) => z.infer<TZodPlural<TSchema>>;
} => {
  const itemsSchema = z.array(itemSchema);
  return {
    data: undefined,
    error: null,
    loading: undefined,
    empty: [],
    itemSchema: itemSchema,
    itemsSchema: itemsSchema,
    useParser: payload => get().itemsSchema.safeParse(payload),
    setData: payload => set({ data: payload }),
    handleSetData: payload => {
      const parsed = get().useParser(payload);
      get().setData(parsed.success ? (payload as TItems) : get().error);
    },
    safeSetData: payload => {
      const parsed = get().useParser(payload);
      get().setData(parsed.success ? (payload as TItems) : get().empty);
    },
    fetchData: fetchDataFn,
    fetchAndSetData: async (...params) => {
      const data = await get().fetchData(...params);
      get().handleSetData(data);
    },
    isError: () => get().data === get().error,
    isLoading: () => get().data === get().loading,
    isEmpty: () => lodash.isEqual(get().data, get().empty),
    getSafeParsed: () => get().itemsSchema.safeParse(get().data),
    isValid: () => get().getSafeParsed().success,
    isInvalid: () => !get().isValid,
    getValidData: () => {
      const parsed = get().getSafeParsed();
      return parsed.success ? parsed.data : get().empty;
    },
    search: (needle, keys) => {
      const searcher = new Fuse(get().getValidData(), { keys });
      const result = searcher.search(needle) as TItems;
      return result.map(({ item }) => item);
    },
  };
};
