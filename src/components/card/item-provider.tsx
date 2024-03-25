import { skipToken } from "@reduxjs/toolkit/query";
import {
  CheckCircleIcon,
  ChevronLeftCircle,
  ChevronRightCircle,
  ChevronRightCircleIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import React, { useId, useState } from "react";
import { Button, Link } from "react-aria-components";
import { toast } from "sonner";

import useGetAddress from "@/hooks/use-get-address";
import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { userApi } from "@/redux/query/user-query";
import { TEDiscountType, TEVoucherScope, TItem, TVoucher } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";
import { formatDate } from "@/utils/utils-date";

import DrawerVoucherSelect from "../dialog/drawer-voucher-select";
import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";
import { SmVoucherCard } from "./voucher-card";

type TItemProviderProps = TItem & {};

const ItemProvider = ({ providerId }: TItemProviderProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
  const { data: getByIdProviderRes } = userApi.useGetByIdProviderQuery(
    providerId ? { id: providerId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const providerData = getByIdProviderRes?.data;

  const { data: getListVoucherRes } = itemApi.useGetListVoucherQuery(
    providerId
      ? { providerId, scope: 1, maxResultCount: 2, channelDisplay: 1, formId: 32, sortBy: 2 }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const listVoucher = getListVoucherRes?.data || [];

  const { find, provinces, districts } = useGetAddress(
    providerData
      ? {
          provinceCode: providerData.provinceId,
          districtCode: providerData.districtId,
          wardCode: providerData.wardId,
        }
      : {},
  );

  const [receiveVoucherMutate, { isLoading: receiveVoucherLoading }] =
    itemApi.useReceiveVoucherMutation();
  const handleReceiveVoucher = async (voucher?: TVoucher) => {
    try {
      if (!voucher) throw new Error(" ");
      const receiveRes = await receiveVoucherMutate({ id: voucher.id }).unwrap();
      if (!receiveRes.data) throw new Error(" ");
      toast.success("Lưu voucher thành công");
    } catch (error) {
      toast.success("Đã có lỗi xảy ra khi lưu voucher");
    } finally {
    }
  };

  if (!providerData) return <></>;

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex">
        <div className="relative mr-2 h-[60px] w-[60px] shrink-0 rounded-full border">
          <Image
            src={providerData.imageUrls?.[0]}
            alt={providerData.name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="line-clamp-1 font-[500] text-gray-500">{providerData.name}</div>
          <div className="flex items-center gap-1 text-sm font-[300] text-gray-400">
            <MapPinIcon size={13} />
            <span>{find(providerData.districtId, districts)?.name},</span>
            <span>{find(providerData.provinceId, provinces)?.name}</span>
          </div>
        </div>

        <div className="ml-auto flex-shrink-0 pt-1">
          <Link className={"rounded border border-green2-300 px-2 py-1 text-sm text-green2-500"}>
            Xem cửa hàng
          </Link>
        </div>
      </div>

      <div className="mb-1.5 flex items-center gap-2">
        <div className="flex items-center gap-0.5 text-sm">
          <span className={cn(providerData?.ratePoint ? "text-orange-300" : "text-gray-400")}>
            {!!providerData.ratePoint ? providerData.ratePoint.toFixed(2) : "0"}
          </span>
          <StarIcon
            size={12}
            className={cn(
              !!providerData?.ratePoint
                ? "fill-orange-300 text-orange-300"
                : "fill-gray-50 text-gray-300",
            )}
          />
          <span className="text-gray-400">đánh giá</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-green2-500">100%</span>
          <span className="text-gray-400">phản hồi chat</span>
        </div>
      </div>

      {!!listVoucher.length && (
        <ScrollBar suppressScrollY className="max-w-full pl-[2px]">
          <div className="flex flex-nowrap gap-2 pb-2">
            {listVoucher.map((v, index) => (
              <SmVoucherCard
                key={String(v) + index}
                {...v}
                right={
                  !!v.isReceived ? (
                    <div className="text-green2-600">
                      <CheckCircleIcon size={18} className="fill-green2-100" />
                      <span className="whitespace-nowrap text-[11px]">Đã lưu</span>
                    </div>
                  ) : (
                    <Button
                      isDisabled={receiveVoucherLoading}
                      className={
                        "flex h-6 items-center whitespace-nowrap rounded bg-green2-500 px-3 text-sm text-white"
                      }
                      onPress={() => handleReceiveVoucher(v)}
                    >
                      Lưu
                    </Button>
                  )
                }
              />
            ))}

            <Button
              className={
                "ml-auto flex flex-col items-center justify-center pr-1 text-sm text-green2-500 outline-none"
              }
              onPress={() => setIsOpenVoucher(true)}
            >
              <ChevronRightCircleIcon size={22} strokeWidth={1.5} />
              <span className="whitespace-nowrap">Xem thêm</span>
            </Button>
            <DrawerVoucherSelect
              providerId={+providerId}
              isOpen={isOpenVoucher}
              onOpenChange={setIsOpenVoucher}
            />
          </div>
        </ScrollBar>
      )}
      {!!listVoucher.length && (
        <div className="flex items-center text-gray-500">
          <span className="mr-0.5 text-base leading-none">*</span>
          <span className="text-xs">{t("Áp dụng cho tất cả sản phẩm trong Shop")}</span>
        </div>
      )}
    </div>
  );
};

export default ItemProvider;
