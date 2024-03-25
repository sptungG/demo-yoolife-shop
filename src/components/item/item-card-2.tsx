import {
  EyeIcon,
  HeartIcon,
  ImageIcon,
  MapPinIcon,
  ShoppingCartIcon,
  StarIcon,
  TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { Button, GridListItem } from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { TItem, TItemAddress } from "@/types/item-type";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";

import { EyeSvg } from "../icons";
import Image from "../shared/image";
import Rate5 from "../shared/rate";
import Video from "../shared/video";
import ItemCardVoucher from "./item-card-voucher";

type TItemCard2Props = TItem & {
  onClickCartBtn?: (item?: TItem["id"]) => void;
  isInCart?: boolean;
  isCategory?: boolean;
  className?: TClassValue;
  vouchersProvider?: React.ReactNode;
};

const ItemCard2 = ({
  onClickCartBtn,
  isInCart,
  isCategory,
  vouchersProvider,
  className,
  ...item
}: TItemCard2Props) => {
  const uid = useId();
  const listImage = item.imageUrlList || [];
  const listVideo = item.videoUrlList || [];

  const itemAddress = JSON.parse(item?.address || "{}") as TItemAddress;

  return (
    <div
      className={cn(
        "group/ItemCard2 relative flex flex-col rounded bg-gray-50 shadow-sm outline-none transition-all hover:ring-1 hover:ring-green2-400",
        className,
      )}
    >
      <div className="relative h-[200px]">
        <Link
          key={uid + String(item)}
          href={`/items/${item.id}`}
          className="relative flex h-full w-full max-w-full overflow-hidden rounded-t border-4 border-gray-50 bg-gray-50"
        >
          {!!listVideo.length ? (
            <Video
              key={uid + String(item) + "Video"}
              loop
              autoPlay
              playsInline
              src={listVideo[0]}
              className="absolute left-0 top-0 z-[1] h-full w-full rounded-t object-cover group-hover/ItemCard2:z-[1]"
              classNameFallback="opacity-50"
            />
          ) : (
            <Image
              key={uid + String(item) + "Image"}
              src={listImage[0]}
              alt={item.name}
              className="absolute left-0 top-0 z-0 h-full w-full rounded-t object-cover"
              classNameFallback="opacity-50"
            />
          )}
        </Link>

        <div className="absolute bottom-2 right-2 z-[2] hidden group-hover/ItemCard2:flex">
          {/* <Button
            className={({}) =>
              cn(
                "flex h-8 items-center justify-center whitespace-nowrap rounded bg-green2-400 px-1.5 text-white",
              )
            }
            onPress={() => onClickCartBtn?.(item.id)}
          >
            <span className="hidden">Thêm vào</span>
            <ShoppingCartIcon size={24} />
            {isInCart && (
              <span className="absolute right-1 top-1.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green2-50 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green2-50"></span>
              </span>
            )}
          </Button> */}
        </div>
      </div>

      {/* {!!item.modelList?.length && item.modelList.length > 1 && (
        <div className="flex items-center justify-start gap-1 px-2">
          {item.modelList.map((m, index) => (
            <div
              key={uid + String(m) + index}
              className="h-6 w-6 overflow-hidden rounded-full border border-gray-100"
            >
              <Image
                src={m.imageUrl}
                alt={item.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      )} */}
      <div className="flex min-h-0 flex-[1_1_auto] flex-col px-2 pb-2 pt-1">
        <div className="mb-1 mt-0 flex">
          <Link
            href={`/items/${item.id}`}
            className="mb-0 line-clamp-2 break-words text-base font-[500] leading-[1.1] text-gray-700 group-hover/ItemCard2:text-green2-400 group-hover/ItemCard2:underline"
          >
            {item.name}
          </Link>

          {/*  */}
        </div>
        {/* <div className="flex h-auto flex-1 flex-col justify-between">
          {isCategory && (
            <div className="my-1 flex ">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <StarIcon
                    size={13}
                    strokeWidth={2.2}
                    className={cn(
                      `mt-auto opacity-40 ${
                        index < item.countRate ? "fill-yellow-300 stroke-yellow-300 " : ""
                      }`,
                    )}
                    key={uid + "listItemMainPage:loading" + index}
                  />
                ))}
            </div>
          )}
        </div> */}
        {/* {isCategory && (
          <div className="flex items-center">
            <MapPinIcon
              size={13}
              strokeWidth={2.2}
              className="text-gray-50 opacity-50 outline-gray-400"
              color="gray"
            />
            <span className="text-xs text-gray-400">{item.address}, Hà Nội</span>
          </div>
        )} */}

        {vouchersProvider}

        <div className="mt-1 flex items-center">
          <div className="line-clamp-1 flex flex-shrink-0 text-base font-[600] leading-[1.1] text-green2-500">
            <span>₫</span>
            <span>{formatNumber(item.minPrice)}</span>
          </div>
        </div>

        <div className="mt-1 flex items-center">
          <MapPinIcon size={13} className="fill-orange-50 text-orange-300" />
          <div className="ml-0.5 flex items-end whitespace-nowrap text-xs text-gray-400">
            {itemAddress.ProvinceName}
          </div>
        </div>

        <div className="mt-0.5 flex items-center">
          <Rate5 value={item?.ratePoint} size={14} />
          <div className="ml-auto flex items-end whitespace-nowrap text-xs text-gray-400">
            <span>Đã bán:</span>
            <span className="ml-0.5 font-[500]">{formatNumber(item.sales)}</span>
          </div>
        </div>
      </div>

      {/* <div className="mb-2 h-[2px]"></div> */}
    </div>
  );
};

export const ItemCard2Skeleton = () => {
  const uid = useId();
  return (
    <div key={uid} role="status" className="max-w-sm animate-pulse rounded bg-white">
      <div className="flex h-48 min-w-[166px] items-center justify-center rounded-t bg-gray-300 dark:bg-gray-700">
        <ImageIcon className="h-10 w-10 text-gray-200 dark:text-gray-600" />
      </div>
      <div className="p-1 pt-3">
        <div className="mb-4 h-2.5 w-full max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ItemCard2;
