import { skipToken } from "@reduxjs/toolkit/query";
import {
  EyeIcon,
  HeartIcon,
  ImageIcon,
  MessagesSquareIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { Button } from "react-aria-components";
import { useDebounce, useWindowScroll } from "react-use";

import ItemDetailDesc from "@/components/card/item-detail-desc";
import ItemProvider from "@/components/card/item-provider";
import ItemRateList from "@/components/card/item-rate-list";
import DrawerCart from "@/components/dialog/drawer-cart";
import { Header01 } from "@/components/header/header";
import HeaderBreadcrumbs from "@/components/header/header-breadcrumbs";
import Layout01 from "@/components/layout/Layout01";
import ScrollBar from "@/components/scrollbar/scroll-bar";
import Image from "@/components/shared/image";
import Rate5 from "@/components/shared/rate";
import ThumbsSlider from "@/components/slider/thumbs-slider";
import useToggleFavorite from "@/hooks/use-toggle-favorite";
import { itemApi } from "@/redux/query/item-query";
import { TItem } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";

type TPageProps = {};

const Page = ({}: TPageProps) => {
  const uid = useId();
  const {
    query: { itemId },
    asPath,
  } = useRouter();
  const currentPath = asPath.split("?")[0];

  const { y } = useWindowScroll();

  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<any>();

  const { data: getItemByIdRes } = itemApi.useGetByIdQuery(itemId ? { id: +itemId } : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const itemData = getItemByIdRes?.data;

  const imageUrlList = itemData?.imageUrlList?.length
    ? itemData?.imageUrlList
    : itemData?.modelList.map((m) => m.imageUrl) || [];

  const { addFavorite, removeFavorite } = useToggleFavorite();

  return (
    <Layout01
      classNameBNav="hidden"
      className="pb-0"
      classNameHeader="fixed"
      classNameHScrolling="bg-white/90 backdrop-blur-sm"
      header={
        <Header01
          left={
            <HeaderBreadcrumbs
              className={y > 0 ? "flex" : "hidden"}
              items={y > 0 ? [{ href: currentPath, children: itemData?.name }] : []}
            />
          }
        />
      }
    >
      {itemData ? (
        <div className="min-h-0 flex-[1_1_auto]">
          <div
            className={cn(
              "mt-0",
              itemData.modelList.length > 1 && "border-b-8 border-gray-100 pb-2",
            )}
          >
            {selectedModel ? (
              <div className="relative mb-1 max-h-[300px] w-full" key={String(selectedModel)}>
                <Image
                  key={JSON.stringify(selectedModel) + "Image"}
                  alt={itemData.name}
                  src={selectedModel.imageUrl}
                  className="h-full w-full object-cover"
                  classNameFallback="opacity-50"
                />
              </div>
            ) : (
              <ThumbsSlider
                key={String(itemData)}
                videos={itemData?.videoUrlList}
                images={imageUrlList}
                direction={"x"}
                classNameSlideWrapper="rounded-none"
                classNameThumbWrapper={cn(itemData.modelList.length > 1 ? "hidden" : "px-[15px]")}
                heightSlide={"auto"}
              />
            )}
            {itemData.modelList.length > 1 && (
              <div className="flex flex-col px-2">
                <span className="mb-1 text-sm text-gray-500">
                  {itemData?.modelList.length || "0"} phân loại có sẵn
                </span>
                <ScrollBar suppressScrollY className="max-w-full">
                  <div className="flex gap-2">
                    {itemData?.modelList.map((m, index) => (
                      <Button
                        onPress={() => {
                          if (selectedModel?.id === m.id) setSelectedModel(undefined);
                          else setSelectedModel(m);
                        }}
                        key={String(m) + index}
                        className={
                          "h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded border border-gray-200"
                        }
                      >
                        <Image
                          alt={String(index + 1)}
                          src={m.imageUrl}
                          className="h-full w-full object-cover"
                          classNameFallback="opacity-50"
                        />
                      </Button>
                    ))}
                  </div>
                </ScrollBar>
              </div>
            )}
          </div>

          <div className="mb-0 flex justify-between px-2 pt-2 align-top">
            <div className="flex flex-col">
              <h3 className="mb-0 line-clamp-2 break-words text-xl font-[600] leading-tight text-gray-600">
                {itemData?.name}
              </h3>
              {!!selectedModel && (
                <span className="text-gray-500 underline">- {selectedModel?.name}</span>
              )}
            </div>
          </div>

          <div className="mb-0 rounded px-2 py-2">
            {!!selectedModel ? (
              <div className="flex text-xl font-[500] text-green2-500">
                <span>₫</span>
                <span>{formatNumber(selectedModel.currentPrice)}</span>
              </div>
            ) : (
              <div className="flex text-xl font-[500] text-green2-500">
                {itemData.maxPrice > itemData.minPrice ? (
                  <>
                    <div className="text-green2-400">
                      <span>₫</span>
                      <span>{formatNumber(itemData.minPrice)}</span>
                    </div>
                    <span className="mx-1">~</span>
                    <div className="">
                      <span>₫</span>
                      <span>{formatNumber(itemData.maxPrice)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span>₫</span>
                    <span>{formatNumber(itemData.minPrice)}</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center border-b-8 border-gray-100 px-2 pb-2">
            <div className="flex flex-wrap items-start">
              <div className="flex items-center text-gray-500">
                <div className="flex items-center">
                  <Rate5 value={itemData.ratePoint} />
                  <span className={cn("ml-1 text-sm", !!itemData.ratePoint && "text-orange-300")}>
                    {!!itemData.ratePoint ? itemData.ratePoint.toFixed(2) : "0"}
                  </span>
                </div>
              </div>

              <span className="mx-2 text-gray-300">|</span>

              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1 text-xs">Đã bán:</span>
                {!!selectedModel ? (
                  <span className={cn(selectedModel.sales && "font-[400] text-green2-500")}>
                    {selectedModel.sales || "0"}
                  </span>
                ) : (
                  <span className={cn(itemData.sales && "font-[400] text-green2-500")}>
                    {itemData.sales || "0"}
                  </span>
                )}
              </div>
              {/* <span className="mx-2 text-gray-300">|</span> */}
              {/* <div className="flex items-center text-sm text-gray-500">
                <span className="text-xs">Lượt xem:</span>
                <span className={cn("ml-1 mr-1", !!itemData?.viewCount && "font-[400]")}>
                  {itemData?.viewCount || "0"}
                </span>
              </div> */}
            </div>

            <Button
              isDisabled={removeFavorite?.isLoading || addFavorite?.isLoading}
              className={cn(
                "ml-auto flex items-center justify-center gap-1 rounded-full text-sm",
                itemData?.isLike && "",
              )}
              onPress={() =>
                !!itemData &&
                (!!itemData?.isLike
                  ? removeFavorite.mutate(itemData.id)
                  : addFavorite.mutate(itemData.id))
              }
            >
              <HeartIcon
                size={22}
                strokeWidth={2.2}
                className={cn(
                  "stroke-gray-400",
                  itemData?.isLike && "fill-green2-400 stroke-green2-400 opacity-90",
                )}
              />
            </Button>
          </div>

          {/* <div className="border-b-8 border-gray-100 px-2 py-2">
            <div className="flex items-center">
              <div className="text-gray-500">Chia sẻ:</div>
            </div>
          </div> */}

          <div className="border-b-8 border-gray-100 px-2 py-2">
            <ItemProvider {...itemData} />
          </div>
          <div className="border-b-8 border-gray-100 px-2 py-2">
            <ItemDetailDesc {...itemData} />
          </div>

          <div className={"border-b-8 border-gray-100 px-2 py-2"}>
            <ItemRateList {...itemData} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-2">
          <div className="flex h-48 min-w-[166px] items-center justify-center rounded-t bg-gray-300 dark:bg-gray-700">
            <ImageIcon className="h-10 w-10 text-gray-200 dark:text-gray-600" />
          </div>
          <div className="p-1 pt-3">
            <div className="mb-4 h-2.5 w-full max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      )}
      <div className="sticky bottom-0 left-0 z-[100] mt-auto flex h-16 shrink-0 items-center justify-between gap-2 bg-white/90 px-2 backdrop-blur-sm">
        <Button className={"flex flex-col items-center justify-center rounded-full text-sm"}>
          <MessagesSquareIcon
            size={22}
            strokeWidth={2.2}
            className={cn("-ml-1 stroke-green2-400")}
          />
          <span className="text-xs text-green2-400">Chat ngay</span>
        </Button>

        <Button
          type="button"
          className={({ isDisabled }) =>
            cn(
              "relative ml-auto flex h-11 shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 text-white",
              isDisabled && "bg-gray-300 opacity-50",
            )
          }
          onPress={() => {
            setIsOpenCartDrawer(true);
          }}
          isDisabled={!itemData?.stock}
        >
          <ShoppingCartIcon size={26} />
          <span className="ml-2 whitespace-nowrap text-left font-[600]">
            {!!itemData?.stock ? "Thêm vào giỏ hàng" : "Đã hết hàng"}
          </span>
        </Button>
        {!!itemData?.stock && isOpenCartDrawer && (
          <DrawerCart
            isOpen={isOpenCartDrawer}
            onOpenChange={(o) => setIsOpenCartDrawer(o)}
            {...itemData}
            imageUrlList={imageUrlList}
          />
        )}
      </div>
    </Layout01>
  );
};

export default Page;
