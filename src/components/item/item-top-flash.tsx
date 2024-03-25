import { FlameIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { ProgressBar } from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { TItem, TItemFlashSale } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";

import Image from "../shared/image";
import Video from "../shared/video";

type TItemTopFlash = TItem & {
  onClickCartBtn?: (item?: TItem["id"]) => void;
  isInCart?: boolean;
  isCategory?: boolean;
  className?: TClassValue;
};

const ItemTopFlash = ({ className, ...item }: TItemTopFlash) => {
  const uid = useId();
  const listImage = item.imageUrlList || [];

  const percentage = !!item?.sales ? (item.sales / (item.stock + item.sales)) * 100 : 0;

  return (
    <div
      className={cn(
        "group/ItemCard2 relative flex flex-col rounded bg-gray-50 shadow-sm outline-none transition-all",
        className,
      )}
    >
      <div className="relative h-[166px] w-[166px] lg:h-[228px] lg:w-[228px]">
        <Link
          key={uid + String(item)}
          href={`/items/${item.id}`}
          className="relative flex h-full w-full rounded-t border-4 border-gray-50 bg-gray-50"
        >
          <Image
            key={uid + String(item) + "Image"}
            src={listImage[0]}
            alt={item.name}
            className="absolute left-0 top-0 z-0 h-full w-full rounded-t object-cover group-hover/ItemCard2:z-0"
            classNameFallback="opacity-50"
          />
        </Link>
        <div className="absolute bottom-2 right-2 z-[2] hidden group-hover/ItemCard2:flex"></div>
      </div>
      <div className="my-1 flex flex-col px-1">
        <div className="mb-2 line-clamp-1 flex justify-center font-[600] leading-[1.1] text-green2-500">
          <span>₫</span>
          <span>{formatNumber(item.minPrice)}</span>
        </div>

        <ProgressBar
          value={percentage}
          className={cn(
            "relative flex h-[18px] w-full rounded-full bg-green2-200/90",
            percentage > 60 ? "" : "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "z-[1] flex-shrink-0 rounded-l-full bg-green2-500",
              percentage > 32 && "z-0",
              percentage > 90 && "rounded-r-full",
            )}
            style={{ width: percentage + "%" }}
          />

          {percentage > 90 && (
            <div className="absolute bottom-1 left-1">
              <FlameIcon className="fill-green2-400 text-green2-100" />
            </div>
          )}

          <div
            className={cn(
              "absolute top-1/2 z-0 mx-auto flex w-full -translate-y-1/2 items-center justify-center overflow-hidden rounded-full text-center text-xs font-[500] uppercase text-white",
              percentage < 10 ? "backdrop-blur" : "",
            )}
          >
            {percentage < 100 ? (
              item.sales ? (
                <>
                  <span>Đã bán:</span>
                  <span className="ml-0.5 font-[600]">{formatNumber(item.sales)}</span>
                </>
              ) : (
                <span>Đang bán chạy</span>
              )
            ) : (
              <span>Hết hàng</span>
            )}
          </div>
        </ProgressBar>
      </div>
    </div>
  );
};

type TItemFlashSaleProps = TItemFlashSale & {
  onClickCartBtn?: (item?: TItem["id"]) => void;
  isInCart?: boolean;
  isCategory?: boolean;
  className?: TClassValue;
};
export const ItemFlashSale = ({ className, ...item }: TItemFlashSaleProps) => {
  const uid = useId();
  const listImage = item.itemInfo.imageUrlList || [];

  const percentage = !!item?.sales ? (item.sales / (item.stock + item.sales)) * 100 : 0;

  return (
    <div
      className={cn(
        "group/ItemCard2 relative flex flex-col rounded bg-gray-50 shadow-sm outline-none transition-all",
        className,
      )}
    >
      <div className="relative h-[166px] w-[166px]">
        <Link
          key={uid + String(item)}
          href={`/items/${item.id}`}
          className="relative flex h-full w-full rounded-t border-4 border-gray-50 bg-gray-50"
        >
          <Image
            key={uid + String(item) + "Image"}
            src={listImage[0]}
            alt={item.itemInfo.name}
            className="absolute left-0 top-0 z-0 h-full w-full rounded-t object-cover group-hover/ItemCard2:z-0"
            classNameFallback="opacity-50"
          />
          {!!item.percent && (
            <div className="absolute right-0 top-0">
              <div className="flex items-center bg-green2-50 pr-1">
                <div className="-ml-2.5">
                  <ZapIcon size={20} className="fill-green3-300 text-green3-400" />
                </div>
                <span className="text-sm text-green2-500">{`-${item.percent}%`}</span>
              </div>
            </div>
          )}
        </Link>
        <div className="absolute bottom-2 right-2 z-[2] hidden group-hover/ItemCard2:flex"></div>
      </div>
      <div className="my-1 flex flex-col px-1">
        <div className="mb-2 line-clamp-1 flex justify-center font-[600] leading-[1.1] text-green2-500">
          <span>₫</span>
          <span>{formatNumber(item.currentPrice)}</span>
        </div>

        <ProgressBar
          value={percentage}
          className={cn(
            "relative flex h-[18px] w-full rounded-full bg-green2-200/90",
            percentage > 60 ? "" : "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "z-[1] flex-shrink-0 rounded-l-full bg-green2-500",
              percentage > 32 && "z-0",
              percentage > 90 && "rounded-r-full",
            )}
            style={{ width: percentage + "%" }}
          />

          {percentage > 90 && (
            <div className="absolute bottom-1 left-1">
              <FlameIcon className="fill-green2-400 text-green2-100" />
            </div>
          )}

          <div
            className={cn(
              "absolute top-1/2 z-0 mx-auto flex w-full -translate-y-1/2 items-center justify-center overflow-hidden rounded-full text-center text-xs font-[500] uppercase text-white",
              percentage < 10 ? "backdrop-blur" : "",
            )}
          >
            {percentage < 100 ? (
              item.sales ? (
                <>
                  <span>Đã bán:</span>
                  <span className="ml-0.5 font-[600]">{formatNumber(item.sales)}</span>
                </>
              ) : (
                <span>Đang bán chạy</span>
              )
            ) : (
              <span>Hết hàng</span>
            )}
          </div>
        </ProgressBar>
      </div>
    </div>
  );
};

export default ItemTopFlash;
