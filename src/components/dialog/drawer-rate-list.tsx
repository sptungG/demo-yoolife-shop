import { skipToken } from "@reduxjs/toolkit/query";
import { MoreHorizontalIcon, StarIcon, ThumbsUpIcon, XIcon } from "lucide-react";
import { useId, useState } from "react";
import { Heading, Button as RAButton } from "react-aria-components";

import { itemApi } from "@/redux/query/item-query";
import { TItem, TListRateFilter } from "@/types/item-type";
import { cn } from "@/utils/utils";
import { formatDate } from "@/utils/utils-date";

import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";
import Rate5 from "../shared/rate";
import Drawer, { DrawerClose } from "./drawer";

type TDrawerRateListProps = {
  item: TItem;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const maxResultCount = 10;

const DrawerRateList = ({ item, isOpen, onOpenChange }: TDrawerRateListProps) => {
  const uid = useId();
  const [filterReq, setFilterReq] = useState<Partial<TListRateFilter>>({
    sortBy: 2,
    orderBy: 1,
    type: 3,
    itemId: item.id,
    maxResultCount,
    skipCount: 0,
  });

  const { currentData: getListRateRes, isFetching: getListRateFetching } =
    itemApi.useGetListRate2Query(item.id ? filterReq : skipToken, {
      refetchOnMountOrArgChange: true,
    });
  const listRate = getListRateRes?.data || [];
  const totalRecords = getListRateRes?.totalRecords || 0;

  return (
    <Drawer
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-t-lg"
    >
      <DrawerClose
        onPress={() => {
          onOpenChange(false);
        }}
        className={"absolute -top-2 right-2"}
      >
        <XIcon />
      </DrawerClose>

      <Heading
        slot="title"
        className="flex h-9 shrink-0 items-center whitespace-nowrap border-b border-gray-100 px-2 py-1 text-lg text-gray-600"
      >
        <div className="relative mr-1 h-6 w-6 shrink-0 rounded shadow">
          <Image
            key={uid + String(item) + "Image"}
            src={item.imageUrlList?.[0]}
            alt={item.name}
            className="absolute left-0 top-0 z-0 h-full w-full rounded object-cover"
            classNameFallback="opacity-50"
          />
        </div>
        <span className="line-clamp-1">{item?.name}</span>
        <span className="ml-1 shrink-0 text-green2-500">Đánh giá</span>
      </Heading>
      {!!listRate.length ? (
        <ScrollBar suppressScrollX className="max-h-[calc(100dvh-140px)] min-h-0 flex-[1_1_auto]">
          <div key={uid} className="flex flex-col px-2">
            <div className="sticky top-0 z-10 flex items-end border-b border-gray-100 bg-white py-2">
              <span className="mr-1 text-[36px] leading-none text-orange-300">
                {item.ratePoint ? item.ratePoint.toFixed(2) : "0"}
              </span>
              <div className="flex flex-col justify-start">
                <div className="flex items-center text-sm">
                  <span className="mr-1 text-orange-400">/</span>
                  <span className="text-orange-400">5</span>

                  <span className="mx-1 text-gray-500">•</span>
                  <span className="text-gray-500">{totalRecords || "0"} lượt đánh giá</span>
                </div>
              </div>
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
                      <RAButton
                        className={({ isPressed }) =>
                          cn(
                            "flex h-8 min-w-8 items-center justify-center rounded-full text-gray-400",
                            isPressed && "[&_svg]:fill-green2-200 [&_svg]:stroke-green2-500",
                          )
                        }
                      >
                        <ThumbsUpIcon size={16} />
                      </RAButton>
                      <RAButton
                        className={
                          "flex h-8 w-6 items-center justify-center rounded-full text-gray-400"
                        }
                      >
                        <MoreHorizontalIcon size={20} />
                      </RAButton>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-12 flex-col justify-center">
                <div className="text-green2-300">Chưa có đánh giá</div>
              </div>
            )}
          </div>
        </ScrollBar>
      ) : (
        <div className="flex min-h-[calc(50dvh-56px)] w-full flex-[1_1_auto] flex-col items-center justify-center">
          {/* <EmptyVoucherSvg width={140} height={140} /> */}
          {/* <div className="font-[500] text-gray-600">Chưa có mã giảm giá nào của Shop</div> */}
          {/* <div className="">Nhập mã giảm giá có thể sử dụng vào thanh bên trên</div> */}
        </div>
      )}

      {!!listRate.length && (
        <div
          className={cn(
            "flex h-14 shrink-0 items-center justify-between gap-2 border-t border-t-gray-100 px-2",
            listRate.length < totalRecords ? "" : " border-none text-gray-500",
          )}
        >
          <RAButton
            isDisabled={listRate.length >= totalRecords}
            type="button"
            onPress={() => {
              setFilterReq((prev) => ({
                ...prev,
                skipCount: (prev?.skipCount || 0) + maxResultCount,
              }));
            }}
            className={cn(
              "relative ml-auto flex h-10 w-full shrink-0 items-center justify-center rounded-lg border border-green2-300 font-[400] text-green2-500",
              listRate.length < totalRecords ? "" : "hidden border-gray-300 text-gray-500",
            )}
          >
            {listRate.length < totalRecords ? "Xem thêm" : "Đã xem hết rồi"}
          </RAButton>
        </div>
      )}
    </Drawer>
  );
};

export default DrawerRateList;
