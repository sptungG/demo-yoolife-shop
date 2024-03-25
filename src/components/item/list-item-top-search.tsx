import { ChevronRightIcon } from "lucide-react";
import React, { useId } from "react";
import { Link } from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import ScrollBar from "../scrollbar/scroll-bar";
import { ItemCard2Skeleton } from "./item-card-2";
import ItemTopSearch from "./item-top-search";

type TListItemTopSearchProps = { businessType?: number[]; className?: string };

const ListItemTopSearch = ({ businessType, className }: TListItemTopSearchProps) => {
  const uid = useId();
  const { t } = useTranslation();

  const { data: topSearchListRes, isFetching: topSearchLoading } =
    itemApi.useGetListItemsByUserQuery(
      {
        skipCount: 0,
        maxResultCount: 10,
        formId: 30,
        orderBy: 1,
        sortBy: 2,
        listBusinessType: businessType,
      },
      { refetchOnMountOrArgChange: true },
    );

  const topSearchShopping = topSearchListRes?.data || [];

  return (
    <div className={className}>
      <div className="flex items-center justify-between px-2 py-2 lg:px-0">
        <h2 className="border-b border-b-green2-400 px-0 pr-2 text-lg font-[500] uppercase text-green2-500 lg:text-2xl">
          {t("Tìm kiếm hàng đầu")}
        </h2>
        <Link
          className="flex cursor-pointer items-center"
          href={`/items/top-search/?businessType=${businessType}`}
        >
          <span className="text-xs font-[500] text-gray-500 lg:text-base">Xem tất cả</span>
          <ChevronRightIcon size={18} className="text-gray-500" />
        </Link>
      </div>
      <ScrollBar suppressScrollY className="pb-3">
        <div className="flex flex-nowrap gap-2 px-2 lg:bg-transparent lg:px-0">
          {topSearchLoading
            ? Array(10).fill(<ItemCard2Skeleton />)
            : !!topSearchShopping?.length
              ? topSearchShopping.map((item, index) => (
                  <ItemTopSearch
                    key={uid + "TopSearch" + String(item) + index}
                    index={index}
                    {...item}
                  />
                ))
              : Array(10).fill(<ItemCard2Skeleton />)}
        </div>
      </ScrollBar>
    </div>
  );
};

export default ListItemTopSearch;
