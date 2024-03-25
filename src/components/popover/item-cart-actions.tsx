import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import React, { useId } from "react";
import { Button, ButtonProps, Dialog, DialogTrigger, Separator } from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import Popover, { PopoverArrow } from "../shared/popover";

type TItem = {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: () => void;
  isDisable?: () => void;
  className?: TClassValue;
};
type TItemCartActionsProps = { items?: TItem[] };

const ItemCartActions = ({ items }: TItemCartActionsProps) => {
  const uid = useId();
  return (
    <DialogTrigger>
      <Button
        className={({ isHovered, isPressed }) =>
          cn(
            "flex items-center justify-center rounded text-left outline-none",
            isPressed && "bg-gray-50 text-green2-600",
          )
        }
      >
        <MoreHorizontalIcon size={22} className="opacity-60" />
      </Button>
      <Popover
        slot={"ItemCartActions"}
        shouldUpdatePosition
        offset={12}
        shouldFlip={false}
        placement="bottom end"
        className={"!translate-x-1"}
      >
        <PopoverArrow />
        <Dialog slot={null} className="flex flex-col rounded bg-white p-1 outline-none">
          {({ close }) =>
            items?.map(({ className, label, icon, ...item }, index) => (
              <Button
                key={uid + index}
                className={({ isHovered }) =>
                  cn(
                    "relative flex cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded px-2 py-1 text-sm font-[500] text-gray-600 outline-none lg:text-base",
                    isHovered && "bg-gray-100",
                    className,
                  )
                }
                {...item}
                onPress={() => {
                  close();
                  item.onPress?.();
                }}
              >
                {icon}
                <span>{label}</span>
              </Button>
            ))
          }
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default ItemCartActions;
