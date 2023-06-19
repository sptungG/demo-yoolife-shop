import { ID } from "./global.types";

export type TGetMeParams = {
  accessToken: string;
};

export type TUser = {
  id: ID;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  phoneNumber?: string;
  lastLoginTime?: string;
  creationTime: string;
  roleNames?: any;
  homeAddress?: any;
  addressOfBirth?: any;
  dateOfBirth?: any;
  gender?: any;
  nationality?: any;
  profilePictureId?: any;
  imageUrl?: any;
  phanKhuId?: any;
  houseId?: any;
  identityNumber?: any;
  qrCodeBase64?: any;
  stateFriend?: number;
};
