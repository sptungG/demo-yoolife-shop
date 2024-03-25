import { CheckCircleIcon, CircleIcon, TruckIcon, XIcon } from "lucide-react";
import { useId } from "react";
import { Heading, Label, Radio, RadioGroup, Text } from "react-aria-components";

import { setCheckoutDeliveryProvider } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TCalculateTotalPriceRes, TEDeliveryProvider } from "@/types/item-type";
import { DELIVERY_PROVIDERS_LIST } from "@/utils/constant";
import { cn, formatNumber } from "@/utils/utils";
import { formatDate } from "@/utils/utils-date";

import Button from "../button/Button";
import ScrollBar from "../scrollbar/scroll-bar";
import NImage from "../shared/next-image";
import Drawer, { DrawerClose } from "./drawer";

type TDeliverySelectProps = {
  providerId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  estimateResults?: TCalculateTotalPriceRes["estimateResults"];
};

const DeliverySelect = ({
  providerId,
  estimateResults = [],
  isOpen,
  onOpenChange,
}: TDeliverySelectProps) => {
  const uid = useId();
  const dispatch = useAppDispatch();

  const { deliveryProvider } = useAppSelector((s) => s.checkout);
  const selectedDeliveryProvider = DELIVERY_PROVIDERS_LIST.find((e) => e.id === deliveryProvider);

  const foundEstimateResult = (id?: number) =>
    estimateResults.find((e) => e.deliveryProvider === id);

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
        <TruckIcon className="mr-1 text-gray-500" size={20} />
        <span className="line-clamp-1">Đơn vị vận chuyển</span>
      </Heading>
      <div className=""></div>
      <ScrollBar suppressScrollX className="min-h-0 flex-[1_1_auto]">
        <RadioGroup
          key={uid + "VOUCHER_DISCOUNT" + "RadioGroup"}
          slot={null}
          className="flex flex-col px-2 py-2"
          value={deliveryProvider ? String(deliveryProvider) : undefined}
          onChange={handleSelect}
        >
          <Label className="mb-0 text-base font-[500] leading-none">{"Kênh vận chuyển"}</Label>
          <Text slot="description" className="mb-1 text-sm text-gray-500">
            {"Cho phép theo dõi đơn hàng tên ứng dụng Yoolife"}
          </Text>
          <div className="flex flex-col gap-2">
            {DELIVERY_PROVIDERS_LIST.map((item, index) => {
              const foundRes = foundEstimateResult(item.id);
              return (
                <div
                  key={uid + String(item) + index}
                  className={cn(
                    "relative flex h-[76px] flex-nowrap border border-green2-200 bg-white shadow",
                    item.isDisabled && "border-gray-200 opacity-75",
                    !foundRes && "hidden",
                  )}
                >
                  <div
                    className={cn(
                      "absolute -bottom-[1px] -left-[1px] -top-[1px] w-1.5 bg-green2-500",
                      item.isDisabled && "bg-gray-300",
                    )}
                  ></div>

                  <div className="flex flex-col py-1.5 pl-3 pr-2">
                    <div className="flex items-center gap-2">
                      <NImage
                        width={0}
                        height={0}
                        className={cn(
                          "object-cover",
                          item.id === TEDeliveryProvider.GiaoHangNhanh &&
                            "-mr-[1px] ml-[2px] h-[22px] w-[22px]",
                          item.id === TEDeliveryProvider.GiaoHangTietKiem &&
                            "-ml-[2px] -mr-[2px] h-[28px] w-[28px]",
                          item.id === TEDeliveryProvider.Lalamove && "-mr-[2px] h-[26px] w-[26px]",
                          item.id === TEDeliveryProvider.Self &&
                            "-mr-[2px] -mt-[3px] h-[26px] w-[26px]",
                        )}
                        src={item.imageUrl}
                        quality={100}
                      />
                      <span className="w-[144px] font-[500] text-gray-700">{item.name}</span>
                      <span className="-mt-0.5 text-gray-300">|</span>
                      <span className="font-[500] text-green2-500">
                        {foundRes ? `${formatNumber(foundRes.shippingFee)}₫` : "---"}
                      </span>
                    </div>

                    <div className="mt-auto text-[15px] text-gray-500">
                      Nhận hàng vào: {foundRes ? formatDate(foundRes.expectedDeliveryTime) : "---"}
                    </div>
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

      {!!selectedDeliveryProvider ? (
        <div className="shrink-0 border-t border-t-gray-100 px-2 py-2">
          <span className="text-gray-600">Đã chọn:</span>
          <span className="ml-1 text-base font-[500] text-green2-500">
            {selectedDeliveryProvider.name}
          </span>
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

export default DeliverySelect;
