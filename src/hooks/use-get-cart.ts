import { sortBy } from "rambda";
import { useMemo } from "react";

import { itemApi } from "@/redux/query/item-query";
import { TCart } from "@/types/item-type";

type TuseGetCartProps = {};

function useGetCart() {
  const cartRes = itemApi.useGetCartQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 60000 * 2 },
  );
  const mappedCartItems = useMemo<TCart[]>(
    () => sortBy((f) => String(f.providerId), cartRes?.currentData?.data || []),
    [cartRes?.currentData],
  );

  return {
    ...cartRes,
    mappedCartItems,
    totalQuantity: cartRes.data?.data.reduce((curr, prev) => curr + (prev.quantity || 0), 0),
  };
}

export default useGetCart;
