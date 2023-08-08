import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Input, { TInputProps } from "./Input";

type TInputPasswordProps = Omit<TInputProps, "type">;

const InputPassword: ForwardRefRenderFunction<HTMLInputElement, TInputPasswordProps> = (
  props,
  forwardedRef,
) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <Input
      ref={forwardedRef}
      {...props}
      type={hidePassword ? "password" : "text"}
      classNameSuffix="text-gray-400 cursor-pointer px-3 bottom-0 right-0 z-10  hover:text-black "
      suffix={
        hidePassword ? (
          <MdVisibilityOff className="bg-white" onClick={() => setHidePassword(false)} size={22} />
        ) : (
          <MdVisibility className="bg-white" onClick={() => setHidePassword(true)} size={22} />
        )
      }
    />
  );
};

export default forwardRef(InputPassword);
