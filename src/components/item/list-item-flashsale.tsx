import { ChevronRightIcon, ZapIcon } from "lucide-react";
import { useId } from "react";
import { Link } from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";
import { dayjs } from "@/utils/utils-date";

import ScrollBar from "../scrollbar/scroll-bar";
import { FlipClock } from "../shared/flipclock";
import { ItemCard2Skeleton } from "./item-card-2";
import ItemFlashSale from "./item-flash-sale";
import ItemTopFlash from "./item-top-flash";

type TListItemFlashSaleProps = { businessType?: number[]; className?: string };

const ListItemFlashSale = ({ businessType, className }: TListItemFlashSaleProps) => {
  const uid = useId();
  const { t } = useTranslation();

  const { data: getFlashSaleListRes } = itemApi.useGetListFlashSaleByUserQuery({
    maxResultCount: 100,
    dateStart: dayjs().toISOString(),
    dateEnd: dayjs().hour(23).endOf("hour").toISOString(),
  });
  const listFlashSale = getFlashSaleListRes?.data || [];

  const { data: topSearchListRes, isFetching: topSearchLoading } =
    itemApi.useGetListItemsByUserQuery(
      {
        skipCount: 0,
        maxResultCount: 10,
        formId: 30,
        orderBy: 3,
        sortBy: 2,
        listBusinessType: businessType,
      },
      { refetchOnMountOrArgChange: true },
    );

  const topSearchShopping = topSearchListRes?.data || [];

  return (
    <div className={className}>
      <div className="flex items-center justify-between px-2 py-2 lg:px-0">
        <div className="flex items-center">
          <h2 className="flex items-center border-b border-b-green2-400 px-0 pr-2 text-lg font-[500] text-green2-500 lg:text-2xl">
            <span className="mr-1 flex items-center ">
              F<ZapIcon className="-mx-0.5 w-[18px] fill-green2-100 lg:w-[22px]" />
              ASH
            </span>
            <span>SALE</span>
          </h2>

          <div className="ml-2 flex items-center gap-0.5">
            <FlipClock />
            <span className="text-xs font-[500] text-green2-800 lg:text-sm">còn lại</span>
          </div>
        </div>
        <Link
          className="flex cursor-pointer items-center"
          href={`/items/top-search/?businessType=${businessType}`}
        >
          <span className="text-xs font-[500] text-gray-500 lg:text-base">Xem tất cả</span>
          <ChevronRightIcon size={18} className="text-gray-500" />
        </Link>
      </div>
      <ScrollBar suppressScrollY className="pb-3">
        <div className="flex flex-nowrap gap-2 px-2 lg:px-0">
          {topSearchLoading
            ? Array(10).fill(<ItemCard2Skeleton />)
            : !!listFlashSale?.length
              ? listFlashSale.map((item, index) => (
                  <ItemFlashSale key={uid + "FlashSale" + String(item) + index} {...item} />
                ))
              : !!topSearchShopping?.length
                ? topSearchShopping.map((item, index) => (
                    <ItemTopFlash key={uid + "FlashSale" + String(item) + index} {...item} />
                  ))
                : Array(10).fill(<ItemCard2Skeleton />)}
        </div>
      </ScrollBar>
    </div>
  );
};

export default ListItemFlashSale;
