import React, { useId, useState } from "react";
import { GridList } from "react-aria-components";

import ItemCard2, { ItemCard2Skeleton } from "@/components/item/item-card-2";
import Layout01 from "@/components/layout/Layout01";
import { itemApi } from "@/redux/query/item-query";
import { FormIdItem, OrderByItem } from "@/types/item-type";

const Page = () => {
  const uid = useId();

  const { data: topSearchListRes } = itemApi.useGetListItemsByUserQuery(
    {
      skipCount: 0,
      maxResultCount: 10,
      formId: FormIdItem.ALL,
      orderBy: OrderByItem.Popular,
      sortBy: 2,
    },
    { refetchOnFocus: false },
  );

  const topSearchShopping = topSearchListRes?.data || [];

  const [selectedItemId, setSelectedItemId] = useState<number>();

  return (
    <Layout01>
      <div className="relative mb-6 px-2">
        <div className="mx-auto mb-6 w-full max-w-[1200px] rounded-b-3xl bg-white py-6">
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
            items={topSearchShopping}
          >
            {(item) => (
              <ItemCard2
                key={uid + "listItemMainPage" + item.id}
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
