import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { uniq } from "rambda";
import { useId, useState } from "react";
import { Button } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { useMedia } from "react-use";

import Footer from "@/components/footer/footer";
import { HeaderLg } from "@/components/header/header";
import ItemCard2, { ItemCard2Skeleton } from "@/components/item/item-card-2";
import ItemCardVoucher from "@/components/item/item-card-voucher";
import ListItemCategory from "@/components/item/list-item-category";
import ListItemFlashSale from "@/components/item/list-item-flashsale";
import ListItemTopSearch from "@/components/item/list-item-top-search";
import BottomNav from "@/components/layout/bottom-nav";
import SEO from "@/components/shared/seo";
import { itemApi } from "@/redux/query/item-query";
import { TEVoucherType, TItems1Filter } from "@/types/item-type";
import { cn, getRandomInt } from "@/utils/utils";

type TPageProps = {};

const maxResultCount = 10;
const listBusinessType = [212, 221, 222];

const Page = ({}: TPageProps) => {
  const uid = useId();
  const { t } = useTranslation();

  const mediaAbove1024 = useMedia("(min-width: 1024px)", true);
  const [selectedBusinessType, setSelectedBusinessType] = useQueryState(
    "businessTypes",
    parseAsArrayOf(parseAsInteger).withDefault(listBusinessType),
  );

  const [filterReq, setFilterReq] = useState<Partial<TItems1Filter>>({
    maxResultCount,
    formId: 30,
    skipCount: 0,
  });

  const { data: getListItemShoppingRes, isFetching: getListItemShoppingLoading } =
    itemApi.useGetListItemsByUser2Query(
      { ...filterReq, listBusinessType: selectedBusinessType },
      { refetchOnMountOrArgChange: true },
    );
  const { data: getListItemFarmRes } = itemApi.useGetListItemsRandomQuery(
    { maxResultCount: 2, itemServiceType: 3 },
    { refetchOnMountOrArgChange: true },
  );
  const listItemShopping = getListItemShoppingRes?.data || [];
  const totalRecords = getListItemShoppingRes?.totalRecords || 0;

  const mappedItemProviders = uniq(listItemShopping.map((i) => i.providerId));
  const { data: listVoucherProvidersRes } = itemApi.useGetListVoucher2Query({
    providerIds: mappedItemProviders,
  });

  return (
    <div className="flex min-h-[100dvh] flex-col pb-16">
      <SEO statusbarColor="#e7efd8" />

      <HeaderLg
        selectedBusinessType={selectedBusinessType}
        onSelectBusinessType={(v) => {
          setSelectedBusinessType(v);
          setFilterReq((prev) => ({ ...prev, skipCount: 0 }));
        }}
      />

      <BottomNav />

      <div className="relative">
        <div
          className={cn(
            "fixed -top-16 left-0 -z-10 h-[50dvh] w-full bg-gradient-to-b from-green2-100",
          )}
        ></div>

        <ListItemFlashSale
          className="mx-auto max-w-[1200px] bg-white lg:bg-transparent lg:py-6"
          businessType={selectedBusinessType}
        />
        <ListItemTopSearch
          className="mx-auto max-w-[1200px] bg-white lg:bg-transparent lg:pb-6"
          businessType={selectedBusinessType}
        />

        <ListItemCategory
          key={String(selectedBusinessType)}
          businessType={selectedBusinessType}
          className="mx-auto mb-0 flex max-w-[1200px] flex-col bg-white lg:bg-transparent"
        />

        <div className="z-10 mx-auto max-w-[1200px] bg-white px-2 lg:bg-transparent lg:px-0">
          <div className="mb-2 flex items-center border-b border-b-green2-400">
            <h2 className="logo-text-gradient-green px-0 pr-2 pt-2.5 text-lg font-[500] uppercase text-green2-500 lg:text-2xl">
              Gợi ý hôm nay
            </h2>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
            {getListItemShoppingLoading
              ? Array(4).fill(<ItemCard2Skeleton />)
              : !!listItemShopping.length
                ? listItemShopping.map((item, index) => {
                    const foundVouchers =
                      listVoucherProvidersRes?.[item.providerId]?.filter(
                        (v) => v.type === TEVoucherType.VOUCHER_DISCOUNT,
                      ) || [];
                    const foundVoucher2 = foundVouchers[getRandomInt(0, foundVouchers.length - 1)];
                    const foundVoucherCount =
                      (foundVoucher2?.minBasketPrice || 0) > item.minPrice
                        ? Math.ceil((foundVoucher2?.minBasketPrice || 0) / item.minPrice)
                        : 0;

                    return (
                      <ItemCard2
                        key={
                          uid + "listItemMainPage" + String(item) + String(foundVoucher2) + index
                        }
                        {...item}
                        vouchersProvider={
                          !!foundVoucher2 ? (
                            <div className="mt-auto flex flex-nowrap items-start gap-1">
                              <ItemCardVoucher {...foundVoucher2} />
                              {foundVoucherCount > 1 && (
                                <div className="line-clamp-1 flex items-center whitespace-nowrap break-all rounded border border-green2-500 px-1 py-[2px] text-[11px] leading-[1.1] text-green2-500">
                                  Mua <span className="mx-0.5 font-[600]">{foundVoucherCount}</span>{" "}
                                  giảm giá
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="mt-auto"></div>
                          )
                        }
                      />
                    );
                  })
                : Array(4).fill(<ItemCard2Skeleton />)}
          </div>
          <div className="pb-6">
            <Button
              className={({ isHovered, isDisabled }) =>
                cn(
                  "flex h-12 w-full items-center justify-center rounded font-[500] text-green2-400 ring-1 ring-green2-400",
                  isDisabled && "text-gray-400 ring-gray-100",
                  isHovered && "bg-green2-50",
                )
              }
              onPress={() => {
                setFilterReq((prev) => ({
                  ...prev,
                  skipCount: (prev?.skipCount || 0) + maxResultCount,
                }));
              }}
              isDisabled={listItemShopping.length >= totalRecords}
            >
              {listItemShopping.length < totalRecords ? "Xem thêm" : "Đã xem hết rồi"}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
