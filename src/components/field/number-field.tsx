import { MinusIcon, PlusIcon } from "lucide-react";
import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Group,
  Input,
  Label,
  NumberFieldProps,
  NumberField as RANumberField,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

type TNumberFieldProps = NumberFieldProps & {
  label?: React.ReactNode;
  classNameLabel?: TClassValue;
  classNameGroup?: TClassValue;
  classNameBtn?: TClassValue;
  classNameInput?: TClassValue;
};

const NumberField: ForwardRefRenderFunction<HTMLDivElement, TNumberFieldProps> = (
  { label, className, classNameLabel, classNameGroup, classNameBtn, classNameInput, ...props },
  forwardedRef,
) => {
  const { isRequired } = props;
  return (
    <RANumberField
      ref={forwardedRef}
      className={({}) => cn("flex flex-col items-start", className)}
      formatOptions={{
        maximumFractionDigits: 0,
      }}
      {...props}
    >
      {!!label && (
        <Label className={cn("mb-1 text-xs text-gray-500", classNameLabel)}>{`${label}: ${
          isRequired ? "*" : ""
        }`}</Label>
      )}
      <Group
        className={({ isFocusWithin }) =>
          cn(
            "flex h-[40px] rounded-lg border",
            classNameGroup,
            isFocusWithin && "border-green2-400",
          )
        }
      >
        <Button
          slot="decrement"
          className={({ isHovered, isPressed, isDisabled }) =>
            cn(
              "flex h-full w-[40px] flex-shrink-0 items-center justify-center border-r",
              classNameBtn,
              isPressed && "bg-green2-100 text-green2-500",
              isDisabled && "text-gray-200",
            )
          }
        >
          <MinusIcon size={14} strokeWidth={4} />
        </Button>
        <Input className={({}) => cn("w-[80px] px-3 text-base outline-none", classNameInput)} />
        <Button
          slot="increment"
          className={({ isHovered, isPressed, isDisabled }) =>
            cn(
              "flex h-full w-[40px] flex-shrink-0 items-center justify-center border-l",
              classNameBtn,
              isPressed && "bg-green2-100 text-green2-500",
              isDisabled && "text-gray-200",
            )
          }
        >
          <PlusIcon size={14} strokeWidth={4} />
        </Button>
      </Group>
    </RANumberField>
  );
};

export default forwardRef(NumberField);
