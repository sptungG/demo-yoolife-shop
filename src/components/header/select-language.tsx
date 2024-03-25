import { Check } from "lucide-react";
import { useId } from "react";
import {
  Dialog,
  Label,
  ListBox,
  ListBoxItem,
  Button as RAButton,
  Select,
  SelectValue,
} from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { cn } from "@/utils/utils";

import { LanguageSvg } from "../icons";
import Popover, { PopoverArrow } from "../shared/popover";

type TSelectLanguageProps = { className?: string };

const SelectLanguage = ({ className }: TSelectLanguageProps) => {
  const uid = useId();

  const items = [
    { value: "vi", icon: "VI", label: "Vietnam" },
    { value: "en", icon: "EN", label: "English" },
    { value: "ko", icon: "KO", label: "South Korean" },
  ];
  const { i18n } = useTranslation();

  return (
    <Select
      defaultSelectedKey="vi"
      placeholder="Language..."
      selectedKey={i18n.language}
      disabledKeys={["ko"]}
      onSelectionChange={(v) => {
        i18n.changeLanguage(v as string);
      }}
      className={className}
    >
      <Label>
        <RAButton
          className={({ isHovered }) =>
            cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-green2-200 bg-green2-50 text-green2-400 outline-none",
              isHovered && "shadow-md shadow-green2-100",
            )
          }
        >
          <SelectValue<any> className="-mb-0.5 font-[500]">
            {({ selectedItem }) => selectedItem?.icon}
          </SelectValue>
        </RAButton>
      </Label>

      <Popover
        shouldFlip={false}
        offset={12}
        placement="bottom end"
        className={({}) => "min-w-[132px]"}
      >
        <PopoverArrow />
        <ListBox className={({}) => "flex flex-col gap-1 rounded bg-white p-1"}>
          {items.map((item, index) => (
            <ListBoxItem
              key={uid + item.value + index}
              id={item.value}
              value={item}
              textValue={item.label}
              className={({ isHovered, isDisabled }) =>
                cn(
                  "relative flex cursor-pointer items-center gap-1 rounded bg-white p-2 font-[500] text-gray-500 outline-none",
                  isHovered && "bg-gray-100",
                  isDisabled && "opacity-50",
                )
              }
            >
              {({ isSelected }) => (
                <>
                  <span className="w-[20px] text-xs">{item.icon}</span>
                  <span>{item.label}</span>
                  {isSelected && <Check strokeWidth={2} className="ml-auto w-5 text-green-500" />}
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default SelectLanguage;
