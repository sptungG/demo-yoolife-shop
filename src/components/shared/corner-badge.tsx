import React from "react";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

type TCornerBadgeProps = {
  placement?: "left" | "right";
  className?: TClassValue;
  classNameWrapper?: TClassValue;
  classNameCorner?: TClassValue;
  label?: React.ReactNode;
};

const CornerBadge = ({
  className,
  classNameWrapper,
  classNameCorner,
  placement = "right",
  label,
}: TCornerBadgeProps) => {
  return (
    <div
      className={cn(
        "absolute top-1",
        placement === "right" && "-right-1.5",
        placement === "left" && "-left-1.5",
        classNameWrapper,
      )}
    >
      <div
        className={cn(
          "relative z-10 flex min-h-[18px] items-center bg-green2-300  text-[11px] text-white shadow-sm",
          placement === "right" && "rounded-l-full pl-2 pr-1.5",
          placement === "left" && "rounded-r-full pl-1.5 pr-2",
          className,
        )}
      >
        {label}
      </div>
      <span
        className={cn(
          "absolute bottom-0 -z-20 h-2 w-2 translate-y-1/2 rotate-45 bg-green2-500",
          placement === "right" && "right-0.5",
          placement === "left" && "left-0.5",
          classNameCorner,
        )}
      ></span>
    </div>
  );
};

export default CornerBadge;
