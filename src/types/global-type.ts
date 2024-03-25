import { type ClassValue } from "clsx";

export type TBaseFilter = {
  skipCount?: number | null;
  maxResultCount?: number | null;
  keyword?: string | null;
  orderBy?: number | null;
  sortBy?: number | null;
};

export type TClassValue = ClassValue;
