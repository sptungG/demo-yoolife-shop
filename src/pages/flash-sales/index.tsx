import dayjs from "dayjs";
import React, { useId, useState } from "react";
import { GridList, Key, Tab, TabList, Tabs } from "react-aria-components";

import { ItemCard2Skeleton } from "@/components/item/item-card-2";
import ItemFlashSale from "@/components/item/item-flash-sale";
import Layout01 from "@/components/layout/Layout01";
import Image from "@/components/shared/image";
import { itemApi } from "@/redux/query/item-query";
import { NOT_FOUND_IMG } from "@/utils/constant";
import { cn } from "@/utils/utils";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<Key>(0);
  const listHour = [0, 2, 6, 9, 12, 15, 17, 19, 21];

  let dateStart = dayjs(`${dayjs().format("YYYY-MM-DD")} ${listHour[+selectedTab]}:00`);
  let dateEnd = dayjs(`${dayjs().format("YYYY-MM-DD")} ${listHour[+selectedTab + 1]}:00`);

  const currentHour = dayjs().hour();

  const [selectedItemId, setSelectedItemId] = useState<number>();
  const uid = useId();

  const { data: getFlashSaleListRes } = itemApi.useGetListFlashSaleByUserQuery({
    maxResultCount: 100,
    dateStart: dateStart.toISOString(),
    dateEnd: dateEnd.toISOString(),
  });
  const listFlashSale = getFlashSaleListRes?.data || [];

  const indexH = listHour.findIndex((hour) => hour > currentHour);
  const listHourFlashSales =
    indexH > 4 ? listHour.slice(indexH - 1) : listHour.slice(indexH - 1, indexH + 4);

  return (
    <Layout01>
      <div className="relative mb-6 px-2">
        <div className="mx-auto mb-6 w-full max-w-[1200px] rounded-b-3xl bg-white py-6">
          <div className="relative h-full w-full ">
            <Image
              src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/72/97/55/4a4674981e53f0474b668acdecc7f67b.png.webp"
              alt="Banner"
              fallback={NOT_FOUND_IMG}
              className="left-0 top-0 h-full w-full rounded-t object-cover"
              classNameFallback="h-[100px] w-[100px]  -translate-x-1/2 shadow-none -translate-y-1/2"
            />
          </div>
          <Tabs
            className="flex flex-col"
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <div className="flex items-center justify-between">
              <TabList className=" mb-4 flex w-full cursor-pointer justify-start bg-gray-200">
                {listHourFlashSales.map((item, index) => (
                  <Tab
                    id={`${index}`}
                    key={uid + "indexFlashSales" + index}
                    className={({ isSelected }) =>
                      cn(
                        "lg: w-[20%] flex-col items-center justify-center py-1 text-center font-[500] text-gray-400 outline-none lg:py-3",
                        isSelected && "bg-green3-500 text-white",
                      )
                    }
                  >
                    <h5 className="text-base leading-[14px] lg:text-lg">
                      {item}
                      {":00"}
                    </h5>
                    <span className="text-[10px] font-normal lg:text-lg">
                      {index == 0 ? "Đang diễn ra" : "Sắp diễn ra"}
                    </span>
                  </Tab>
                ))}
              </TabList>
            </div>
          </Tabs>
          <GridList
            aria-label="listItemFlashSale"
            className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4"
            renderEmptyState={() =>
              Array(4)
                .fill(null)
                .map((_, index) => (
                  <ItemCard2Skeleton key={uid + "listItemFlashSale:loading" + index} />
                ))
            }
            items={listFlashSale}
          >
            {(item) => (
              <ItemFlashSale
                key={uid + "listItemFlashSale" + item.id}
                onClickCartBtn={(item) => setSelectedItemId(item)}
                {...item}
              />
            )}
          </GridList>
        </div>
      </div>
    </Layout01>
  );
};

export default Page;
