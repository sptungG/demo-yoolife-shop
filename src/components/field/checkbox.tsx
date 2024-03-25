import { ForwardRefRenderFunction, forwardRef } from "react";
import { CheckboxProps, Checkbox as RACheckbox } from "react-aria-components";

import { cn } from "@/utils/utils";

type TCheckboxProps = CheckboxProps & {};

const Checkbox: ForwardRefRenderFunction<HTMLLabelElement, TCheckboxProps> = (
  { className, children, ...props },
  forwardedRef,
) => {
  return (
    <RACheckbox
      ref={forwardedRef}
      className={({ isDisabled }) =>
        cn(
          "group flex items-center gap-x-1",
          className,
          isDisabled && "cursor-not-allowed opacity-50",
        )
      }
      {...props}
    >
      {({ isIndeterminate, isSelected }) => (
        <>
          <div
            className={cn(
              "flex h-[18px] w-[18px] items-center justify-center rounded border border-gray-400 transition-all duration-100",
              isIndeterminate && "border-primary-500 bg-primary-500",
              isSelected && "border-primary-500 bg-primary-500",
            )}
          >
            <svg
              viewBox="0 0 18 18"
              aria-hidden="true"
              strokeWidth={3}
              strokeDasharray={22}
              strokeDashoffset={isIndeterminate || isSelected ? 44 : 66}
              className="h-3 w-3 fill-none stroke-white transition-all duration-100"
            >
              {isIndeterminate ? (
                <rect x={0} y={8.5} width={20} height={1} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </RACheckbox>
  );
};

export default forwardRef(Checkbox);
