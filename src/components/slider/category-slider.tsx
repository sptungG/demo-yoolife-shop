import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Button, Key, Tab, TabList, Tabs } from "react-aria-components";
import { Grid, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import useTreeData from "@/hooks/use-tree-data";
import { categoryApi } from "@/redux/query/category-query";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn } from "@/utils/utils";

import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";

type TCategorySliderProps = {};

const CategorySlider = ({}: TCategorySliderProps) => {
  const uid = useId();
  const [selectedTab, setSelectedTab] = useState<Key>();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { data: getAllCategoriesRes } = categoryApi.useGetAllCategoriesQuery({
    maxResultCount: 1000,
  });
  // const listCategory =
  //   getAllCategoriesRes?.result?.data?.items?.filter((item) => item.parentId) || [];

  const nestedListCategory = useTreeData(
    (getAllCategoriesRes?.data || []).map((c) => ({
      label: c.name,
      value: String(c.id),
      id: String(c.id),
      pId: String(c.parentId),
      iconUrl: c.iconUrl,
    })),
    { id: "id", pId: "pId" },
  );
  const mappedListCategory = [
    { value: "OTHERS", label: "Khác", children: nestedListCategory.filter((c) => !c.children) },
    ...nestedListCategory,
  ];
  const foundChildren = useMemo(
    () => mappedListCategory.find((c) => c.value === selectedTab)?.children || [],
    [selectedTab, nestedListCategory],
  );

  return (
    <Tabs className="" selectedKey={selectedTab} onSelectionChange={(k) => setSelectedTab(k)}>
      <div className="flex items-center px-6 pt-3">
        <div className="mr-3 shrink-0 whitespace-nowrap pb-2 text-xl font-[500] text-green2-500">
          Danh mục
        </div>

        <ScrollBar className="min-w-0 flex-[1_1_auto] px-1 pb-2.5 pt-1">
          <TabList className="flex items-center gap-2">
            {mappedListCategory
              .filter((c) => !!c.children?.length)
              .map((c, index) => (
                <Tab
                  key={uid + index + c.value}
                  id={c.value}
                  className={({ isSelected, isHovered }) =>
                    cn(
                      "flex h-8 cursor-pointer items-center rounded-full bg-gray-200 pl-1 outline-none",
                      isHovered && "ring-1 ring-green2-300",
                      isSelected &&
                        "bg-green2-50 text-green2-500 ring-1 ring-green2-300 [&>.img-wrapper]:bg-green2-100",
                    )
                  }
                >
                  <div className="img-wrapper mr-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
                    <Image
                      src={c?.iconUrl}
                      alt={String(c?.label)}
                      fallback={NOT_FOUND_IMG}
                      className="h-6 w-6 shrink-0 rounded-full object-cover"
                      classNameFallback="h-4 w-4 rounded-none"
                    />
                  </div>
                  <span className="mr-0.5 whitespace-nowrap text-sm">{c.label}</span>
                  <span className="mr-0.5">•</span>
                  <span className="mr-2.5 text-sm opacity-50">{c?.children?.length || 0}</span>
                </Tab>
              ))}
          </TabList>
        </ScrollBar>
      </div>
      <div className="group relative px-1">
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          className="swiper-navigation-hide h-[264px] w-full py-2"
          slidesPerView={8}
          grid={{
            rows: 2,
            fill: "row",
          }}
          scrollbar={{
            hide: true,
            draggable: true,
            horizontalClass: cn("!h-[6px]"),
          }}
          navigation
          spaceBetween={0}
          modules={[Grid, Scrollbar, Navigation]}
          loop={false}
          breakpoints={{
            0: {
              slidesPerView: 2,
              grid: { rows: 2, fill: "row" },
            },
            560: {
              slidesPerView: 3,
              grid: { rows: 2, fill: "row" },
            },
            680: {
              slidesPerView: 4,
              grid: { rows: 2, fill: "row" },
            },
            768: {
              slidesPerView: 6,
              grid: { rows: 2, fill: "row" },
            },
            1000: {
              slidesPerView: 8,
              grid: { rows: 2, fill: "row" },
            },
          }}
        >
          {foundChildren?.map((item, index) => (
            <SwiperSlide key={uid + index + item.id} className="">
              <div className="group/child flex h-full flex-col items-center justify-center">
                <div className="flex w-full items-end justify-center">
                  <div className="z-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-sm text-gray-500 backdrop-blur-md group-hover/child:bg-gray-100 group-hover/child:shadow-md group-hover/child:shadow-green2-100">
                    <Image
                      src={item?.iconUrl}
                      alt={String(item?.label)}
                      fallback={NOT_FOUND_IMG}
                      className="z-0 h-16 w-16 shrink-0 rounded-2xl object-cover "
                      classNameFallback="h-8 w-8 rounded-none"
                    />
                  </div>
                </div>
                <Link
                  href={`/category/${item.id}`}
                  target="_blank"
                  className="mt-2 min-h-[40px] overflow-hidden px-2 text-center"
                >
                  <span className="line-clamp-2 leading-[1.1] text-gray-500 group-hover/child:font-[500] group-hover/child:text-green2-500 group-hover/child:underline">
                    {item.label}
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          className={({ isDisabled }) =>
            cn(
              "absolute left-0 top-[calc(50%-20px)] z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500 lg:hidden lg:group-hover:flex",
              isDisabled && "bg-gray-200 text-gray-500 opacity-50",
            )
          }
          onPress={() => swiperInstance?.slidePrev()}
        >
          <ChevronLeftIcon size={36} className="shrink-0" />
        </Button>
        <Button
          className={({ isDisabled }) =>
            cn(
              "absolute right-0 top-[calc(50%-20px)] z-10 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500 lg:hidden lg:group-hover:flex",
              isDisabled && "bg-gray-200 text-gray-500 opacity-50",
            )
          }
          onPress={() => swiperInstance?.slideNext()}
        >
          <ChevronRightIcon size={36} className="shrink-0" />
        </Button>
      </div>
    </Tabs>
  );
};

export default CategorySlider;
