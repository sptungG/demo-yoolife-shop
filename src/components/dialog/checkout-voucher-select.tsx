import { skipToken } from "@reduxjs/toolkit/query";
import { CheckCircleIcon, CircleIcon, StoreIcon, XIcon } from "lucide-react";
import { groupBy } from "rambda";
import { useId, useMemo, useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Heading,
  Label,
  Button as RAButton,
  Radio,
  RadioGroup,
  Text,
} from "react-aria-components";
import { toast } from "sonner";

import { itemApi } from "@/redux/query/item-query";
import { userApi } from "@/redux/query/user-query";
import {
  setCheckoutVoucherProvider,
  setCheckoutVoucherShipping,
} from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TEDiscountType, TEVoucherStatus, TEVoucherType, TVoucher } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";

import Button from "../button/Button";
import VoucherCard, { RightActions01 } from "../card/voucher-card";
import { EmptyVoucherSvg } from "../icons";
import ScrollBar from "../scrollbar/scroll-bar";
import Drawer, { DrawerClose } from "./drawer";

type TVoucherSelectProps = {
  providerId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const VoucherSelect = ({ providerId, isOpen, onOpenChange }: TVoucherSelectProps) => {
  const uid = useId();
  const dispatch = useAppDispatch();

  const {
    selectedItems: checkoutSelectedItems,
    voucherShipping,
    voucherProvider,
  } = useAppSelector((s) => s.checkout);
  const checkoutTotalPrice =
    checkoutSelectedItems.reduce(
      (curr, prev) => curr + prev.itemModel.currentPrice * prev.quantity,
      0,
    ) || 0;
  const { data: getByIdProviderRes } = userApi.useGetByIdProviderQuery(
    providerId ? { id: providerId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const providerData = getByIdProviderRes?.data;
  const { data: getListVoucherRes, isFetching: getListVoucherFetching } =
    itemApi.useGetListVoucherQuery(
      providerId
        ? { providerId, scope: 1, maxResultCount: 10, channelDisplay: 1, formId: 32, sortBy: 2 }
        : skipToken,
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const listVoucher = getListVoucherRes?.data || [];
  const mappedListVoucher = useMemo(
    () => groupBy((v) => String(v.type), getListVoucherRes?.data || []),
    [getListVoucherRes?.data],
  );
  const savedCheckoutPrice = (voucher: TVoucher | null): Record<string, number> => ({
    [`${TEDiscountType.FIX_AMOUNT}`]: voucher?.discountAmount || 0,
    [`${TEDiscountType.DISCOUNT_PERCENTAGE}`]:
      (checkoutTotalPrice * (voucher?.percentage || 0)) / 100 < (voucher?.maxPrice || 0)
        ? (checkoutTotalPrice * (voucher?.percentage || 0)) / 100
        : voucher?.maxPrice || 0,
  });

  const totalSavedPrice =
    (savedCheckoutPrice(voucherProvider)?.[`${voucherProvider?.discountType}`] || 0) +
    (savedCheckoutPrice(voucherShipping)?.[`${voucherShipping?.discountType}`] || 0);

  const [receiveVoucherMutate, { isLoading: receiveVoucherLoading }] =
    itemApi.useReceiveVoucherMutation();
  const handleReceiveVoucher = async (voucher?: TVoucher) => {
    try {
      if (!voucher) throw new Error(" ");
      const receiveRes = await receiveVoucherMutate({ id: voucher.id }).unwrap();
      if (!receiveRes.data) throw new Error(" ");
    } catch (error) {
    } finally {
    }
  };

  const [checkAvailableVoucherMutate, { isLoading: checkAvailableVoucherLoading }] =
    itemApi.useCheckAvailableVoucherMutation();
  const handleSelectVoucher = async (type: TEVoucherType, voucher?: TVoucher) => {
    try {
      if (!voucher) {
        if (type === TEVoucherType.VOUCHER_DISCOUNT) dispatch(setCheckoutVoucherProvider(null));
        if (type === TEVoucherType.VOUCHER_SHIPPING) dispatch(setCheckoutVoucherShipping(null));
        throw new Error(" ");
      }
      const checkRes = await checkAvailableVoucherMutate({
        items: [voucher.id],
      }).unwrap();
      if (!checkRes.data?.[0]) throw new Error(" ");
      if (type === TEVoucherType.VOUCHER_DISCOUNT) dispatch(setCheckoutVoucherProvider(voucher));
      else if (type === TEVoucherType.VOUCHER_SHIPPING)
        dispatch(setCheckoutVoucherShipping(voucher));
      toast.success(`Đã chọn voucher`);
    } catch (error) {
    } finally {
    }
  };

  return (
    <Drawer
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-t-lg"
    >
      <DrawerClose
        onPress={() => {
          onOpenChange(false);
        }}
        className={"absolute -top-2 right-2"}
      >
        <XIcon />
      </DrawerClose>
      <Heading
        slot="title"
        className="flex h-9 items-center whitespace-nowrap border-b border-gray-100 px-2 py-1 text-lg text-gray-600"
      >
        <StoreIcon className="mr-1 text-gray-500" size={20} />
        <span className="line-clamp-1">{providerData?.name}</span>
        <span className="ml-1 shrink-0 text-green2-500">Voucher</span>
      </Heading>
      <div className=""></div>
      {!!listVoucher.length ? (
        <ScrollBar suppressScrollX className="min-h-0 flex-[1_1_auto]">
          <CheckboxGroup
            key={uid + "VOUCHER_DISCOUNT" + "CheckboxGroup"}
            slot={null}
            className="flex flex-col px-2 py-2"
            value={!!voucherProvider?.id ? [String(voucherProvider.id)] : []}
            onChange={(v) =>
              handleSelectVoucher(
                TEVoucherType.VOUCHER_DISCOUNT,
                listVoucher.find(({ id }) => id === +v.slice(-1)),
              )
            }
          >
            <Label className="mb-0 text-base font-[500] leading-none">{"Mã giảm giá"}</Label>
            <Text slot="description" className="mb-1 text-sm text-gray-500">
              {"Có thể chọn 1 Voucher"}
            </Text>
            <div className="flex flex-col gap-2">
              {mappedListVoucher[TEVoucherType.VOUCHER_DISCOUNT].map((item, index) => (
                <VoucherCard
                  key={uid + String(item) + index}
                  {...item}
                  right={
                    [TEVoucherStatus.UPCOMING, TEVoucherStatus.ACTIVATED].includes(item.status) && (
                      <RightActions01
                        {...item}
                        checkboxProps={{
                          isDisabled:
                            [TEVoucherStatus.UPCOMING].includes(item.status) ||
                            checkoutTotalPrice < item.minBasketPrice,
                        }}
                        buttonProps={{
                          onPress: () => handleReceiveVoucher(item),
                        }}
                      />
                    )
                  }
                />
              ))}
            </div>
          </CheckboxGroup>

          <CheckboxGroup
            key={uid + "VOUCHER_SHIPPING" + "CheckboxGroup"}
            slot={null}
            className="flex flex-col px-2 py-2"
            value={!!voucherShipping?.id ? [String(voucherShipping.id)] : []}
            onChange={(v) =>
              handleSelectVoucher(
                TEVoucherType.VOUCHER_SHIPPING,
                listVoucher.find(({ id }) => id === +v.slice(-1)),
              )
            }
          >
            <Label className="mb-0 text-base font-[500] leading-none">
              {"Ưu đãi phí vận chuyển"}
            </Label>
            <Text slot="description" className="mb-1 text-sm text-gray-500">
              {"Có thể chọn 1 Voucher"}
            </Text>
            <div className="flex flex-col gap-2">
              {mappedListVoucher[TEVoucherType.VOUCHER_SHIPPING]?.map((item, index) => (
                <VoucherCard
                  key={uid + String(item) + index}
                  {...item}
                  right={
                    [TEVoucherStatus.UPCOMING, TEVoucherStatus.ACTIVATED].includes(item.status) && (
                      <RightActions01
                        {...item}
                        checkboxProps={{
                          isDisabled:
                            [TEVoucherStatus.UPCOMING].includes(item.status) ||
                            checkoutTotalPrice < item.minBasketPrice,
                        }}
                        buttonProps={{
                          onPress: () => handleReceiveVoucher(item),
                        }}
                      />
                    )
                  }
                />
              ))}
            </div>
          </CheckboxGroup>
        </ScrollBar>
      ) : (
        <div className="flex min-h-[calc(50dvh-56px)] w-full flex-[1_1_auto] flex-col items-center justify-center">
          <EmptyVoucherSvg width={140} height={140} />
          <div className="font-[500] text-gray-600">Chưa có mã giảm giá nào của Shop</div>
          {/* <div className="">Nhập mã giảm giá có thể sử dụng vào thanh bên trên</div> */}
        </div>
      )}

      {!!listVoucher.length && (
        <div className="shrink-0 border-t border-t-gray-100 px-2 py-2">
          <span className="mr-1 text-[15px] text-gray-600">
            {!!totalSavedPrice ? "Voucher đã được chọn." : "Chưa có voucher nào được chọn"}
          </span>
          {!!totalSavedPrice && (
            <span className="mr-1 text-[15px] font-[400] text-green2-500">Tiết kiệm</span>
          )}
          {!!totalSavedPrice && (
            <span className="text-[15px] font-[500] text-green2-500">
              {formatNumber(totalSavedPrice)}₫
            </span>
          )}
        </div>
      )}

      {!!listVoucher.length && (
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-t-gray-100 px-2">
          <Button
            isLoading={
              receiveVoucherLoading || checkAvailableVoucherLoading || getListVoucherFetching
            }
            isDisabled={checkAvailableVoucherLoading}
            type="button"
            onPress={() => onOpenChange(false)}
            className={
              "relative ml-auto flex h-12 w-full shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 font-[600] text-white"
            }
          >
            Xác nhận
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default VoucherSelect;
