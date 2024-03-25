import Link from "next/link";
import { useId } from "react";

import useTranslation from "@/hooks/use-translation";
import { TClassValue } from "@/types/global-type";
import { TItem } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";

import { Rank2Svg, Rank3Svg, RankStarSvg } from "../icons";
import Image from "../shared/image";
import Video from "../shared/video";

type TItemTopSearch = TItem & {
  onClickCartBtn?: (item?: TItem["id"]) => void;
  isInCart?: boolean;
  isCategory?: boolean;
  className?: TClassValue;
  index?: number;
};

const ItemTopSearch = ({ index, className, ...item }: TItemTopSearch) => {
  const uid = useId();

  const listImage = item.imageUrlList || [];
  const listVideo = item.videoUrlList || [];

  return (
    <div
      className={cn(
        "group/ItemCard2 relative flex flex-col rounded bg-gray-50 shadow-sm outline-none transition-all",
        index === 0 && "bg-orange-50 shadow-md shadow-orange-100",
        index === 1 && "bg-blue-50 shadow shadow-blue-100",
        index === 2 && "bg-stone-50 shadow shadow-stone-100",
        className,
      )}
    >
      <div className="absolute left-0 top-0 z-10">
        <div className="overflow-hidden rounded-b-full rounded-t bg-white/80 p-1 backdrop-blur-sm">
          {index === 0 && <RankStarSvg width={30} height={30} />}
          {index === 1 && <Rank2Svg width={26} height={26} />}
          {index === 2 && <Rank3Svg width={26} height={26} />}
        </div>
      </div>

      <div className="relative h-[166px] w-[166px] lg:h-[228px] lg:w-[228px]">
        <Link
          href={`/items/${item.id}`}
          className={cn(
            "relative flex h-full w-full max-w-full overflow-hidden rounded-t border-4 border-gray-50 bg-gray-50",
            index === 0 && "border-orange-50 bg-orange-50",
            index === 1 && "border-blue-50 bg-blue-50",
            index === 2 && "border-stone-50 bg-stone-50",
          )}
        >
          <Image
            key={uid + String(item) + "Image"}
            src={listImage[0]}
            alt={item.name}
            className="absolute left-0 top-0 z-[1] h-full w-full rounded-t object-cover group-hover/ItemCard2:z-0"
            classNameFallback="opacity-50"
          />

          {!!listVideo.length && (
            <Video
              key={uid + String(item) + "Video"}
              loop
              autoPlay
              playsInline
              src={listVideo[0]}
              className="absolute left-0 top-0 z-0 h-full w-full rounded-t object-cover group-hover/ItemCard2:z-[1]"
              classNameFallback="opacity-50"
            />
          )}
        </Link>
      </div>
      <div className="mb-1 flex min-h-0 flex-[1_1_auto] flex-col px-1">
        <Link
          href={`/items/${item.id}`}
          className={cn(
            "mb-0.5 line-clamp-2 pt-1 text-left text-base font-[500] leading-[1.1] text-gray-700 group-hover/ItemCard:text-green2-400 group-hover/ItemCard:underline",
          )}
        >
          {item.name}
        </Link>

        <div className="mt-auto flex">
          <div className="flex items-end text-xs text-gray-400">
            <span>Đã bán:</span>
            <span
              className={cn(
                "ml-0.5 font-[500]",
                index === 0 && "text-orange-500",
                index === 1 && "text-blue-500",
                index === 2 && "text-stone-500",
              )}
            >
              {formatNumber(item.sales)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTopSearch;
