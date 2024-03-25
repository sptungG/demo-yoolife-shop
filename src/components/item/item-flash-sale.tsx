import { EyeIcon, ImageIcon, ShoppingCartIcon, StarIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button, GridListItem } from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { TClassValue } from "@/types/global-type";
import { TItemFlashSale } from "@/types/item-type";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";

import Image from "../shared/image";

type TItemFlashSaleProps = TItemFlashSale & {
  onClickCartBtn?: (item?: TItemFlashSale["id"]) => void;
  isInCart?: boolean;
  isCategory?: boolean;
  className?: TClassValue;
};

const ItemFlashSale = ({ className, ...item }: TItemFlashSaleProps) => {
  const { t } = useTranslation();

  const listImage = item.itemInfo.imageUrlList || [];
  const percent = (item.sales / item.stock) * 100;

  return (
    <GridListItem
      textValue={String(item.id)}
      className={({}) =>
        cn(
          "group/ItemCard2 relative flex flex-col rounded bg-gray-50 shadow-sm outline-none transition-all",
          className,
        )
      }
    >
      <div className="relative h-[200px] ">
        <div className="relative h-full w-full rounded-t border-4 border-gray-50 bg-gray-50">
          <Image
            src={listImage[0]}
            alt={item.itemInfo.name}
            fallback={NOT_FOUND_IMG}
            className="absolute left-0 top-0 z-[1] h-full w-full rounded-t object-cover group-hover/ItemCard2:z-0"
            classNameFallback="opacity-50"
          />

          {listImage.length > 1 && (
            <Image
              src={listImage[1]}
              alt={item.itemInfo.name}
              fallback={NOT_FOUND_IMG}
              className="absolute left-0 top-0 z-0 h-full w-full rounded-t object-cover group-hover/ItemCard2:z-[1]"
              classNameFallback="opacity-50"
            />
          )}
        </div>
        <div className="absolute bottom-2 right-2 z-[2] hidden group-hover/ItemCard2:flex"></div>
      </div>
      <div className="flex min-h-0 flex-[1_1_auto] flex-col px-2 pb-2">
        <div className="mb-0.5 mt-1 flex">
          <Link
            href={`/items/${item.id}`}
            className="mb-0 line-clamp-2 break-words text-base font-[500] leading-[1.1] text-gray-700 group-hover/ItemCard2:text-green2-400 group-hover/ItemCard2:underline"
          >
            {item.itemInfo.name}
          </Link>
        </div>
        <div className="mt-auto flex h-5 items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-1 text-xs text-gray-400",
              !!item.itemInfo?.ratePoint && "text-orange-300",
            )}
          >
            <StarIcon
              size={14}
              className={cn("-mt-0.5 opacity-50", !!item.itemInfo?.ratePoint && "fill-orange-300")}
            />
            <span className="">
              {!!item.itemInfo?.ratePoint ? item.itemInfo.ratePoint.toFixed(2) : "0"}
            </span>
          </div>
          <div className="flex">
            <EyeIcon
              size={20}
              strokeWidth={2}
              className="mr-0 fill-gray-400 text-gray-50 opacity-50"
            />
            <span className="text-xs text-gray-400">{item.itemInfo.viewCount}</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className=" flex items-center text-sm text-gray-400 ">
              <div className="line-through">
                <span className="">₫</span>
                <span className="">{formatNumber(item.originalPrice)}</span>
              </div>
              <div className="relative ml-3 rounded-sm bg-green2-200 px-2">
                <ZapIcon
                  size={20}
                  className=" text-2-500 absolute left-[-10px] fill-green2-500 outline-none"
                />
                <span className=" ml-1 text-sm font-medium text-green2-500">
                  -{formatNumber(item.percent)}%
                </span>
              </div>
            </div>
            <div className=" text-xl text-green2-500">
              <span className="">₫</span>
              <span className="">{formatNumber(item.currentPrice)}</span>
            </div>
            <div className="relative  h-4 rounded-full bg-green2-200 text-center dark:bg-gray-700">
              <div
                className={cn(`h-4 rounded-full bg-green2-500`)}
                style={{
                  width: `${percent}%`,
                }}
              ></div>
              <div className="absolute top-0 mx-auto flex w-full items-center justify-center text-center text-xs text-white">
                {item.sales ? (
                  <>
                    <span>Đã bán:</span>
                    <span className="ml-0.5 font-[500]">{formatNumber(item.sales)}</span>
                  </>
                ) : (
                  <>
                    <span>{t("Đang bán chạy")}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            className={
              "relative hidden h-10 shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 text-white sm:flex"
            }
          >
            <span>{t("Mua ngay")}</span>
          </Button>
        </div>
      </div>
    </GridListItem>
  );
};

export const ItemCard2Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse rounded bg-white">
      <div className="flex h-48 items-center justify-center rounded-t bg-gray-300 dark:bg-gray-700">
        <ImageIcon className="h-10 w-10 text-gray-200 dark:text-gray-600" />
      </div>
      <div className="p-2 pt-3">
        <div className="mb-4 h-2.5 w-full max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mt-4 flex items-center">
          <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <ShoppingCartIcon className="h-8 w-8 text-gray-200 dark:text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ItemFlashSale;
