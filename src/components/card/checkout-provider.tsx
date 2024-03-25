import { skipToken } from "@reduxjs/toolkit/query";
import { ChevronRightIcon, ClipboardListIcon, StoreIcon, TruckIcon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useId, useState } from "react";
import { Button, Link } from "react-aria-components";
import { useEffectOnce } from "react-use";
import { toast } from "sonner";

import useCreateOrder from "@/hooks/use-create-order";
import { itemApi } from "@/redux/query/item-query";
import { resetCheckout } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TEDiscountType, TVoucher } from "@/types/item-type";
import { DELIVERY_PROVIDERS_LIST } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";

import DeliverySelect from "../dialog/checkout-delivery-select";
import PaymentSelect, { PAYMENT_METHODS_LIST } from "../dialog/checkout-payment-select";
import VoucherSelect from "../dialog/checkout-voucher-select";
import { VoucherCheckSvg } from "../icons";
import Image from "../shared/image";

type TCheckoutProviderProps = { providerId: number };

const CheckoutProvider = ({ providerId }: TCheckoutProviderProps) => {
  const uid = useId();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();

  const {
    toAddress,
    selectedItems,
    voucherProvider,
    voucherShipping,
    deliveryProvider,
    paymentMethod,
  } = useAppSelector((s) => s.checkout);

  const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
  const [isOpenDelivery, setIsOpenDelivery] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const checkoutTotalPrice =
    selectedItems.reduce((prev, curr) => prev + curr.itemModel.currentPrice * curr.quantity, 0) ||
    0;
  const savedCheckoutPrice = (voucher: TVoucher | null): Record<string, number> => ({
    [`${TEDiscountType.FIX_AMOUNT}`]: voucher?.discountAmount || 0,
    [`${TEDiscountType.DISCOUNT_PERCENTAGE}`]:
      (checkoutTotalPrice * (voucher?.percentage || 0)) / 100 < (voucher?.maxPrice || 0)
        ? (checkoutTotalPrice * (voucher?.percentage || 0)) / 100
        : voucher?.maxPrice || 0,
  });
  const totalSavedAmount =
    (savedCheckoutPrice(voucherProvider)?.[`${voucherProvider?.discountType}`] || 0) +
    (savedCheckoutPrice(voucherShipping)?.[`${voucherShipping?.discountType}`] || 0);

  const {
    data: calculateTotalPriceRes,
    isFetching: calculateTotalPriceFetching,
    error: calculateTotalPriceError,
  } = itemApi.useCalculateTotalPrice01Query(
    providerId && toAddress && !!selectedItems?.length
      ? {
          providerId,
          listVouchers: [voucherShipping?.id, voucherProvider?.id].filter((v) => !!v) as number[],
          orderItemList: selectedItems?.map((item) => ({
            id: item.itemModel.id,
            quantity: item.quantity,
          })),
          deliveryInfo: {
            toAddress: toAddress.detail,
            toProvinceName: toAddress.provinceName,
            toDistrictName: toAddress.districtName,
            toWardName: toAddress.wardName,
            toName: toAddress.name,
            toPhone: toAddress.phoneNumber,
          },
        }
      : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const calculateData = calculateTotalPriceRes?.data;
  const estimateResults = calculateData?.estimateResults || [];
  const selectedDeliveryProvider = DELIVERY_PROVIDERS_LIST.find((e) => e.id === deliveryProvider);
  const foundEstimateResult = estimateResults.find((e) => e.deliveryProvider === deliveryProvider);

  const selectedPayment = PAYMENT_METHODS_LIST.find((e) => e.id === paymentMethod);

  const { handleCreate, isLoading: createOrderLoading } = useCreateOrder({ providerId });

  useEffectOnce(() => {
    if (!!calculateTotalPriceError) {
      toast.error("Đã có lỗi xảy ra", { description: "Trở lại giỏ hàng" });
      dispatch(resetCheckout());
      replace("/cart");
    }
  });

  return (
    <>
      <div className="flex flex-col bg-white">
        {selectedItems.map((item, index) => {
          const isEqualProvider =
            index > 0 && item.providerId === selectedItems[index - 1]?.providerId;
          return (
            <div
              key={uid + index + String(item)}
              className={cn(
                "flex flex-col border-t border-gray-100 bg-white px-2",
                (index === 0 || !isEqualProvider) && "border-t-8",
              )}
            >
              {(index === 0 || !isEqualProvider) && (
                <div className="flex items-center border-b border-gray-100 py-2 text-gray-500">
                  <StoreIcon size={20} className="mr-2" />
                  <div className={"flex min-w-0 flex-[1_1_auto] items-center"}>
                    <span className="line-clamp-1 break-all text-base">{item.providerName}</span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2 py-2">
                <div className="h-[80px] w-[80px] shrink-0 rounded shadow-sm">
                  <Image
                    src={item.itemModel.imageUrl}
                    alt={item.itemName}
                    className="h-full w-full rounded object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-[1_1_auto] flex-col">
                  <div className="line-clamp-2 text-gray-600">{item.itemName}</div>
                  {!!item.itemModel.tierIndex.length && (
                    <div className={"mt-0.5 flex items-center self-start text-sm text-gray-500"}>
                      <span className="mr-1">Phân loại hàng:</span>
                      <span className="mr-1 font-[500] text-green2-400">{item.itemModel.name}</span>
                      {/* <ChevronDownIcon size={16} /> */}
                    </div>
                  )}
                  <div className="mt-auto flex justify-between gap-2">
                    <div className="flex text-sm text-gray-600">
                      <span>SL:</span>{" "}
                      <span className="ml-1 font-[500] text-green2-500">x{item.quantity}</span>
                    </div>
                    <div className="flex text-[15px] font-[500] text-green2-500">
                      <span>₫</span>
                      <span>{formatNumber(item.itemModel.currentPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Button
          isDisabled={createOrderLoading}
          className={
            "flex h-[65px] items-center border-t border-gray-100 px-2 py-2 text-left outline-none"
          }
          onPress={() => setIsOpenDelivery(true)}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <TruckIcon size={22} strokeWidth={1.5} className="mr-1.5 text-green2-500" />
              <span className="text-base text-gray-500">Vận chuyển</span>
            </div>
            <span
              className={cn(
                "text-[15px] text-gray-400",
                selectedDeliveryProvider?.name && "font-[400] text-green2-500 underline",
              )}
            >
              {`${selectedDeliveryProvider?.name || "Chưa chọn đơn vị vận chuyển"}`}
            </span>
          </div>
          <span className="ml-auto text-[15px] font-[500] text-green2-500">
            {foundEstimateResult ? `₫${formatNumber(foundEstimateResult.shippingFee)}` : "---"}
          </span>
          <ChevronRightIcon size={22} className="ml-1 text-gray-500" />
        </Button>
        <DeliverySelect
          providerId={+providerId}
          isOpen={isOpenDelivery}
          onOpenChange={setIsOpenDelivery}
          estimateResults={estimateResults}
        />

        <Button
          isDisabled={createOrderLoading}
          className={
            "flex h-[65px] items-center border-b-8 border-t border-gray-100 px-2 py-2 text-left outline-none"
          }
          onPress={() => setIsOpenVoucher(true)}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <VoucherCheckSvg width={22} className="mr-1.5 fill-green2-500 text-green2-500" />
              <span className="text-base text-gray-500">Voucher</span>
            </div>
          </div>
          <span className="ml-auto text-[15px] font-[500] text-green2-400">
            ₫{formatNumber(totalSavedAmount)}
          </span>
          <ChevronRightIcon size={22} className="ml-1 text-gray-500" />
        </Button>
        <VoucherSelect
          providerId={+providerId}
          isOpen={isOpenVoucher}
          onOpenChange={setIsOpenVoucher}
        />

        <Button
          isDisabled={createOrderLoading}
          className={
            "flex h-[65px] items-center border-b border-gray-100 px-2 py-2 text-left outline-none"
          }
          onPress={() => setIsOpenPayment(true)}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="mr-1.5 flex h-[20px] w-[20px] flex-col items-center justify-center rounded-full border border-green2-500 text-[14px] text-green2-500">
                ₫
              </div>
              <span className="text-base text-gray-500">Lựa chọn thanh toán</span>
            </div>
            <span
              className={cn(
                "text-[15px] text-gray-400",
                selectedPayment?.name && "font-[400] text-green2-500 underline",
              )}
            >
              {`${selectedPayment?.name || "Chưa chọn phương thức"}`}
            </span>
          </div>
          <span className="ml-auto text-[15px] font-[400] text-green2-400">Xem tất cả</span>
          <ChevronRightIcon size={22} className="ml-1 text-gray-500" />
        </Button>
        <PaymentSelect
          providerId={+providerId}
          isOpen={isOpenPayment}
          onOpenChange={setIsOpenPayment}
        />

        <div className="flex flex-col border-b-8 border-gray-100 px-2 pb-4 pt-2">
          <div className="mb-2 flex items-center gap-1">
            <ClipboardListIcon size={21} strokeWidth={1.8} className="text-orange-400" />
            <span className="text-gray-500">Chi tiết thanh toán</span>
          </div>

          <div className="mb-1 flex items-center justify-between">
            <span className="text-[14.2px] text-gray-500">Tạm tính:</span>
            {calculateData ? (
              <span className="text-[15px] font-[400] text-gray-500">
                ₫{formatNumber(calculateData.totalPriceOrigin)}
              </span>
            ) : (
              <span className="font-[500]">---</span>
            )}
          </div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[14.2px] text-gray-500">Phí vận chuyển:</span>
            {foundEstimateResult ? (
              <span className="text-[15px] font-[400] text-gray-500">
                ₫{formatNumber(foundEstimateResult.shippingFee)}
              </span>
            ) : (
              <span className="font-[500]">---</span>
            )}
          </div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[14.2px] text-gray-500">Tổng cộng Voucher Giảm giá:</span>
            {foundEstimateResult ? (
              <span className="text-[15px] font-[400] text-gray-500">
                - ₫
                {formatNumber(
                  foundEstimateResult.voucherDiscountFees.reduce((p, c) => p + c.value, 0),
                )}
              </span>
            ) : (
              <span className="font-[500]">---</span>
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between">
            <span className="text-base text-gray-600">Thành tiền:</span>
            {foundEstimateResult ? (
              <span className="font-[500] text-green2-500">
                ₫{formatNumber(foundEstimateResult.totalPrice)}
              </span>
            ) : (
              <span className="font-[500]">---</span>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 z-[100] mt-auto flex h-16 shrink-0 items-center justify-between gap-2 border-t border-gray-100 bg-white/90 px-2 backdrop-blur-sm">
        <div className="flex shrink-0 flex-col items-start justify-center">
          <span className="text-sm text-gray-500">Thành tiền:</span>
          {foundEstimateResult ? (
            <span className="font-[500] text-green2-500">
              ₫{formatNumber(foundEstimateResult.totalPrice)}
            </span>
          ) : (
            <span className="font-[500]">---</span>
          )}
        </div>
        <Button
          isDisabled={createOrderLoading || !selectedItems?.length}
          type="button"
          className={
            "relative ml-auto flex h-11 min-w-0 flex-[1_1_auto] shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-1 pr-2.5 text-white"
          }
          onPress={() => handleCreate()}
        >
          <span className="ml-2 whitespace-nowrap text-left font-[600]">Đặt hàng</span>
        </Button>
      </div>
    </>
  );
};

export const CheckoutProviderEmpty = () => {
  return (
    <>
      <div className="flex h-16 flex-col bg-white"></div>
      <div className="sticky bottom-0 left-0 z-[100] mt-auto flex h-16 shrink-0 items-center justify-between gap-2 border-t border-gray-100 bg-white/90 px-2 backdrop-blur-sm">
        <Link>Trở lại giỏ hàng</Link>
      </div>
    </>
  );
};

export default CheckoutProvider;
