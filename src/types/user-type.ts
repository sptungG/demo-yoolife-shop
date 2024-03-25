import i18n from "@/i18n";
import { regexVNMobilePhone, regexVNPhoneAll } from "@/utils/utils";
import yup from "@/utils/yup";

import { TBaseFilter } from "./global-type";

export type TUser = {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  phoneNumber: string;
  lastLoginTime: string;
  creationTime: string;
  roleNames: string;
  homeAddress: string;
  addressOfBirth: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  profilePictureId: number;
  imageUrl: string;
  phanKhuId: number;
  houseId: number;
  identityNumber: string;
  qrCodeBase64: string;
  stateFriend: number;
  id: number;
};

export type TCreateUserAddressData = {
  type: number;
  default: boolean;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  name: string;
  districtCode: string;
  provinceCode: string;
  wardCode: string;
  detail: string;
};

export const TSCreateUserAddressData = yup.object({
  type: yup.array(yup.string().required()),
  default: yup.boolean().default(false),
  phoneNumber: yup
    .string()
    .required(i18n.t("required-field"))
    .matches(regexVNMobilePhone, i18n.t("invalid-phoneNumber")),
  name: yup.string().required(i18n.t("required-field")),
  detail: yup.string().optional(),
  address: yup.object({
    districtCode: yup.string().required(i18n.t("required-field")),
    provinceCode: yup.string().required(i18n.t("required-field")),
    wardCode: yup.string().required(i18n.t("required-field")),
  }),
  geoLocationString: yup.string().required(i18n.t("required-field")),
  // geoLocation: yup.object({
  //   latitude: yup.number().required(i18n.t("required-field")),
  //   longitude: yup.number().required(i18n.t("required-field")),
  // }),
});
export enum TETUserAddressType {
  HOME = 1,
  WORK = 2,
}
export const TCUserAddressType = {
  [TETUserAddressType.HOME]: "Nhà riêng",
  [TETUserAddressType.WORK]: "Văn Phòng",
};

export type TListUserAddressFilter = TBaseFilter & {
  type?: number;
  default?: boolean;
  pickUp?: boolean;
  return?: boolean;
  providerId?: number;
  orderBy?: number;
};

export type TUserAddress = {
  default: boolean;
  detail: string;
  districtCode: string;
  districtName: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  phoneNumber: string;
  pickUp: boolean;
  providerId: number;
  provinceCode: string;
  provinceName: string;
  return: boolean;
  type: number;
  userId: number;
  wardCode: string;
  wardName: string;
};

export type TProvider = {
  address: string;
  countRate: number;
  creationTime: string;
  description: string;
  districtId: string;
  email: string;
  groupType: number;
  id: number;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  name: string;
  ownerId: number;
  ownerInfo: string;
  phoneNumber: string;
  properties: string;
  provinceId: string;
  ratePoint: number;
  serviceType: number;
  state: number;
  type: number;
  wardId: string;
};
