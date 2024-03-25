import { DevTool } from "@hookform/devtools";
import { skipToken } from "@reduxjs/toolkit/query";
import { t } from "i18next";
import {
  EyeIcon,
  HeartIcon,
  MessagesSquare,
  Plus,
  Star,
  StarIcon,
  Store,
  UserRoundCheck,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { MessageSquareMore } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useId, useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { Key } from "react-aria-components";

import Button from "@/components/button/Button";
import Header from "@/components/header/header";
import Image from "@/components/shared/image";
import VoucherSlider from "@/components/slider/voucher-slider";
import { itemApi } from "@/redux/query/item-query";
import { providerApi } from "@/redux/query/provider-query";
import { voucherApi } from "@/redux/query/voucher-query";
import { EImageConfigType, TImageConfig } from "@/types/item-type";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";

type TPageProps = {};

const Page = ({}: TPageProps) => {
  const {
    query: { storeId },
  } = useRouter();
  const { data: getListImageConfig } = itemApi.useGetListImageConfigQuery({ maxResultCount: 12 });
  const [selectedTab, setSelectedTab] = useState<Key>("All");
  const ListImageConfig = useMemo(
    () =>
      getListImageConfig?.result.filter(
        (element: TImageConfig) => element.type === EImageConfigType.YoolifeShoppingBanner,
      ),
    [getListImageConfig?.result],
  );
  const { data: getListItemByUserRes } = itemApi.useGetListByUserQuery(
    storeId ? { providerId: +storeId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const listItem = getListItemByUserRes?.data || [];
  const listItem2 = getListItemByUserRes?.data.filter((item) => item.viewCount > 10) || [];
  const { data: getProviderRes } = providerApi.useGetProviderByIdQuery(
    storeId ? { id: +storeId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: getVouchersRes } = voucherApi.useGetListVoucherByUserQuery(
    storeId ? { providerId: +storeId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const storeData = getProviderRes?.data;
  const storeImage = useMemo(() => storeData?.imageUrls[0], [storeData]);
  return (
    <>
      <div className="">
        <Header />
        <div className="mx-auto mt-5 max-w-[1200px] rounded-3xl px-2">
          <div className="flex gap-4 overflow-hidden py-5">
            <div
              style={{
                backgroundImage: `url(
                  https://imaxhitech.com/wp-content/uploads/2023/09/Platform-03-03-2048x2048.png)`,
              }}
              className="flex w-full flex-row justify-between rounded px-3 py-3 md:w-1/3 md:flex-col md:justify-start"
            >
              <div className="flex justify-start gap-2 bg-contain">
                <Image
                  src={storeImage}
                  alt="storeImage"
                  width={72}
                  height={0}
                  className="mx-auto flex-shrink-0 rounded-full border-2 border-white opacity-70 ring-2"
                />
                <div className="text-white">
                  {storeData?.name}
                  <div className="text-xs">{t("Online 6 phút trước")}</div>
                  <div className="flex justify-around text-xs  md:hidden">
                    <div className="flex flex-row items-center">
                      <Star className="text-yellow-400" size={10} />
                      {t("Đánh giá:")} {storeData?.ratePoint.toFixed(1) + `/5`}
                    </div>
                    <div>|</div>
                    <div className=" ">129 {t("Người theo dõi")}</div>
                  </div>
                </div>
              </div>
              <div className="mt-2 grid gap-4 text-white md:grid-flow-row md:grid-cols-2">
                <div className="flex flex-row items-center justify-center rounded border-2 border-red-400 px-[2px] py-1 text-red-400 sm:px-2 ">
                  <Plus size={20} />
                  {t("Theo dõi")}
                </div>
                <div className="flex flex-row items-center justify-center rounded border-2 border-white px-[2px] py-1 sm:px-2  ">
                  <MessagesSquare size={20} />
                  {t("Chat")}
                </div>
              </div>
            </div>
            <div className="hidden grid-flow-row grid-cols-2 pt-2 md:grid md:w-2/3">
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-1 ">
                  <Store size={20} />
                  {t("Sản phẩm:")} 129
                </div>
                <div className="flex flex-row gap-1">
                  <UserRoundPlus size={20} />
                  {t("Đang theo dõi:")} 1
                </div>
                <div className="flex flex-row gap-1">
                  <MessageSquareMore size={20} />
                  {t("Tỉ lệ Phản hồi chat:")}
                  96%
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-1 ">
                  <Users size={20} />
                  {t("Người theo dõi:")} 129
                </div>
                <div className="flex flex-row gap-1">
                  <Star size={20} />
                  {t("Đánh giá:")} {storeData?.ratePoint.toFixed(1) + `(${storeData?.countRate})`}
                  {t("Lượt đánh giá")}
                </div>
                <div className="flex flex-row gap-1">
                  <UserRoundCheck size={20} />
                  {t("Tham gia:")}
                  20 Tháng trước
                </div>
              </div>
            </div>
          </div>
          <div>
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              className="flex flex-col"
            >
              <TabList className="sticky top-0 z-10 my-4 flex cursor-pointer bg-white md:relative ">
                <Tab
                  className={({ isSelected }) =>
                    cn(
                      "flex h-[32px] items-center border-b px-3 font-[500] text-gray-400 focus-visible:border-0 focus-visible:ring-0",
                      isSelected && "border-b-green2-400 text-green2-400",
                    )
                  }
                  id="Refer"
                >
                  {t("Phù hợp nhất")}
                </Tab>
                <Tab
                  className={({ isSelected }) =>
                    cn(
                      "flex h-[32px] items-center border-b px-3 font-[500] text-gray-400 focus-visible:border-0 focus-visible:ring-0",
                      isSelected && "border-b-green2-400 text-green2-400",
                    )
                  }
                  id="All"
                >
                  {t("Tất cả sản phẩm")}
                </Tab>
              </TabList>

              <TabPanel id="Refer">
                <div className="mb-2 text-lg font-bold">{t("Sản phẩm gợi ý cho bạn")}</div>
                <div className="relative px-[30px] py-[20px]">
                  <div className="absolute left-0 top-0 mb-2 font-medium">{t("VOUCHER")}</div>
                  <VoucherSlider />
                </div>
                <div className="grid grid-cols-2 gap-2 px-1 md:grid-cols-3 lg:grid-cols-4">
                  {listItem2.map((item, index) => (
                    <div className="cursor-pointer bg-gray-50" key={index}>
                      <div className="rounded">
                        <Image
                          className="w-full rounded-t-sm"
                          src={item.imageUrlList[0]}
                          alt={item.name}
                          fallback={NOT_FOUND_IMG}
                        ></Image>
                      </div>
                      <div className="p-2">
                        <div className="line-clamp-2">{item.name}</div>
                        <div className="mt-auto flex h-5 items-center justify-between">
                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs text-gray-400",
                              !!item?.ratePoint && "text-orange-300",
                            )}
                          >
                            <StarIcon
                              size={14}
                              className={cn(
                                "-mt-0.5  fill-yellow-400 opacity-50 ",
                                !!item?.ratePoint && "fill-orange-300",
                              )}
                            />
                            <span className="">
                              {!!item?.ratePoint ? item.ratePoint.toFixed(2) : "0"}
                            </span>
                          </div>
                          <div className="flex">
                            <div className="mr-2 flex items-center rounded-full text-xs text-gray-400">
                              <HeartIcon
                                size={13}
                                strokeWidth={2.2}
                                className={cn(
                                  "fill-green2-400 opacity-40",
                                  item.isLike && "fill-green2-400 stroke-green2-400",
                                )}
                              />
                            </div>
                            <div className="flex items-center rounded-full">
                              <EyeIcon
                                size={20}
                                strokeWidth={2}
                                className="mr-0 fill-gray-400 text-gray-50 opacity-50"
                              />
                              <span className="text-xs text-gray-400">{item.viewCount}</span>
                            </div>
                          </div>
                        </div>

                        <div className=" flex items-end">
                          <div className="line-clamp-1 flex flex-shrink-0 font-[600] leading-[1.1] text-green2-500">
                            <span>₫</span>
                            <span>{formatNumber(item.minPrice)}</span>
                          </div>
                          <div className="ml-auto flex items-end text-xs text-gray-400">
                            <span>Đã bán:</span>
                            <span className="ml-0.5 font-[500]">{formatNumber(item.sales)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Button
                    className="flex h-12 w-full items-center justify-center rounded font-[500] text-green2-400 ring-1 ring-green2-400"
                    classNameHovered="bg-green2-50"
                  >
                    Xem thêm
                  </Button>
                </div>
              </TabPanel>
              <TabPanel id="All">
                <div className="mb-2 text-lg font-bold">{t("Tất cả sản phẩm")}</div>
                <div className="relative px-[30px] py-[20px]">
                  <div className="absolute left-0 top-0 mb-2 font-medium">{t("VOUCHER")}</div>
                  <VoucherSlider />
                </div>
                <div className="grid grid-cols-2 gap-2 px-1 md:grid-cols-3 lg:grid-cols-4">
                  {listItem.map((item, index) => (
                    <div className="cursor-pointer bg-gray-50" key={index}>
                      <div className="rounded">
                        <Image
                          className="w-full rounded-t-sm"
                          src={item.imageUrlList[0]}
                          alt={item.name}
                          fallback={NOT_FOUND_IMG}
                        ></Image>
                      </div>
                      <div className="p-2">
                        <div className="line-clamp-2">{item.name}</div>
                        <div className="mt-auto flex h-5 items-center justify-between">
                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs text-gray-400",
                              !!item?.ratePoint && "text-orange-300",
                            )}
                          >
                            <StarIcon
                              size={14}
                              className={cn(
                                "-mt-0.5  fill-yellow-400 opacity-50 ",
                                !!item?.ratePoint && "fill-orange-300",
                              )}
                            />
                            <span className="">
                              {!!item?.ratePoint ? item.ratePoint.toFixed(2) : "0"}
                            </span>
                          </div>
                          <div className="flex">
                            <div className="mr-2 flex items-center rounded-full text-xs text-gray-400">
                              <HeartIcon
                                size={13}
                                strokeWidth={2.2}
                                className={cn(
                                  "fill-green2-400 opacity-40",
                                  item.isLike && "fill-green2-400 stroke-green2-400",
                                )}
                              />
                            </div>
                            <div className="flex items-center rounded-full">
                              <EyeIcon
                                size={20}
                                strokeWidth={2}
                                className="mr-0 fill-gray-400 text-gray-50 opacity-50"
                              />
                              <span className="text-xs text-gray-400">{item.viewCount}</span>
                            </div>
                          </div>
                        </div>

                        <div className=" flex items-end">
                          <div className="line-clamp-1 flex flex-shrink-0 font-[600] leading-[1.1] text-green2-500">
                            <span>₫</span>
                            <span>{formatNumber(item.minPrice)}</span>
                          </div>
                          <div className="ml-auto flex items-end text-xs text-gray-400">
                            <span>Đã bán:</span>
                            <span className="ml-0.5 font-[500]">{formatNumber(item.sales)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Button
                    className="flex h-12 w-full items-center justify-center rounded font-[500] text-green2-400 ring-1 ring-green2-400"
                    classNameHovered="bg-green2-50"
                  >
                    Xem thêm
                  </Button>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
