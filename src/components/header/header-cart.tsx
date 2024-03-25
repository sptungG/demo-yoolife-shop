import { ShoppingCartIcon } from "lucide-react";
import React, { useId } from "react";
import { Dialog, DialogTrigger, Button as RAButton } from "react-aria-components";

import useGetCart from "@/hooks/use-get-cart";
import { itemApi } from "@/redux/query/item-query";

import { CartSvg } from "../icons";
import ScrollBar from "../scrollbar/scroll-bar";
import Popover, { PopoverArrow } from "../shared/popover";

type THeaderCartProps = {};

const HeaderCart = ({}: THeaderCartProps) => {
  const uid = useId();
  const { totalQuantity } = useGetCart();
  return (
    <DialogTrigger>
      <RAButton className="relative rounded-full outline-none">
        <ShoppingCartIcon size={48} strokeWidth={1.8} className="w-12 text-green2-300" />
        {!!totalQuantity && (
          <span className="tw-badge-count -top-0.5 bg-green2-400">{totalQuantity}</span>
        )}
      </RAButton>
      <Popover shouldFlip={false} offset={12} placement="bottom end">
        <PopoverArrow />
        <Dialog className="flex max-h-[calc(100dvh-88px)] flex-col text-gray-700 outline-none">
          <div className="flex min-h-[40px] flex-none items-center px-2 font-[400] text-gray-400">
            <span>Sản phẩm mới thêm</span>
            <span className="mx-1">•</span>
            <span>2</span>
          </div>
          <ScrollBar className="max-h-fit min-h-0 max-w-[400px] flex-1 p-2">
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <div key={uid + index} className="">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, quam aliquid
                  officiis quae voluptatibus dolorem exercitationem corporis suscipit asperiores
                  est, accusamus veritatis veniam quia repellat at fugit nesciunt nostrum soluta.
                </div>
              ))}
          </ScrollBar>
          <div className="flex min-h-[48px] flex-none justify-end px-2 py-2">
            <RAButton className="rounded bg-green2-400 px-4 text-white">Xem giỏ hàng</RAButton>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default HeaderCart;
