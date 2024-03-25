import { skipToken } from "@reduxjs/toolkit/query";
import {
  ChevronRight,
  ChevronRightIcon,
  MoreHorizontalIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react";
import React, { useId, useState } from "react";
import { Button } from "react-aria-components";

import { itemApi } from "@/redux/query/item-query";
import { TItem } from "@/types/item-type";
import { cn } from "@/utils/utils";
import { formatDate } from "@/utils/utils-date";

import DrawerRateList from "../dialog/drawer-rate-list";
import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";
import Rate5 from "../shared/rate";

type TItemRateListProps = {} & TItem;

const ItemRateList = ({ ...itemData }: TItemRateListProps) => {
  const uid = useId();
  const [isOpenRateList, setIsOpenRateList] = useState<boolean>(false);

  const { data: getListRateRes } = itemApi.useGetListRateQuery(
    itemData?.id ? { sortBy: 2, orderBy: 1, itemId: itemData.id, maxResultCount: 3 } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const listRate = getListRateRes?.data || [];
  const totalRecords = getListRateRes?.totalRecords || 0;

  if (!itemData) return <></>;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-start">
        <div className="flex-col">
          <div className="mb-0.5 uppercase text-gray-500">Đánh giá sản phẩm</div>
          <div className="flex items-center">
            <Rate5 value={itemData.ratePoint} />
            <span className={cn("ml-1 mr-1", itemData.ratePoint && "text-orange-300")}>
              {!!itemData.ratePoint ? itemData.ratePoint.toFixed(2) : "0"}
            </span>
            <span className="mr-1 text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{totalRecords} đánh giá</span>
          </div>
        </div>

        {!!listRate?.length && (
          <Button
            className={"ml-auto flex items-center text-sm text-green2-500"}
            onPress={() => setIsOpenRateList(true)}
          >
            <span>Xem tất cả</span>
            <ChevronRightIcon size={20} />
          </Button>
        )}
      </div>
      {!!listRate?.length ? (
        <div className="flex flex-col divide-y divide-gray-100 pb-[1px]">
          {listRate.map((item, index) => (
            <div key={uid + index} className="relative min-h-[80px] pb-2">
              <div className="mt-2 flex items-center">
                <Image
                  src={item.avatar}
                  alt={item.userName}
                  className="mr-1.5 h-7 w-7 rounded-full object-cover shadow-md shadow-gray-100"
                  classNameFallback="opacity-50"
                />
                <div className="flex flex-col">
                  <div className="line-clamp-1 text-[15px] font-[500] leading-[1.2] text-gray-500">
                    {item.userName || "---"}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div
                      className={cn(
                        "flex items-center gap-0 text-sm",
                        !!item.ratePoint && "text-orange-300",
                      )}
                    >
                      {/* <StarIcon size={13} className={cn("-mt-[2px] fill-orange-300")} />
                      <span className="ml-0.5 font-[500]">{item.ratePoint}</span> */}
                      <Rate5 value={item.ratePoint} size={14} />
                    </div>
                    <span className="text-sm text-gray-400">•</span>
                    <div className="text-xs text-gray-400">
                      {formatDate(item.creationTime, "DD-MM-YYYY HH:mm")}
                    </div>
                  </div>
                </div>
              </div>
              {!!item.comment && (
                <div className="pl-[36px] pt-2 text-base text-gray-600">{item.comment}</div>
              )}
              {!!item.fileUrl && (
                <div className="mb-1 max-w-full pl-[36px] pt-1">
                  <ScrollBar suppressScrollY className="flex flex-nowrap pb-2">
                    {item.fileUrl.split(",").map((file, index) => (
                      <Image
                        key={file + index}
                        alt={String(file)}
                        src={file}
                        className="mr-2 h-[80px] w-[80px] rounded object-cover"
                        classNameWrapper="flex-shrink-0"
                        classNameFallback="opacity-50"
                      />
                    ))}
                  </ScrollBar>
                </div>
              )}

              <div className={"absolute right-0 top-1 flex"}>
                <Button
                  className={({ isPressed }) =>
                    cn(
                      "flex h-8 min-w-8 items-center justify-center rounded-full text-gray-400",
                      isPressed && "[&_svg]:fill-green2-200 [&_svg]:stroke-green2-500",
                    )
                  }
                >
                  <ThumbsUpIcon size={16} />
                </Button>
                <Button
                  className={"flex h-8 w-6 items-center justify-center rounded-full text-gray-400"}
                >
                  <MoreHorizontalIcon size={20} />
                </Button>
              </div>
            </div>
          ))}

          {(getListRateRes?.totalRecords || 0) > 3 && (
            <Button
              className={
                "flex h-9 w-full items-center justify-center rounded !border !border-green2-300 text-green2-400"
              }
              onPress={() => setIsOpenRateList(true)}
            >
              <span>Xem tất cả</span>
              <ChevronRightIcon size={20} />
            </Button>
          )}
        </div>
      ) : (
        <div className="flex h-12 flex-col justify-center">
          <div className="text-green2-300">Chưa có đánh giá</div>
        </div>
      )}
      {!!listRate?.length && (
        <DrawerRateList isOpen={isOpenRateList} onOpenChange={setIsOpenRateList} item={itemData} />
      )}
    </div>
  );
};

export default ItemRateList;
