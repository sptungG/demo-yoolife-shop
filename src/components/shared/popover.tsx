import React, { useId } from "react";
import { Dialog, OverlayArrow, Popover as RAPopover } from "react-aria-components";
import type { PopoverProps } from "react-aria-components";

import { cn } from "@/utils/utils";

type TPopoverProps = PopoverProps & {};

const Popover = ({ children, className, ...props }: TPopoverProps) => {
  return (
    <RAPopover
      {...props}
      className={({ isEntering, isExiting, placement }) =>
        cn(
          "group rounded bg-white ring-1 ring-gray-200/10 drop-shadow-lg",
          placement === "left" && "",
          placement === "right" && "",
          placement === "bottom" && "",
          placement === "top" && "",
          placement === "center" && "",
          className,
        )
      }
    >
      {children}
    </RAPopover>
  );
};

export const PopoverArrow = ({ className = "" }) => {
  return (
    <OverlayArrow className={className}>
      {({ placement }) => (
        <svg
          viewBox="0 0 12 12"
          className={cn(
            "block h-4 w-4 fill-white drop-shadow-sm",
            placement === "left" && "",
            placement === "right" && "",
            placement === "bottom" && "rotate-180",
            placement === "top" && "",
            placement === "center" && "",
          )}
        >
          <path d="M0 0L6 6L12 0" />
        </svg>
      )}
    </OverlayArrow>
  );
};

export default Popover;
