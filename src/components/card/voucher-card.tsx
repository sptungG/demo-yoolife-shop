import { CheckCircleIcon, CircleIcon, TruckIcon } from "lucide-react";
import React, { useId } from "react";
import { Button, ButtonProps, Checkbox, CheckboxProps, ProgressBar } from "react-aria-components";

import { TEDiscountType, TEVoucherStatus, TEVoucherType, TVoucher } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";
import { dayjs, formatDate } from "@/utils/utils-date";

import CornerBadge from "../shared/corner-badge";

type TVoucherCardProps = TVoucher & {
  right?: React.ReactNode;
};

const VoucherCard = ({ id, right, ...item }: TVoucherCardProps) => {
  const uid = useId();
  const discountTypeConf: Record<string, any> = {
    [TEDiscountType.FIX_AMOUNT]: `${formatNumber(item?.discountAmount)}₫`,
    [TEDiscountType.DISCOUNT_PERCENTAGE]: `${item?.percentage}%`,
  };
  return (
    <div
      key={uid + id}
      className="relative flex h-[76px] flex-nowrap border border-l-0 border-green2-200 bg-white shadow"
    >
      <div className="sawtooth absolute -left-[1px] bottom-0 z-10 h-full w-2 shrink-0 bg-transparent"></div>

      {item.status === TEVoucherStatus.UPCOMING && (
        <CornerBadge
          placement="left"
          label="Sắp diễn ra"
          className="bg-green2-400"
          classNameCorner="bg-green2-500"
        />
      )}

      <div
        className={cn(
          "relative z-0 flex h-[74px] w-[74px] shrink-0 self-center bg-green2-100 text-green2-500",
          item.type === TEVoucherType.VOUCHER_SHIPPING && "",
          item.type === TEVoucherType.VOUCHER_DISCOUNT && "",
          [TEVoucherStatus.EXPIRED].includes(item.status) && "bg-gray-200 text-gray-500 opacity-60",
        )}
      >
        <div
          className={cn("absolute inset-0 flex flex-col items-center justify-center text-inherit")}
        >
          {item.type === TEVoucherType.VOUCHER_SHIPPING && <TruckIcon className="" />}
          {item.type === TEVoucherType.VOUCHER_DISCOUNT &&
            item.discountType === TEDiscountType.FIX_AMOUNT && (
              <span className="text-[22px]">₫</span>
            )}
          {item.type === TEVoucherType.VOUCHER_DISCOUNT &&
            item.discountType === TEDiscountType.DISCOUNT_PERCENTAGE && (
              <span className="text-[20px]">%</span>
            )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col pb-1 pl-2 pr-4 pt-1.5",
          [TEVoucherStatus.EXPIRED].includes(item.status) && "opacity-60",
        )}
      >
        <div className="flex items-center gap-1">
          <div className="text-base font-[600] leading-none text-green2-500">
            <span className="mr-1">Giảm</span>
            <span>{discountTypeConf?.[item.discountType] || "---"}</span>
          </div>
          {!!item.maxPrice && (
            <div className="whitespace-nowrap text-sm text-green2-900/50">
              (<span className="mr-1">tối đa</span>
              <span>{formatNumber(item.maxPrice)}₫</span>)
            </div>
          )}
        </div>
        <div className="whitespace-nowrap text-sm text-green2-500">
          <span className="mr-1">Đơn tối thiểu</span>
          <span>{formatNumber(item.minBasketPrice)}₫</span>
        </div>

        <div className="mt-auto">
          {item.currentUsage / item.quantity > 0.5 && (
            <ProgressBar
              value={(item.currentUsage / item.quantity) * 100}
              className="flex h-[5px] w-[200px] overflow-hidden rounded-full bg-gray-200"
            >
              {({ percentage, valueText }) => (
                <div className="flex-shrink-0 bg-green2-500" style={{ width: percentage + "%" }} />
              )}
            </ProgressBar>
          )}
        </div>
        <div className="mt-1 flex flex-wrap">
          {/* {item.currentUsage / item.quantity < 0.5 && (
            <div className="mr-1 whitespace-nowrap text-[10px] text-gray-600">
              Đã sử dụng {((item.currentUsage / item.quantity) * 100).toFixed(2)}%.
            </div>
          )} */}
          {dayjs(item.dateEnd).isBefore(dayjs()) ? (
            <div className="whitespace-nowrap text-[11px] text-red-500">
              <span className="mr-1">Đã hết hạn:</span>
              <span>{formatDate(item.dateEnd, "HH:mm DD-MM-YYYY")}</span>
            </div>
          ) : dayjs(item.dateEnd).diff(dayjs(), "hour", true) < 24 ? (
            <div className="whitespace-nowrap text-[11px] text-red-500">
              <span className="mr-1">Sắp hết hạn:</span>
              <span>còn lại {dayjs(item.dateEnd).fromNow(true)}</span>
            </div>
          ) : (
            <div className="whitespace-nowrap text-[11px] text-gray-600">
              <span className="mr-1">Hạn sử dụng:</span>
              <span>{formatDate(item.dateEnd)}</span>
            </div>
          )}
        </div>
      </div>
      {right}
    </div>
  );
};

