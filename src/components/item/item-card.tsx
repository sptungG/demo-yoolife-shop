import { EyeIcon, HeartIcon, ImageIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { Button, GridListItem } from "react-aria-components";

import { TItem } from "@/types/item-type";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";

import Image from "../shared/image";

type TItemCardProps = TItem & { onClickCartBtn?: (item?: TItem["id"]) => void; isInCart?: boolean };

const ItemCard = ({ onClickCartBtn, isInCart, ...item }: TItemCardProps) => {
  const uid = useId();
  const [firstImg, ...restImgs] = item.imageUrlList || [];

  const uniqModelImgs = Array.from(new Set(item.modelList.map((m) => m.imageUrl)));

  return (
    <GridListItem
      textValue={String(item.id)}
      className={({ isFocused }) =>
        cn(
          "group/ItemCard relative flex flex-col rounded outline-none transition-all",
          "hover:-translate-y-1",
        )
      }
    >
      <div className="relative h-[220px]">
        <div className="relative h-full w-full rounded bg-gray-200">
          <Image
            src={firstImg}
            alt={item.name}
            fallback={NOT_FOUND_IMG}
            className="absolute left-0 top-0 z-[1] h-full w-full rounded object-cover shadow group-hover/ItemCard:z-0"
            classNameFallback="h-[100px] w-[100px] top-1/2 left-1/2 -translate-x-1/2 shadow-none -translate-y-1/2"
          />
          <Image
            src={restImgs?.[0]}
            alt={item.name}
            fallback={NOT_FOUND_IMG}
            className="absolute left-0 top-0 z-0 h-full w-full rounded object-cover shadow group-hover/ItemCard:z-[1]"
            classNameFallback="h-[100px] w-[100px] top-1/2 left-1/2 -translate-x-1/2 shadow-none -translate-y-1/2 z-0 hidden"
          />
        </div>
        {/* {!!restImgs.length && (
          <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-sm text-white backdrop-blur-sm">
            +{restImgs.length}
          </span>
        )} */}
        {item.modelList.length > 1 &&
          (uniqModelImgs.length < 2 ? (
            <div className="absolute bottom-2 right-2 z-[2] flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-sm text-white backdrop-blur-sm">
              +{item.modelList.length}
            </div>
          ) : (
            <div className="absolute bottom-2 right-2 z-[2] flex items-center divide-x divide-transparent rounded bg-black/10 p-1 backdrop-blur-sm">
              {item.modelList.map((item, index) => (
                <Image
                  key={uid + index + item}
                  src={item.imageUrl}
                  alt=""
                  className="h-8 w-8 object-cover"
                  classNameFallback="object-contain"
                />
              ))}
            </div>
          ))}
      </div>
      <div className="mb-3">
        <div className="mb-0.5 mt-1 flex h-5 items-center justify-between">
          <div className="flex items-center text-xs text-gray-400">
            <span>Đã bán:</span>
            <span className="ml-0.5 font-[500]">{formatNumber(item.sales)}</span>
          </div>
          <div className="flex">
            <div className="mr-1 flex items-center rounded-full bg-gray-200/60 px-1.5 text-xs text-gray-400">
              <HeartIcon
                size={13.6}
                strokeWidth={2.2}
                className={cn("opacity-40", item.isLike && "fill-green2-400 stroke-green2-400")}
              />
            </div>
            <div className="flex items-center rounded-full bg-gray-200/60 px-1.5 text-xs text-gray-400">
              <EyeIcon size={14} strokeWidth={2.2} className="mr-1 opacity-50" />
              <span>{item.viewCount}</span>
            </div>
          </div>
        </div>
        <Link
          href={`/items/${item.id}`}
          target="_blank"
          className="mb-0 line-clamp-2 text-lg font-[500] leading-[1.2] text-gray-700 group-hover/ItemCard:text-green2-400 group-hover/ItemCard:underline"
        >
          {item.name}
        </Link>
      </div>

      {/* <div className="mb-2 h-[2px]"></div> */}

      <div className="relative mb-2 mt-auto flex justify-between">
        <div className="flex shrink-0 items-end text-[18px] font-[500] text-green2-500">
          <span>₫</span>
          <span>{formatNumber(item.minPrice)}</span>
        </div>

        <Button
          className={({ isHovered }) =>
            cn(
              "absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded bg-green2-400 text-white",
            )
          }
          onPress={() => onClickCartBtn?.(item.id)}
        >
          <ShoppingCartIcon size={24} />
          {/* <Plus
            size={12}
            strokeWidth={3}
            className="absolute right-0.5 top-0.5 rounded-full bg-white text-green2-400"
          /> */}
          {isInCart && (
            <span className="absolute right-1 top-1.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green2-50 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green2-50"></span>
            </span>
          )}
        </Button>
      </div>
    </GridListItem>
  );
};

export const ItemCardSkeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse rounded">
      <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
        <ImageIcon className="h-10 w-10 text-gray-200 dark:text-gray-600" />
      </div>
      <div className="mb-4 h-2.5 w-full max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 flex items-center">
        <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <ShoppingCartIcon className="h-8 w-8 text-gray-200 dark:text-gray-700" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ItemCard;
