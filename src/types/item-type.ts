import { TBaseFilter } from "./global-type";

export type TItems1Filter = {
  categoryId?: number;
  providerId?: number;
  listBusinessType?: number[];
  businessType?: number;
  type?: number;
  formId?: number;
  orderBy?: number;
  minPrice?: number;
  maxPrice?: number;
  condition?: number;
  isItemBooking?: boolean;
  userId?: number;
  skipCount?: number;
  maxResultCount?: number;
  keyword?: string;
  sortBy?: number;
  tenantId?: number;
  rating?: number;
};

export type TItems2Filter = {
  itemServiceType?: number;
  skipCount?: number;
  maxResultCount?: number;
  keyword?: string;
  sortBy?: number;
};

export type TItemsRandomFilter = {
  itemServiceType?: number;
  skipCount?: number;
  maxResultCount?: number;
  keyword?: string;
  sortBy?: number;
};

export type TItemsFavoriteFilter = {
  skipCount?: number;
  maxResultCount?: number;
  keyword?: string;
  sortBy?: number;
};

export type TUpdateCartItem = {
  itemModelId: number;
  quantity: number;
  providerId: number;
};
export type TUpdateCartData = {
  items: TUpdateCartItem[];
};

export type TAddToCartData = { itemModelId: number; quantity: number };

export type TItem = {
  id: number;
  tenantId: number;
  name: string;
  providerId: number;
  categoryId: number;
  sku: string;
  imageUrlList: string[];
  videoUrlList: string[];
  description: string;
  minPrice: number;
  maxPrice: number;
  sizeInfo: string;
  logisticInfo: string;
  status: number;
  condition: number;
  complaintPolicy: string;
  stock: number;
  attributeList: any[];
  tierVariationList: { name: string; optionList: string[] }[];
  modelList: {
    id: number;
    tenantId: number;
    isDefault: true;
    name: string;
    itemId: number;
    sku: string;
    stock: number;
    sales: number;
    originalPrice: number;
    currentPrice: number;
    tierIndex: number[];
    imageUrl: string;
    itemName: string;
  }[];
  creationTime: string;
  countRate: number;
  ratePoint: number;
  sales: number;
  creatorUserId: number;
  properties: string;
  type: number;
  viewCount: number;
  isLike: false;
  address: string;
  // address: '{"Address":"Audi Building, 8 Pham Hung Street, Ha Noi","DistrictId":"001","DistrictName":"Ba Đình","ProvinceId":"01","ProvinceName":"Hà Nội","WardId":"00028","WardName":"Kim Mã","Id":10}';
};

export type TItemAddress = {
  Address: string;
  DistrictId: string;
  DistrictName: string;
  ProvinceId: string;
  ProvinceName: string;
  WardId: string;
  WardName: string;
  Id: number;
};

export type TImageConfig = {
  tenantId: number;
  imageUrl: string;
  type: number;
  scope: number;
  properties: string;
  id: number;
};

export enum EImageConfigType {
  Other = 0,
  YoolifeBanner = 1,
  YoolifeLogo = 2,
  YoolifeShoppingBanner = 3,
  YoolifeAvatar = 4,
  YoolifeLogin = 20,
}

export enum EConditionItem {
  New = 1,
  Old = 2,
}

export enum EOrderByItem {
  Popular = "Popular", // phổ biến
  Id = "Id", // thời gian tạo
  TopSales = "TopSales", // bán chạy
  PriceMin = "PriceMin", // giá thấp nhất
  PriceMax = "PriceMax", // giá cao nhất
  Stock = "Stock", // tồn kho
  Rating = "Rating",
}

export const OrderByItem: Record<string, number> = {
  [EOrderByItem.Popular]: 1,
  [EOrderByItem.Id]: 2,
  [EOrderByItem.TopSales]: 3,
  [EOrderByItem.PriceMin]: 4,
  [EOrderByItem.PriceMax]: 5,
  [EOrderByItem.Stock]: 6,
  [EOrderByItem.Rating]: 7,
};

export type TDeliveryEstimateData = {
  deliveryProvider: number;
  fromProvinceName: string;
  fromDistrictName: string;
  fromWardName: string;
  fromAddress: string;
  toProvinceName: string;
  toDistrictName: string;
  toWardName: string;
  toAddress: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  isCod: boolean;
};
export type TCalculateTotalPriceData = {
  providerId: number;
  orderItemList: {
    id: number;
    quantity: number;
  }[];
  deliveryInfo: {
    deliveryProvider?: number;
    toProvinceName: string;
    toDistrictName: string;
    toWardName: string;
    toAddress: string;
    toName: string;
    toPhone?: string;
  };
  listVouchers: number[];
  isCod?: boolean;
};
export type TCalculateTotalPriceRes = {
  estimateResults: {
    voucherDiscountFees: {
      id: number;
      value: number;
    }[];
    deliveryProvider: number;
    shippingFee: number;
    totalPrice: number;
    expectedDeliveryTime: string;
  }[];
  totalPriceOrigin: number;
};
export type TDeliveryReducer = {
  id: number;
  name: string;
  imageUrl: string;
  fee: number;
};

