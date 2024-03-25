import { ForwardRefRenderFunction, forwardRef } from "react";
import { ButtonProps, Button as RAButton } from "react-aria-components";

import { cn } from "@/utils/utils";

import CircleLoading from "../shared/circle-loading";

type TVariantButton = "primary";
type TButtonProps = ButtonProps & {
  isLoading?: boolean;
  icon?: React.ReactNode;
  classNameHovered?: string;
  classNameFocused?: string;
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, TButtonProps> = (
  { children, className, isLoading, icon, classNameFocused, classNameHovered, ...props },
  forwardedRef,
) => {
  return (
    <RAButton
      ref={forwardedRef}
      className={({ isHovered, isFocused, isDisabled }) =>
        cn(
          "relative inline-flex max-w-full items-center justify-center px-5 py-2.5 text-center outline-none",
          className,
          isHovered && classNameHovered,
          isFocused && classNameFocused,
        )
      }
      {...props}
    >
      {(values) => (
        <>
          {isLoading ? (
            <CircleLoading
              classNameWrapper="flex-shrink-0 absolute top-1/2 transform -translate-y-1/2 left-2.5 translate-x-1/2"
              className="border-gray-100 border-t-green2-500"
            />
          ) : (
            icon
          )}
          <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </RAButton>
  );
};

export default forwardRef(Button);
