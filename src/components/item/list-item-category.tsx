import { skipToken } from "@reduxjs/toolkit/query";
import { ChevronDown, GalleryHorizontalEndIcon, ListTreeIcon, Share2Icon } from "lucide-react";
import React, { useId, useState } from "react";
import { Button, Link, Radio, RadioGroup } from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import useTreeData from "@/hooks/use-tree-data";
import { categoryApi } from "@/redux/query/category-query";
import { LIST_BUSINESS_TYPE2 } from "@/utils/constant-category";
import { cn, vietnameseSlug } from "@/utils/utils";

import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";

type TListItemCategoryProps = { businessType: number[]; className?: string };

const ListItemCategory = ({ businessType, className }: TListItemCategoryProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const [selectedBusinessType, setSelectedBusinessType] = useState<number>(businessType?.[0]);
  const { data: getAllCategoriesRes } = categoryApi.useGetAllCategoriesQuery(
    selectedBusinessType
      ? {
          businessType: selectedBusinessType || businessType?.[0],
          maxResultCount: 1000,
        }
      : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  // const selectedBusinessType = LIST_BUSINESS_TYPE2.filter((b) =>  businessType?.includes(b.businessType));
  const nestedListCategory = useTreeData(getAllCategoriesRes?.data || [], {
    id: "id",
    pId: "parentId",
  });
  return (
    <div className={className}>
      <div className="flex items-center justify-start overflow-hidden px-2 lg:px-0">
        <h2 className="whitespace-nowrap border-b border-b-green2-400 pr-2 text-lg font-[500] uppercase text-green2-500 lg:text-2xl">
          {t("Danh mục")}
        </h2>

        <ScrollBar suppressScrollY className="max-w-full py-2">
          <RadioGroup
            key={uid + String(selectedBusinessType)}
            className="flex flex-nowrap"
            onChange={(v) => setSelectedBusinessType(+v)}
            value={String(selectedBusinessType)}
          >
            {LIST_BUSINESS_TYPE2.filter((b) => businessType?.includes(b.businessType)).map(
              (item, index) => (
                <Radio
                  value={String(item.businessType)}
                  className="ml-4 flex shrink-0 cursor-pointer items-center gap-1"
                  key={uid + String(item?.businessType) + index}
                >
                  {({ isSelected }) => (
                    <>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green2-100">
                        <item.Icon className="h-5 w-5 shrink-0" />
                      </div>
                      <span
                        className={cn(
                          "whitespace-nowrap",
                          isSelected ? "text-green2-600 underline" : "text-green2-500",
                        )}
                      >
                        {item.title}
                      </span>
                    </>
                  )}
                </Radio>
              ),
            )}
          </RadioGroup>
        </ScrollBar>
      </div>

      <ScrollBar suppressScrollY className="max-w-full">
        <div
          className={cn(
            "mb-2 grid grid-flow-col grid-rows-1 justify-start gap-2 px-2 lg:ml-0 lg:px-0",
            nestedListCategory.length > 8 && "grid-rows-2 sm:grid-rows-1",
          )}
        >
          {nestedListCategory.map((item, index) => (
            <div
              key={uid + item.id + index}
              className="group/child flex h-full w-[64px] flex-col items-center justify-center pt-2 lg:w-[90px]"
            >
              <div className="flex w-full items-end justify-center">
                <div className="relative z-0 flex h-12 w-12 items-center justify-center rounded bg-gray-200 text-sm text-gray-500 backdrop-blur-md group-hover/child:bg-gray-100 group-hover/child:shadow-md group-hover/child:shadow-green2-100 lg:h-[70px] lg:w-[70px]">
                  <Image
                    src={item?.iconUrl}
                    alt={vietnameseSlug(String(item?.name))}
                    classNameWrapper="h-full w-full"
                    className="z-0 h-full w-full shrink-0 rounded object-cover"
                    classNameFallback="opacity-90"
                  />
                  {!!item.children?.length && (
                    <div className="absolute -bottom-1 -right-2 z-[1] flex -space-x-1.5 rtl:space-x-reverse">
                      {/* {item.children
                        ?.slice(0, 2)
                        ?.map((c, cindex) => (
                          <Image
                            key={uid + "children" + cindex}
                            className="h-5 w-5 shrink-0 rounded-full border border-white bg-gray-200 object-cover dark:border-gray-800"
                            src={c?.iconUrl}
                            alt={String(c?.name)}
                          />
                        ))} */}
                      {!!item.children.length && (
                        <Button className="flex h-5 min-w-5 shrink-0 items-center justify-between rounded-full border border-white bg-green2-700 font-medium text-white hover:bg-green2-600 dark:border-green2-800">
                          <Share2Icon size={12} className="ml-1 fill-white text-white" />
                          <span className="ml-1 mr-1.5 text-[11px]">{item.children?.length}</span>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Link
                href={`/items/${item.id}`}
                target="_blank"
                className="mt-1.5 min-h-[32px] max-w-[100px] overflow-hidden text-center"
              >
                <span className="line-clamp-2 break-words text-xs leading-[1.1] text-gray-500 group-hover/child:font-[500] group-hover/child:text-green2-500 group-hover/child:underline">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  );
};

export default ListItemCategory;
