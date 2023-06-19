import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Input, { TInputProps } from "./Input";

type TInputPasswordProps = Omit<TInputProps, "type">;

const InputPassword: ForwardRefRenderFunction<HTMLInputElement, TInputPasswordProps> = (
  props,
  forwardedRef,
) => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  return (
    <Input
      ref={forwardedRef}
      {...props}
      type={isHidePassword ? "password" : "text"}
      className="pr-[44px]"
      classNameSuffix="text-gray-400 cursor-pointer px-3"
      suffix={
        isHidePassword ? (
          <MdVisibilityOff onClick={() => setIsHidePassword(false)} size={22} />
        ) : (
          <MdVisibility onClick={() => setIsHidePassword(true)} size={22} />
        )
      }
    />
  );
};

export default forwardRef(InputPassword);
