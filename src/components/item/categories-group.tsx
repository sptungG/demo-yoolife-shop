import React, { useId, useState } from "react";
import { GridList } from "react-aria-components";

import { TItem } from "@/types/item-type";

import ItemCard2, { ItemCard2Skeleton } from "./item-card-2";

type TCategoriesGroup = {
  listItemCategory: TItem[];
};

const CategoriesGroup = ({ listItemCategory }: TCategoriesGroup) => {
  const uid = useId();

  const [selectedItemId, setSelectedItemId] = useState<number>();

  return (
    <>
      <GridList
        aria-label="listItemMainPage"
        className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4"
        renderEmptyState={() =>
          Array(4)
            .fill(null)
            .map((_, index) => <ItemCard2Skeleton key={uid + "listItemCategory:loading" + index} />)
        }
        items={listItemCategory}
      >
        {(item: TItem) => (
          <ItemCard2
            key={uid + "listItemMainPage" + item.id}
            onClickCartBtn={(item) => setSelectedItemId(item)}
            {...item}
            isCategory={true}
          />
        )}
      </GridList>
    </>
  );
};

export default CategoriesGroup;
