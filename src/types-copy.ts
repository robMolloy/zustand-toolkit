import { z, ZodArray, ZodTypeAny } from 'zod';
import { StoreApi, UseBoundStore } from 'zustand';
import Fuse from 'fuse.js';

export type TZodPlural<TSchema extends ZodTypeAny> = ZodArray<TSchema, 'many'>;

export type TZodZustandStoreData<TSchema extends ZodTypeAny> =
  | z.infer<TZodPlural<TSchema>>
  | null
  | undefined;

export type TSafeParseReturnTypeFromSchema<
  TSchema extends ZodTypeAny
> = ReturnType<TSchema['safeParse']>;
