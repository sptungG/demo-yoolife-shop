import { MacScrollbarProps } from "mac-scrollbar";
import dynamic from "next/dynamic";
import { ForwardRefRenderFunction, forwardRef } from "react";

import { cn } from "@/utils/utils";

const MacScrollbar = dynamic(() => import("mac-scrollbar").then((m) => m.MacScrollbar), {
  ssr: false,
});

type TScrollBarProps = {
  className?: string;
} & MacScrollbarProps;

const ScrollBar: ForwardRefRenderFunction<HTMLElement, TScrollBarProps> = (
  { children, className, ...props },
  forwardedRef,
) => {
  return (
    <MacScrollbar ref={forwardedRef} className={className} {...props}>
      {children}
    </MacScrollbar>
  );
};

export default forwardRef(ScrollBar);
