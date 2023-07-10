import { forwardRef, ForwardRefRenderFunction } from "react";
import type { CheckboxProps } from "react-aria-components";
import { Checkbox as ACheckbox } from "react-aria-components";
import { MdCheck } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type TCheckboxProps = CheckboxProps & {
  autoFocus?: boolean;
  checked?: boolean;
  defaultedChecked?: boolean;
  isSelected?: boolean;
  label?: string;
  errorMessage?: string;
};

// ({ children, ...props }
const Checkbox: ForwardRefRenderFunction<HTMLInputElement, TCheckboxProps> = (
  { children, id, validationState, errorMessage, ...props },
  forwardedRef,
) => {
  return (
    <ACheckbox
      {...props}
      ref={forwardedRef}
      className="mr-5 flex cursor-pointer items-center justify-start"
    >
      {({ isSelected }) => (
        <>
          <div
            className={twMerge(
              "m-0 mr-1 flex h-5 w-5 justify-between rounded border-2 border-primary-50 transition-all",
              isSelected ? "bg-primary-50" : "",
            )}
          >
            <MdCheck className="text-white " />
          </div>
          {children}
        </>
      )}
    </ACheckbox>
  );
};

export default forwardRef(Checkbox);
