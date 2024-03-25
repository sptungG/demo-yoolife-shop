import queryString from "query-string";
import { useId } from "react";
import {
  ListBox,
  ListBoxItemProps,
  ListBoxProps,
  ListBoxItem as RAListBoxItem,
  Text,
} from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { TClassValue } from "@/types/global-type";
// import { LIST_BUSINESS_TYPE } from "@/utils/constant-category";
import { cn } from "@/utils/utils";

import {
  BagSvg,
  CategoriesSvg,
  ComputerSvg,
  ElectricSvg,
  FemaleFashionSvg,
  LifeSvg,
  MaleFashionSvg,
  PetSvg,
  StoreSvg,
  ToySvg,
  VegetableSvg,
} from "../icons";

type TListBusinessTypeProps = Omit<ListBoxProps<any>, "className"> & {
  className?: TClassValue;
};

export const stringify = (items: number[]) =>
  "?" + queryString.stringify({ businessTypes: items }, { arrayFormat: "comma" });

const ListBusinessType = ({ selectedKeys, className, ...props }: TListBusinessTypeProps) => {
  const uid = useId();
  const { t } = useTranslation();

  return (
    <ListBox
      slot={null}
      layout="grid"
      orientation="horizontal"
      selectionMode="single"
      className={cn(
        "-ml-2 grid grid-flow-col grid-rows-2 gap-x-1 gap-y-0 pb-3 md:grid-rows-1 lg:ml-0",
        className,
      )}
      selectedKeys={selectedKeys}
      {...props}
    >
      <ListBoxItem
        title={t("Home IoT")}
        id={JSON.stringify([212, 221, 222])}
        // href={stringify([212, 221, 222])}
        icon={<CategoriesSvg className="h-7 w-7 text-green2-500 lg:h-[36px] lg:w-[36px]" />}
      />

      <ListBoxItem
        title={t("Máy tính /Laptop")}
        id={JSON.stringify([222])}
        // href={stringify([222])}
        icon={<ComputerSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Thiết bị điện tử")}
        id={JSON.stringify([221])}
        // href={stringify([221])}
        icon={<ElectricSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />
      <ListBoxItem
        title={t("Nhà cửa & Đời sống")}
        id={JSON.stringify([216])}
        // href={stringify([216])}
        icon={<LifeSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Bách hóa")}
        id={JSON.stringify([217, 220, 207])}
        // href={stringify([217, 220, 207])}
        icon={<StoreSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Thực phẩm sạch")}
        id={JSON.stringify([213])}
        // href={stringify([213])}
        icon={<VegetableSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Thời trang")}
        id={JSON.stringify([214, 215, 224, 223, 219])}
        // href={stringify([214, 215, 224, 223, 219])}
        icon={<FemaleFashionSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Thú cưng")}
        id={JSON.stringify([207])}
        // href={stringify([207])}
        icon={<PetSvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />

      <ListBoxItem
        title={t("Đồ chơi")}
        id={JSON.stringify([220])}
        // href={stringify([220])}
        icon={<ToySvg className="h-8 w-8 text-green2-500 lg:h-[40px] lg:w-[40px]" />}
      />
    </ListBox>
  );
};

type TListBoxItemProps = {
  icon?: React.ReactNode;
  title?: React.ReactNode;
} & ListBoxItemProps<any>;
const ListBoxItem = ({ icon, title, ...props }: TListBoxItemProps) => {
  const uid = useId();
  return (
    <RAListBoxItem
      className="flex w-[94px] flex-shrink-0 cursor-pointer flex-col items-center outline-none hover:underline lg:w-[100px]"
      {...props}
    >
      {({ isSelected }) => (
        <>
          <div
            className={cn(
              "mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-green2-100/50 backdrop-blur-md lg:h-[64px] lg:w-[64px]",
              isSelected && "bg-green2-200/50",
            )}
          >
            {icon}
          </div>
          <Text
            slot="label"
            className={cn(
              "line-clamp-2 min-h-[32px] max-w-[100px] text-center text-xs font-[400] leading-[1.1] text-green2-800 lg:max-w-full",
              isSelected && "underline",
            )}
          >
            {title}
          </Text>
        </>
      )}
    </RAListBoxItem>
  );
};

export default ListBusinessType;
