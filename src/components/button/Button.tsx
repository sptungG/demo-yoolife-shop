import { useObjectRef } from "@react-aria/utils";
import { ForwardRefRenderFunction, forwardRef, memo, useId } from "react";
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { twMerge } from "tailwind-merge";
import CircleLoading from "../shared/CircleLoading";
import useRippleAnywhere from "../shared/useRippleAnywhere";

type TButtonProps = AriaButtonProps<"button"> & {
  className?: string;
  classNameHover?: string;
  buttonRef?: any;
  classNameDisabled?: string;
  classNameFocus?: string;
  classNameRipple?: string;
  isLoading?: boolean;
  hideRipple?: boolean;
  icon?: React.ReactNode;
  form?: string;
  name?: string;
  value?: string;
  style?: any;
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, TButtonProps> = (
  {
    className,
    classNameHover,
    classNameDisabled,
    classNameFocus,
    classNameRipple,
    isLoading,
    icon,
    hideRipple,
    ...props
  },
  forwardedRef,
) => {
  const uid = useId();
  const { isDisabled, children } = props;
  const domRef = useObjectRef(forwardedRef);
  const { buttonProps } = useButton({ ...props, elementType: "button" }, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled }); // https://react-spectrum.adobe.com/blog/building-a-button-part-2.html
  const { focusProps, isFocusVisible } = useFocusRing(props);

  const handleClick = useRippleAnywhere<HTMLButtonElement>(uid, classNameRipple);

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      onClick={(e) => {
        !hideRipple && handleClick(e);
      }}
      id={uid}
      ref={domRef}
      className={twMerge(
        "relative z-0 inline-flex max-w-full select-none items-center justify-center overflow-hidden rounded outline-none",
        className,
        isFocusVisible && [
          "outline outline-2 outline-offset-2 outline-primary-500/50",
          classNameFocus,
        ],
        isHovered && ["bg-opacity-80", classNameHover],
        isDisabled && ["bg-gray-100 text-gray-500", classNameDisabled],
      )}
    >
      {isLoading ? (
        <CircleLoading
          classNameWrapper="mr-2 flex-shrink-0"
          className="border-gray-100 border-t-primary-500"
        />
      ) : (
        icon
      )}
      <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </div>
    </button>
  );
};

export default memo(forwardRef(Button));
