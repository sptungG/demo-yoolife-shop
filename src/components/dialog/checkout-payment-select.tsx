import { CheckCircleIcon, CircleIcon, TruckIcon, XIcon } from "lucide-react";
import { useId } from "react";
import { Heading, Label, Radio, RadioGroup, Text } from "react-aria-components";

import { setCheckoutDeliveryProvider } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TCalculateTotalPriceRes, TEDeliveryProvider, TEPaymentMethods } from "@/types/item-type";
import { DELIVERY_PROVIDERS_LIST, VIETTELPAY_LOGO } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";
import { formatDate } from "@/utils/utils-date";

import Button from "../button/Button";
import { MomoSvg, VNPaySvg } from "../icons";
import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";
import NImage from "../shared/next-image";
import Drawer, { DrawerClose } from "./drawer";

type TPaymentSelectProps = {
  providerId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PAYMENT_METHODS_LIST = [
  {
    name: "Thanh toán tiền mặt",
    id: TEPaymentMethods.COD,
    isDisabled: false,
  },
  {
    name: "MOMO",
    id: TEPaymentMethods.MOMO,
    isDisabled: true,
  },
  {
    name: "VIETTELPAY",
    id: TEPaymentMethods.VIETTELPAY,
    isDisabled: true,
  },
  {
    name: "VNPAY",
    id: TEPaymentMethods.VNPAY,
    isDisabled: true,
  },
];

const PaymentSelect = ({ providerId, isOpen, onOpenChange }: TPaymentSelectProps) => {
  const uid = useId();
  const dispatch = useAppDispatch();

  const { paymentMethod } = useAppSelector((s) => s.checkout);
  const selectedPayment = PAYMENT_METHODS_LIST.find((e) => e.id === paymentMethod);

  const handleSelect = async (value: string) => {
    try {
      if (!value) throw new Error(" ");
      dispatch(setCheckoutDeliveryProvider(+value));
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
        <div className="mr-1.5 flex h-[20px] w-[20px] flex-col items-center justify-center rounded-full border border-green2-500 text-[14px] text-green2-500">
          ₫
        </div>
        <span className="line-clamp-1">Phương thức thanh toán</span>
      </Heading>
      <div className=""></div>
      <ScrollBar suppressScrollX className="min-h-0 flex-[1_1_auto]">
        <RadioGroup
          key={uid + "VOUCHER_DISCOUNT" + "RadioGroup"}
          slot={null}
          className="flex flex-col px-2 py-2"
          value={paymentMethod ? String(paymentMethod) : undefined}
          onChange={handleSelect}
        >
          <Label className="mb-2 text-base font-[500] leading-none text-gray-500">
            {"Yoolife Đảm bảo"}
          </Label>

          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS_LIST.map((item, index) => {
              return (
                <div
                  key={uid + String(item) + index}
                  className={cn(
                    "relative flex h-[64px] flex-nowrap border border-green2-200 bg-white shadow",
                    item.isDisabled && "border-gray-200 opacity-75",
                  )}
                >
                  <div
                    className={cn(
                      "absolute -bottom-[1px] -left-[1px] -top-[1px] w-1.5 bg-green2-500",
                      item.isDisabled && "bg-gray-300",
                    )}
                  ></div>

                  <div className="flex flex-col items-center justify-center pl-3">
                    {item.id === TEPaymentMethods.COD && (
                      <NImage
                        width={0}
                        height={0}
                        src="/assets/cod.png"
                        className="h-[50px] w-[50px] object-cover "
                      />
                    )}
                    {item.id === TEPaymentMethods.MOMO && (
                      <MomoSvg width={44} style={{ margin: "0 4px 0 2px" }} />
                    )}
                    {item.id === TEPaymentMethods.VIETTELPAY && (
                      <Image
                        width={50}
                        src={VIETTELPAY_LOGO}
                        alt="VIETTELPAY"
                        style={{ margin: "0 2px 0 -4px" }}
                      />
                    )}
                    {item.id === TEPaymentMethods.VNPAY && (
                      <VNPaySvg width={50} style={{ margin: "0 2px 0 -4px" }} />
                    )}
                  </div>

                  <div className="flex items-center py-1.5 pl-3 pr-2">
                    <span className="font-[500] text-gray-700">{item.name}</span>
                  </div>
                  <Radio
                    isDisabled={item.isDisabled}
                    id={String(item.id)}
                    value={String(item.id)}
                    className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2"
                  >
                    {({ isSelected, isDisabled }) =>
                      isSelected ? (
                        <CheckCircleIcon className="fill-green2-50 text-green2-400" />
                      ) : (
                        <CircleIcon
                          className={cn("text-gray-500", isDisabled && "fill-gray-200 opacity-60")}
                        />
                      )
                    }
                  </Radio>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </ScrollBar>

      {!!selectedPayment ? (
        <div className="shrink-0 border-t border-t-gray-100 px-2 py-2">
          <span className="text-gray-600">Đã chọn:</span>
          <span className="ml-1 text-base font-[500] text-green2-500">{selectedPayment.name}</span>
        </div>
      ) : (
        <div className="shrink-0 border-t border-t-gray-100 px-2 py-2">
          <span className="mr-1 text-[15px] text-gray-600">Chưa chọn đơn vị vận chuyển</span>
        </div>
      )}

      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-t-gray-100 px-2">
        <Button
          type="button"
          onPress={() => onOpenChange(false)}
          className={
            "relative ml-auto flex h-12 w-full shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 font-[600] text-white"
          }
        >
          Xác nhận
        </Button>
      </div>
    </Drawer>
  );
};

export default PaymentSelect;
