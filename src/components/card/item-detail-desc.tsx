import { skipToken } from "@reduxjs/toolkit/query";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import React, { useId, useState } from "react";
import { ToggleButton } from "react-aria-components";
import { useMeasure } from "react-use";

import useTranslation from "@/hooks/use-translation";
import { categoryApi } from "@/redux/query/category-query";
import { itemApi } from "@/redux/query/item-query";
import { itemAttributeApi } from "@/redux/query/itemAttribute-query";
import { TItem } from "@/types/item-type";
import { cn } from "@/utils/utils";

import Image from "../shared/image";

type TItemDetailDescProps = TItem;

const ItemDetailDesc = ({ ...itemData }: TItemDetailDescProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const [isOpenDesc, setIsOpenDesc] = useState<boolean>(false);
  const [refMeasure, { height }] = useMeasure<HTMLDivElement>();

  const { data: getListCategoryFromChildrenRes } = categoryApi.useGetListCategoryFromChildrenQuery(
    itemData?.categoryId ? { id: itemData?.categoryId } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const listCategory = getListCategoryFromChildrenRes?.data || [];

  const { data: dataItemAttributesRes, isFetching: isItemAttributesFetching } =
    itemAttributeApi.useGetListQuery(
      !!itemData?.categoryId ? { categoryId: itemData.categoryId } : skipToken,
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const dataItemAttributes = dataItemAttributesRes?.data || [];

  if (!itemData) return <></>;

  return (
    <>
      <div className="mb-3 flex flex-col items-start">
        <div className="mb-1 flex text-base text-gray-500">Danh mục:</div>
        <div className="flex flex-wrap items-start gap-2">
          {listCategory.map((c, index) => (
            <div key={uid + "listCategory" + index} className="flex items-center rounded-full">
              <Link href={`/items/?businessType=${c.businessType}`} className="flex items-center">
                <div className="mr-1.5 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full shadow shadow-gray-100">
                  <Image
                    src={c.iconUrl}
                    alt={c.name}
                    className="h-full w-full object-cover"
                    classNameFallback="opacity-50"
                  />
                </div>
                <span className="text-[15px] text-gray-500 lg:no-underline lg:hover:text-green2-500 lg:hover:underline">
                  {c.name}
                </span>
              </Link>

              {index < listCategory.length - 1 && (
                <ChevronRightIcon
                  size={22}
                  style={{ margin: "0 -6px -2px 0px" }}
                  className="text-gray-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {!!itemData?.attributeList?.length && (
        <div className="mb-3 flex flex-col">
          <div className="mb-1 flex text-base text-gray-500">{t("Thuộc tính")}:</div>

          {(itemData.attributeList || [])?.map((item, index) => (
            <div key={uid + "attributeList" + index}>
              <div className="">{dataItemAttributes.find((a) => a.id === item?.id)?.name}</div>
              <div className="">{(item?.valueList || [])?.join(", ")}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-1 flex text-base text-gray-500">Mô tả:</div>
      <div className={cn("relative", isOpenDesc ? "" : "max-h-[200px] overflow-hidden")}>
        <div
          ref={refMeasure}
          className="pointer-events-none mb-2 select-none break-words text-base [&_*]:pointer-events-none [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: itemData?.description || "" }}
        ></div>
        {height > 200 && (
          <ToggleButton
            slot={null}
            className={({ isSelected }) =>
              cn(
                "absolute bottom-0 left-0 flex w-full items-center justify-center rounded bg-white py-0.5 text-base font-[500] text-green2-500",
                isSelected && "sticky bottom-[72px] bg-white/50 backdrop-blur",
              )
            }
            isSelected={isOpenDesc}
            onChange={setIsOpenDesc}
          >
            {({ isSelected }) =>
              isSelected ? (
                <>
                  <span>Thu gọn</span>
                  <ChevronUpIcon />
                </>
              ) : (
                <>
                  <span>Xem thêm</span>
                  <ChevronDownIcon />
                </>
              )
            }
          </ToggleButton>
        )}
      </div>
    </>
  );
};

export default ItemDetailDesc;
