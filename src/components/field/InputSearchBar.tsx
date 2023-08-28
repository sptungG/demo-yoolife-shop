import { forwardRef, ForwardRefRenderFunction } from "react";
import { SearchIcon } from "src/components/icons";
import Input, { TInputProps } from "./Input";

type TInputPasswordProps = Omit<TInputProps, "type">;

const InputSearchbar: ForwardRefRenderFunction<HTMLInputElement, TInputPasswordProps> = (
  props,
  forwardedRef,
) => {
  return (
    <Input
      style={{ backgroundColor: "#F1F2F8" }}
      className="grow border-0"
      ref={forwardedRef}
      {...props}
      type="text"
      classNamePrefix="text-gray-400 cursor-pointer px-3 bottom-0 left-100 z-10  hover:text-black "
      prefix={<SearchIcon className="h-5 w-5" />}
      //   <MdSearch />
    />
  );
};

export default forwardRef(InputSearchbar);
