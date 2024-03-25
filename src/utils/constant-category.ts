import {
  BagSvg,
  CategoriesSvg,
  ComputerSvg,
  ElectricSvg,
  FemaleFashionSvg,
  FemaleShoesSvg,
  LifeSvg,
  MaleFashionSvg,
  MaleShoesSvg,
  MomoSvg,
  PetSvg,
  StoreSvg,
  ToySvg,
  VNPaySvg,
  VegetableSvg,
} from "@/components/icons";
import i18n from "@/i18n";

export enum TEBusinessType {}

export const LIST_BUSINESS_TYPE2 = [
  { businessType: 212, Icon: CategoriesSvg, title: i18n.t("Home IoT") },
  { businessType: 221, Icon: ElectricSvg, title: i18n.t("Thiết bị điện tử") },
  { businessType: 222, Icon: ComputerSvg, title: i18n.t("Máy tính /Laptop") },
  { Icon: VegetableSvg, title: i18n.t("Thực phẩm sạch"), businessType: 213 },
  { Icon: PetSvg, title: i18n.t("Thú cưng"), businessType: 207 },
  { Icon: LifeSvg, title: i18n.t("Nhà cửa & Đời sống"), businessType: 216 },
  { Icon: StoreSvg, title: i18n.t("Bách hóa"), businessType: 217 },
  { businessType: 220, Icon: ToySvg, title: i18n.t("Đồ chơi") },

  { businessType: 214, Icon: MaleFashionSvg, title: i18n.t("Thời trang nam") },
  { businessType: 215, Icon: FemaleFashionSvg, title: i18n.t("Thời trang nữ") },
  { businessType: 224, Icon: MaleShoesSvg, title: i18n.t("Giày nam") },
  { businessType: 223, Icon: FemaleShoesSvg, title: i18n.t("Giày nữ") },
  { businessType: 219, Icon: BagSvg, title: i18n.t("Túi xách") },
];
