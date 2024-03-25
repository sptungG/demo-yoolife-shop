import React from "react";

import { TEDiscountType, TVoucher } from "@/types/item-type";
import { cn, formatNumber, formatNumber2 } from "@/utils/utils";

type TItemCardVoucherProps = TVoucher & {};

const ItemCardVoucher = (item: TItemCardVoucherProps) => {
  const discountTypeConf: Record<string, any> = {
    [TEDiscountType.FIX_AMOUNT]: `₫${formatNumber2(item?.discountAmount)}`,
    [TEDiscountType.DISCOUNT_PERCENTAGE]: `${item?.percentage}%`,
  };

  if (!discountTypeConf?.[item.discountType]) return <></>;

  return (
    <div className="flex h-[18px] shrink-0 items-center">
      <svg
        className={cn(
          "-mr-[1px] h-[18px] shrink-0 fill-green2-300 text-green2-300",
          !!item?.percentage && "fill-orange-300 text-orange-300",
        )}
        viewBox="-0.5 -0.5 4 16"
      >
        <path
          d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
          strokeWidth={1}
          transform=""
          stroke="currentColor"
        ></path>
      </svg>
      <div
        className={cn(
          "z-[1] flex h-[18px] shrink-0 items-center gap-0.5 whitespace-nowrap bg-green2-300 text-[11px] leading-none text-white",
          !!item?.percentage && "bg-orange-300",
          item.discountType === TEDiscountType.DISCOUNT_PERCENTAGE && "flex-row-reverse",
        )}
      >
        <span className="leading-[1.1]">Giảm</span>
        <span className="font-[600] leading-[1.1]">
          {discountTypeConf?.[item.discountType] || "---"}
        </span>
      </div>
      <svg
        className={cn(
          "-ml-[1px] h-[18px] shrink-0 fill-green2-300 text-green2-300",
          !!item?.percentage && "fill-orange-300 text-orange-300",
        )}
        viewBox="-0.5 -0.5 4 16"
      >
        <path
          d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
          strokeWidth={1}
          transform="rotate(180) translate(-3 -15)"
          stroke="currentColor"
        ></path>
      </svg>
    </div>
  );
};

export default ItemCardVoucher;
