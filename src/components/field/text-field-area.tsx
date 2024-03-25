import { ForwardRefRenderFunction, forwardRef, useId } from "react";
import {
  FieldError,
  Input,
  Label,
  TextField as RATextField,
  Text,
  TextArea,
  TextFieldProps,
  ValidationResult,
} from "react-aria-components";

import { cn } from "@/utils/utils";

export type TTextFieldAreaProps = {
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  errorMessage?: string;
  suffix?: React.ReactNode;
  classNameSuffix?: string;
  classNameInput?: string;
  classNameErrMsg?: string;
  classNameDescMsg?: string;
} & TextFieldProps;

const TextFieldArea: ForwardRefRenderFunction<HTMLTextAreaElement, TTextFieldAreaProps> = (
  {
    label,
    description,
    errorMessage,
    placeholder = " ",
    className,
    classNameSuffix,
    suffix,
    classNameInput,
    classNameErrMsg,
    classNameDescMsg,
    ...props
  },
  forwardedRef,
) => {
  const uid = useId();
  const { isRequired, isInvalid } = props;
  return (
    <RATextField
      className={cn("relative mb-4 flex flex-col", className)}
      validationBehavior="aria"
      {...props}
    >
      {!!label && (
        <Label className="mb-1 text-xs text-gray-500">{`${label}: ${isRequired ? "*" : ""}`}</Label>
      )}

      <div className="relative w-full">
        <TextArea
          rows={2}
          placeholder={placeholder}
          ref={forwardedRef}
          className={({ isFocused, isInvalid }) =>
            cn(
              "min-h-11 w-full rounded border border-gray-300 px-2.5 py-2.5 text-gray-900 outline-none placeholder:text-gray-300",
              classNameInput,
              isFocused && "border-primary-600 dark:border-primary-500",
              isInvalid && "placeholder:text-red-400",
            )
          }
        />
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
    </RATextField>
  );
};

export default forwardRef(TextFieldArea);
