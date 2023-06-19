import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { AriaFieldProps, useField } from "react-aria";
import { twMerge } from "tailwind-merge";
import CircleLoading from "../shared/CircleLoading";
import Label from "./Label";

export type TBaseInputProps = InputHTMLAttributes<HTMLInputElement>;

export type TInputProps = Omit<TBaseInputProps, "prefix" | "suffix"> &
  AriaFieldProps & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    isLoading?: boolean;
    classNamePrefix?: string;
    classNameSuffix?: string;
    extraLabel?: React.ReactNode;
    className?: string;
    classNameWrapper?: string;
    classNameLabel?: string;
  };

const Input: ForwardRefRenderFunction<HTMLInputElement, TInputProps> = (
  {
    className,
    classNameWrapper,
    classNameLabel,
    extraLabel,
    prefix,
    suffix,
    classNamePrefix,
    classNameSuffix,
    isLoading,
    description,
    errorMessage,
    id,
    label,
    labelElementType,
    validationState,
    ...props
  },
  forwardedRef,
) => {
  const { required } = props;
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    description,
    errorMessage,
    id,
    label,
    labelElementType,
    validationState,
  });
  return (
    <div className={twMerge("relative mb-5", classNameWrapper)}>
      <Label
        {...labelProps}
        required={required}
        className={classNameLabel}
        label={label}
        extra={extraLabel}
      />
      <div className="group relative">
        {!!prefix && (
          <div
            className={twMerge(
              "absolute inset-y-0 left-0 flex select-none items-center",
              classNamePrefix,
              errorMessage && "text-red-300",
            )}
          >
            {prefix}
          </div>
        )}
        <input
          {...fieldProps}
          {...props}
          ref={forwardedRef}
          className={twMerge(
            "w-full rounded border border-gray-300 p-2 outline-none ring-offset-0 transition-all placeholder:text-gray-400 focus:border-primary-700 focus:ring-[1px] focus:ring-primary-700",
            errorMessage &&
              "border-red-400 placeholder:text-red-300 focus:border-red-400 focus:ring-red-400",
            className,
            isLoading && "pr-[44px]",
          )}
        />
        {!isLoading && !!suffix && (
          <div
            className={twMerge(
              "absolute inset-y-0 right-0 flex select-none items-center",
              classNameSuffix,
              errorMessage && "text-red-300",
            )}
          >
            {suffix}
          </div>
        )}
        {isLoading && <CircleLoading classNameWrapper="absolute inset-y-0 right-0 px-3" />}
      </div>
      {description && (
        <div {...descriptionProps} className="max-w-full text-ellipsis text-xs line-clamp-1">
          {description}
        </div>
      )}
      {errorMessage && (
        <div
          {...errorMessageProps}
          className="absolute bottom-0 left-0 flex h-5 max-w-full translate-y-full items-start text-ellipsis px-0.5 text-sm text-red-500 line-clamp-1"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Input);
