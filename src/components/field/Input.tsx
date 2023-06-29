import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { AriaFieldProps, useField } from "react-aria";
import { twMerge } from "tailwind-merge";

export type TBaseInputProps = InputHTMLAttributes<HTMLInputElement>;

export type TInputProps = Omit<TBaseInputProps, "prefix" | "suffix"> &
  AriaFieldProps & {
    suffix?: React.ReactNode;
    classNamePrefix?: string;
    classNameSuffix?: string;
    className?: string;
    classNameWrapper?: string;
  };

const Input: ForwardRefRenderFunction<HTMLInputElement, TInputProps> = (
  {
    className,
    classNameWrapper,
    suffix,
    classNameSuffix,
    errorMessage,
    id,
    validationState,
    ...props
  },
  forwardedRef,
) => {
  const { fieldProps, errorMessageProps } = useField({
    errorMessage,
    id,

    validationState,
  });
  return (
    <div className={twMerge("relative mb-8", classNameWrapper)}>
      <div className="group relative">
        <input
          {...fieldProps}
          {...props}
          ref={forwardedRef}
          className={twMerge(
            " w-full rounded-2xl border-2 border-primary-50 bg-white p-2 text-base font-semibold focus-visible:outline-none active:border-blue-300",
            errorMessage && "border-red-400 text-red-400 active:border-red-500",
            className,
          )}
        />
        {!!suffix && (
          <div
            className={twMerge(
              "absolute inset-y-0 right-0 flex select-none items-center",
              classNameSuffix,
              errorMessage && "text-red-400 hover:text-red-400",
            )}
          >
            {suffix}
          </div>
        )}
      </div>

      {errorMessage && (
        <div
          {...errorMessageProps}
          className="absolute bottom-0 left-0 line-clamp-1 flex h-5 max-w-full translate-y-full items-start text-ellipsis px-0.5 text-sm text-red-400"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Input);
