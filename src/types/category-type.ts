import { TBaseFilter } from "./global-type";

export type TCategory = {
  id: number;
  tenantId: number;
  name: string;
  parentId: number;
  businessType: number;
  iconUrl: string;
  hasChildren: boolean;
};

export type TCategoriesFilter = TBaseFilter & {
  parentId?: number;
  businessType?: number;
};

export type TCreateCategoryData = {
  tenantId: number;
  name: string;
  parentId: number;
  businessType: number;
  iconUrl: string;
  hasChildren: boolean;
};

export type TUpdateCategoryData = {
  id: number;
  tenantId: number;
  name: string;
  parentId: number;
  businessType: number;
  iconUrl: string;
  hasChildren: boolean;
};
