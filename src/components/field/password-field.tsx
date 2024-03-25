import { ForwardRefRenderFunction, forwardRef, useId, useMemo, useState } from "react";
import { Button } from "react-aria-components";

import { EyeFillSvg, EyeSlashFillSvg } from "../icons";
import VariantTextField, { TVariantTextFieldProps } from "./variant-input";

type TPasswordFieldProps = TVariantTextFieldProps;

const PasswordField: ForwardRefRenderFunction<HTMLInputElement, TPasswordFieldProps> = (
  { type = "password", ...props },
  forwardedRef,
) => {
  const uid = useId();
  const [hidePassword, setHidePassword] = useState(true);

  const renderSuffix = useMemo(
    () =>
      hidePassword ? (
        <Button
          className={"px-2.5 text-gray-400 outline-none"}
          onPress={() => setHidePassword(false)}
        >
          <EyeFillSvg className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          className={"px-2.5 text-gray-400 outline-none"}
          onPress={() => setHidePassword(true)}
        >
          <EyeSlashFillSvg className="h-5 w-5" />
        </Button>
      ),
    [hidePassword],
  );

  return (
    <VariantTextField
      ref={forwardedRef}
      {...props}
      type={hidePassword ? "password" : "text"}
      suffix={renderSuffix}
    />
  );
};

export default forwardRef(PasswordField);
