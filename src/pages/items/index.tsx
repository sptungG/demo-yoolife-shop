import { FilterIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useId, useMemo, useState } from "react";
import { GridList, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { Key } from "react-aria-components";

import Button from "@/components/button/Button";
import Drawer from "@/components/dialog/drawer";
import Header from "@/components/header/header";
import CategoriesGroup from "@/components/item/categories-group";
import { ItemCard2Skeleton } from "@/components/item/item-card-2";
import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { OrderByItem } from "@/types/item-type";
import { cn } from "@/utils/utils";

const Page = () => {
  const uid = useId();

  const [filterData, setFilterData] = useQueryState("businessType", parseAsInteger);
  const [selectedTab, setSelectedTab] = useState<Key>("Popular");

  const { t } = useTranslation();

  const { data: getAllItemsCategoryRes } = itemApi.useGetListItemsByUserQuery(
    {
      maxResultCount: 12,
      businessType: filterData ? filterData : undefined,
      orderBy: OrderByItem?.[selectedTab] || 1,
    },
    { refetchOnFocus: false },
  );
  const listItemCategory = getAllItemsCategoryRes?.data || [];
  const totalRecords = useMemo(
    () => getAllItemsCategoryRes?.totalRecords || 0,
    [getAllItemsCategoryRes?.totalRecords],
  );

  return (
    <>
      <div className="">
        <Header />
        <div className="z-10 mx-auto max-w-[1200px] rounded-3xl px-2">
          <Tabs
            className="flex flex-col"
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
          >
            <div className="flex items-center justify-between">
              <TabList className="my-4 flex cursor-pointer bg-black">
                <Tab
                  id="Popular"
                  className={({ isSelected }) =>
                    cn(
                      "flex h-[32px] items-center border-b pr-3 font-[500] text-gray-400",
                      isSelected && "border-b-green2-400 text-green2-400",
                    )
                  }
                >
                  {t("Phù hợp nhất")}
                </Tab>
                <Tab
                  id="TopSales"
                  className={({ isSelected }) =>
                    cn(
                      "flex h-[32px] items-center border-b pr-3 font-[500] text-gray-400",
                      isSelected && "border-b-green2-400 text-green2-400",
                    )
                  }
                >
                  {t("Mới nhất")}
                </Tab>
                <Tab
                  id="TopSales"
                  className={({ isSelected }) =>
                    cn(
                      "flex h-[32px] items-center border-b pr-3 font-[500] text-gray-400",
                      isSelected && "border-b-green2-400 text-green2-400",
                    )
                  }
                >
                  {t("Bán chạy")}
                </Tab>
              </TabList>
              <div className="flex cursor-pointer items-center rounded-full bg-green2-500 p-2">
                <FilterIcon size={18} className={cn("mr-1 text-white opacity-50")} />
                <span className="text-white">{t("Lọc")}</span>
              </div>
            </div>

            <TabPanel id="Popular">
              <CategoriesGroup listItemCategory={listItemCategory} />
            </TabPanel>
            <TabPanel id="TopSales">
              <CategoriesGroup listItemCategory={listItemCategory} />
            </TabPanel>
            <TabPanel id="TopSales">
              <CategoriesGroup listItemCategory={listItemCategory} />
            </TabPanel>
          </Tabs>

          {totalRecords > 12 && (
            <div className="pb-6">
              <Button
                className="flex h-12 w-full items-center justify-center rounded font-[500] text-green2-400 ring-1 ring-green2-400"
                classNameHovered="bg-green2-50"
              >
                Xem thêm
              </Button>
            </div>
          )}

          <Drawer
            isDismissable={true}
            isOpen={false}
            onOpenChange={() => {}}
            className="h-[calc(100dvh-100px)] p-2"
          >
            <p className="text-xl font-medium text-green-500">{t("Bộ lọc tìm kiếm")}</p>
            <p className="mt-4 text-lg font-medium text-gray-600">{t("Địa điểm")}</p>
            <GridList
              aria-label="listItemMainPage"
              className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4"
              // renderEmptyState={() =>
              //   Array(4)
              //     .fill(null)
              //     .map((_, index) => (
              //       <ItemCard2Skeleton key={uid + "listItemCategory:loading" + index} />
              //     ))
              // }
              items={listItemCategory}
            ></GridList>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Page;
