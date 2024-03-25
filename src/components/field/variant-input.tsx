import { ForwardRefRenderFunction, forwardRef, useId } from "react";
import {
  FieldError,
  Input,
  InputProps,
  Label,
  Text,
  TextField,
  TextFieldProps,
} from "react-aria-components";

import { cn } from "@/utils/utils";

export type TVariantTextField = "outlined" | "filled" | "standard";

export type TVariantTextFieldProps = TextFieldProps & {
  label?: React.ReactNode;
  placeholder?: string;
  variant?: TVariantTextField;
  isInvalid?: boolean;
  suffix?: React.ReactNode;
  classNameSuffix?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  classNameDescMsg?: string;
  classNameErrMsg?: string;
  classNameInput?: string;
};

const VariantTextField: ForwardRefRenderFunction<HTMLInputElement, TVariantTextFieldProps> = (
  {
    placeholder,
    label,
    variant = "outlined",
    suffix,
    className,
    classNameSuffix,
    description,
    errorMessage,
    classNameErrMsg,
    classNameInput,
    classNameDescMsg,
    ...props
  },
  forwardedRef,
) => {
  const uid = useId();
  const { isRequired, isInvalid } = props;
  return (
    <TextField className={cn("relative mb-4", className)} validationBehavior="aria" {...props}>
      <div className="relative z-0">
        <Input
          ref={forwardedRef}
          placeholder={placeholder || uid}
          className={({ isInvalid, isFocused }) =>
            cn(
              "peer block w-full appearance-none text-sm text-gray-900 outline-none ring-0",
              variant === "outlined" && [
                "rounded border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 placeholder:text-transparent dark:border-gray-600 dark:text-white",
                isFocused && "border-primary-600 placeholder:text-gray-300 dark:border-primary-500",
                isInvalid && "border-red-400 dark:border-red-300",
              ],
              variant === "filled" && [
                "rounded-t border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 placeholder:text-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                isFocused && "border-primary-600 placeholder:text-gray-300 dark:border-primary-500",
                isInvalid && "",
              ],
              variant === "standard" && [
                "border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 placeholder:text-transparent dark:border-gray-600 dark:text-white",
                isFocused && "border-primary-600 placeholder:text-gray-300 dark:border-primary-500",
                isInvalid && "",
              ],
              classNameInput,
            )
          }
        />
        <Label
          className={cn(
            "line-clamp-1 max-w-full whitespace-nowrap",
            variant === "outlined" && [
              "absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:w-fit peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-500",
            ],
            variant === "filled" && [
              "absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
            ],
            variant === "standard" && [
              "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500",
            ],
            isInvalid &&
              "text-red-600 peer-focus:text-red-600 dark:text-red-500 peer-focus:dark:text-red-500",
          )}
        >
          {`${label} ${isRequired ? "*" : ""}`}
        </Label>

        {suffix && (
          <div
            className={cn(
              "absolute right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center",
              classNameSuffix,
            )}
          >
            {suffix}
          </div>
        )}
      </div>
      {description && (
        <Text
          slot="description"
          className={cn("flex items-center text-xs text-gray-600", classNameDescMsg)}
        >
          {description}
        </Text>
      )}
      <FieldError
        className={cn(
          "flex items-center text-xs",
          classNameErrMsg,
          isInvalid && "text-red-600 dark:text-red-400",
        )}
      >
        {errorMessage}
      </FieldError>
    </TextField>
  );
};

export default forwardRef(VariantTextField);
