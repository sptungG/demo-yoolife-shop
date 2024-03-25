import { CheckIcon } from "lucide-react";
import { ForwardRefRenderFunction, forwardRef, useId } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  FieldError,
  Label,
  Radio,
  RadioProps,
  Text,
} from "react-aria-components";

import { cn } from "@/utils/utils";

type TCheckboxFieldProps = Omit<CheckboxGroupProps, "children"> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  classNameErrMsg?: string;
  classNameDescMsg?: string;
};

const CheckboxField: ForwardRefRenderFunction<HTMLDivElement, TCheckboxFieldProps> = (
  {
    label,
    description,
    errorMessage,
    children,
    classNameErrMsg,
    classNameDescMsg,
    className,
    value,
    onChange,
    ...props
  },
  forwardedRef,
) => {
  const uid = useId();
  const { isRequired, isInvalid } = props;

  return (
    <CheckboxGroup
      value={value}
      onChange={onChange}
      className={cn(className)}
      ref={forwardedRef}
      validationBehavior="aria"
      {...props}
    >
      {!!label && (
        <Label className="mb-1 text-xs text-gray-500">{`${label}: ${isRequired ? "*" : ""}`}</Label>
      )}

      {children}

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
    </CheckboxGroup>
  );
};

type TCheckboxButtonProps = Omit<CheckboxProps, "children"> & {
  children?: React.ReactNode;
};
export const CheckboxButton01 = ({ children, ...props }: TCheckboxButtonProps) => {
  return (
    <Checkbox
      className={({ isSelected }) =>
        cn(
          "relative line-clamp-1 flex min-h-[40px] min-w-[100px] items-center justify-start break-all rounded-lg border border-gray-300 pl-4 pr-6 text-left capitalize text-gray-500 [&_span]:hidden",
          isSelected && "border-green2-200 bg-green2-100 font-[500] text-green2-500 [&_span]:flex",
        )
      }
      {...props}
    >
      {children}
      <span className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-full bg-green2-500 pl-[3px] pt-[3px] text-white">
        <CheckIcon size={16} />
      </span>
    </Checkbox>
  );
};

export default forwardRef(CheckboxField);