type TSmVoucherCardProps = TVoucher & {
  right?: React.ReactNode;
};

export const SmVoucherCard = ({ right, ...item }: TSmVoucherCardProps) => {
  const discountTypeConf: Record<string, any> = {
    [TEDiscountType.FIX_AMOUNT]: `${formatNumber(item?.discountAmount)}₫`,
    [TEDiscountType.DISCOUNT_PERCENTAGE]: `${item?.percentage}%`,
  };
  return (
    <div className="relative flex h-[76px] flex-nowrap border border-l-0 border-green2-200 bg-green2-50 shadow">
      <div className="sawtooth absolute -left-[1px] bottom-0 h-full w-2 shrink-0 bg-green2-200"></div>

      <div className="flex flex-col py-1 pl-2 pr-4">
        <div className="flex items-center gap-1">
          <div className="relative z-0 flex h-[24px] w-[24px] rounded-full bg-green2-200 text-green2-600">
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center text-inherit",
              )}
            >
              {item.type === TEVoucherType.VOUCHER_SHIPPING && <TruckIcon size={18} className="" />}
              {item.type === TEVoucherType.VOUCHER_DISCOUNT &&
                item.discountType === TEDiscountType.FIX_AMOUNT && (
                  <span className="text-[16px]">₫</span>
                )}
              {item.type === TEVoucherType.VOUCHER_DISCOUNT &&
                item.discountType === TEDiscountType.DISCOUNT_PERCENTAGE && (
                  <span className="text-[15px]">%</span>
                )}
            </div>
          </div>
          <div className="font-[600] text-green2-500">
            <span className="mr-1">Giảm</span>
            <span>{discountTypeConf?.[item.discountType] || "---"}</span>
          </div>
        </div>
        <div className="whitespace-nowrap text-sm text-green2-500">
          <span className="mr-1">Đơn tối thiểu</span>
          <span>{formatNumber(item.minBasketPrice)}₫</span>
        </div>
        {/* <div className="whitespace-nowrap text-sm text-green2-500">
          <span className="mr-1">Giảm tối đa</span>
          <span>{formatNumber(item.maxPrice)}₫</span>
        </div> */}
        <div className="mt-auto whitespace-nowrap text-[11px] text-gray-600">
          <span className="mr-1">Hạn sử dụng:</span>
          <span>{formatDate(item.dateEnd)}</span>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2">
        {right}
      </div>
    </div>
  );
};

type TRightActions01Props = TVoucher & {
  checkboxProps?: CheckboxProps;
  buttonProps?: ButtonProps;
};
export const RightActions01 = ({ checkboxProps, buttonProps, ...item }: TRightActions01Props) => {
  return !!item.isReceived ? (
    <Checkbox
      id={String(item.id)}
      value={String(item.id)}
      className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2"
      {...checkboxProps}
    >
      {({ isSelected, isDisabled }) =>
        isSelected ? (
          <CheckCircleIcon className="fill-green2-50 text-green2-400" />
        ) : (
          <CircleIcon className={cn("text-gray-500", isDisabled && "fill-gray-200 opacity-60")} />
        )
      }
    </Checkbox>
  ) : (
    <div className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2">
      <Button
        className={({ isDisabled }) =>
          cn(
            "rounded bg-green2-500 px-2.5 py-1.5 text-sm font-[500] text-white",
            isDisabled && "bg-gray-300",
          )
        }
        {...buttonProps}
      >
        Lưu
      </Button>
    </div>
  );
};

export default VoucherCard;