export enum TEDeliveryProvider {
  GiaoHangNhanh = 1,
  GiaoHangTietKiem = 2,
  Lalamove = 3,
  Self = 4,
}

export enum TEPaymentMethods {
  COD = 1,
  MOMO = 2,
  VNPAY = 3,
  VIETTELPAY = 4,
}

export type TListRateFilter = TBaseFilter & {
  orderId: number;
  bookingId: number;
  itemId: number;
  providerId: number;
  userId: number;
  rating: number;
  type: number;
  transactionId: number;
  transactionType: number;
};

export type TRateItem = {
  answerRateId: number;
  avatar: string;
  bookingId: number;
  comment: string;
  creationTime: string;
  creatorUserId: number;
  email: string;
  fileUrl: string;
  id: number;
  itemId: number;
  objectDto: any;
  orderId: number;
  partnerResponse: { content: string; imageUrls: string };
  providerId: number;
  ratePoint: number;
  transactionId: number;
  transactionType: number;
  type: number;
  userName: string;
};

export type TListVoucherFilter = TBaseFilter & {
  formId: number;
  providerId: number;
  scope: number;
  orderId: number;
  channelDisplay: number;
};

export type TVoucher = {
  businessType: number;
  creationTime: string;
  creatorUserId: number;
  currentUsage: number;
  dateEnd: string;
  dateStart: string;
  description: string;
  discountAmount: number;
  discountType: number;
  displayChannelList: number[];
  displayDateStart: string;
  id: number;
  isAdminCreate: boolean;
  isReceived: boolean;
  lastModificationTime: string;
  listItems: number[];
  maxDistributionBuyer: number;
  maxPrice: number;
  minBasketPrice: number;
  name: string;
  percentage: number;
  providerId: number;
  quantity: number;
  scope: number;
  status: number;
  type: number;
  userVoucherUsage: number;
  voucherCode: string;
};
export enum TEDiscountType {
  FIX_AMOUNT = 1,
  DISCOUNT_PERCENTAGE = 2,
}
export enum TEVoucherStatus {
  // [EnumDisplayString("Sắp diễn ra")]
  UPCOMING = 1,
  // [EnumDisplayString("Đang diễn ra")]
  ACTIVATED = 2,
  // [EnumDisplayString("Đã kết thúc")]
  EXPIRED = 3,
}
export enum TEVoucherType {
  // [EnumDisplayString("Voucher giảm giá vận chuyển")]
  VOUCHER_SHIPPING = 1,
  // [EnumDisplayString("Voucher giảm giá sản phẩm")]
  VOUCHER_DISCOUNT = 2,
}

export enum TEVoucherScope {
  SHOP_VOUCHER = 1,
  PRODUCT_VOUCHER = 2,
}

export const FormIdItem = {
  ALL: 30,
  SHOP: 31,
};

export type TItemFlashSale = {
  itemId: number;
  providerId: number;
  dateStart: string;
  dateEnd: string;
  discountType: number;
  maxDistributionBuyer: number;
  stock: number;
  sales: number;
  percent: number;
  currentPrice: number;
  originalPrice: number;
  itemInfo: {
    id: number;
    name: string;
    imageUrlList: string[];
    countRate: number;
    ratePoint: number;
    creationTime: string;
    creatorUserId: number;
    viewCount: number;
  };
  creationTime: string;
  creatorUserId: number;
  id: number;
};

export type TCart = {
  itemModel: {
    name: string;
    itemId: number;
    isDefault: boolean;
    sku: string;
    stock: number;
    sales: number;
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
    tierIndex: number[];
    itemName: string;
    quantity: number;
    isFlashSale: boolean;
    id: number;
  };
  quantity: number;
  providerId: number;
  itemName: string;
  providerName: string;
};

export type TCreateOrderData = {
  providerId: number;
  description: string;
  imageUrl: string;
  orderItemList: {
    id: number;
    quantity: number;
  }[];
  paymentMethod: number;
  listVouchers: number[];
  deliveryInfo: {
    deliveryProvider?: number;
    toProvinceName: string;
    toDistrictName: string;
    toWardName: string;
    toAddress: string;
    toName: string;
    toPhone?: string;
  };
};
