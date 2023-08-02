export type TCategoriesResponse<Data extends any> = {
  result: Data;
  success: boolean;
  targetURL: any;
  unAuthorizedRequest: boolean;
};

export type Data<Items extends any> = {
  data: Array<Items>;
  error: any;
  message: string;
  success: boolean;
  totalRecord: number;
};

export type Items = {
  id: number;
  tenantId?: number;
  name?: string;
  parenId?: number;
  businessType?: number;
  hasChildren?: boolean;
  iconUrl?: string;
};

export type TItemsResponse<DataItems extends any> = {
  result: DataItems;
  success: boolean;
  targetURL: any;
  unAuthorizedRequest: boolean;
};

export type DataItems<ItemsDetail extends any> = {
  data: Array<ItemsDetail>;
  error: any;
  message: string;
  success: boolean;
  totalRecord: number;
};

export type ItemsDetail = {
  id: number;
  name: string;
  providedId: number;
  categoryId: number;
  imageUrlList: object[];
  videoUrlList: object[];
  description: string;
  minPrice: number;
  maxPrice: number;
  ratePoint: number;
  countRate: number;
  address: string;
  viewCount: number;
};


export type TAllItemsResponse = {
  result: any;
  success: boolean;
  targetURL: any;
  unAuthorizedRequest: boolean;
};
