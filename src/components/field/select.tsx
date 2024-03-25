import { ForwardRefRenderFunction, forwardRef } from "react";
import { Select as RASelect } from "react-aria-components";

type TSelectProps = React.HTMLAttributes<HTMLDivElement> & {};

const Select: ForwardRefRenderFunction<HTMLDivElement, TSelectProps> = ({}, forwardedRef) => {
  return <RASelect ref={forwardedRef}>Select</RASelect>;
};

export default forwardRef(Select);
