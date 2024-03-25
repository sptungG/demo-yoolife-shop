import { skipToken } from "@reduxjs/toolkit/query";
import { Check, ChevronDown, SearchIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Input,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  PopoverProps,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "react-aria-components";

import { TDistrict, TProvince, TWard, vauApi } from "@/redux/query/province-query";
import { TClassValue } from "@/types/global-type";
import { cn, vietnameseSlug } from "@/utils/utils";

import ScrollBar from "../scrollbar/scroll-bar";
import Popover from "../shared/popover";

type TValue = {
  provinceCode?: Key;
  districtCode?: Key;
  wardCode?: Key;
};

type TAddressSelectsProps = {
  value?: TValue;
  onChange?: (value?: TValue) => void;
  classNameTrigger?: TClassValue;
  portalContainer?: PopoverProps["UNSTABLE_portalContainer"];
  isError?: boolean;
};

const TABS = {
  PROVINCE: "PROVINCE",
  DISTRICT: "DISTRICT",
  WARD: "WARD",
};

const mappedList = (arr: any[], keyword = "") =>
  arr.filter(({ name }) => vietnameseSlug(name, " ").includes(vietnameseSlug(keyword, " ")));

const AddressSelects = ({
  value,
  onChange,
  classNameTrigger,
  portalContainer,
  isError,
}: TAddressSelectsProps) => {
  const uid = useId();
  const [selectedTab, setSelectedTab] = useState<Key>(TABS.PROVINCE);
  const [keyword, setKeyword] = useState("");

  const { data: getAllProvincesRes } = vauApi.useGetAllProvincesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const { data: getAllDistrictsRes } = vauApi.useGetAllDistrictsQuery(
    !!value?.provinceCode ? { code: value.provinceCode as string } : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const { data: getAllWardsRes } = vauApi.useGetAllWardsQuery(
    !!value?.districtCode ? { code: value.districtCode as string } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const foundProvince = useMemo(
    () => getAllProvincesRes?.result?.find((item) => item.code === value?.provinceCode),
    [getAllProvincesRes?.result, value?.provinceCode],
  );
  const foundDistrict = useMemo(
    () => getAllDistrictsRes?.result?.find((item) => item.code === value?.districtCode),
    [getAllDistrictsRes?.result, value?.districtCode],
  );
  const foundWard = useMemo(
    () => getAllWardsRes?.result?.find((item) => item.code === value?.wardCode),
    [value?.wardCode, getAllWardsRes?.result],
  );

  return (
    <DialogTrigger>
      <Button
        key={uid + String(value) + "Button"}
        className={({ isPressed }) =>
          cn(
            "relative flex h-11 items-center border border-gray-300 px-2.5 text-left",
            classNameTrigger,
            isPressed && "border-green2-500",
            isError && "border-red-300",
          )
        }
      >
        {({ isPressed }) => (
          <>
            <span
              className={cn(
                "text-base text-gray-300",
                !!foundProvince && "hidden",
                isError && "text-red-400",
              )}
            >
              {`Chọn địa chỉ${isPressed || foundProvince ? "" : "..."}`}
            </span>
            <div className="flex items-center gap-1 text-gray-500">
              {!!foundProvince && <span>{foundProvince.name} \</span>}
              {!!foundDistrict && <span>{foundDistrict.name} \</span>}
              {!!foundWard && <span>{foundWard.name}</span>}
            </div>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <ChevronDown size={24} className="text-gray-400" />
            </span>
          </>
        )}
      </Button>
      <Popover
        shouldFlip={false}
        placement="bottom start"
        className={"!-ml-[3px] !-mt-1"}
        maxHeight={300}
        UNSTABLE_portalContainer={portalContainer}
      >
        <Dialog className="z-50 flex w-[calc(100vw-18px)] flex-col overflow-hidden rounded text-gray-700 outline-none sm:w-[350px]">
          {({ close }) => (
            <Tabs
              slot={null}
              key={uid + String(value) + "Tabs"}
              selectedKey={selectedTab}
              onSelectionChange={(k) => {
                setKeyword("");
                setSelectedTab(k);
              }}
              defaultSelectedKey={TABS.PROVINCE}
              disabledKeys={
                [
                  !!value?.provinceCode ? undefined : TABS.DISTRICT,
                  !!value?.provinceCode && !!value?.districtCode ? undefined : TABS.WARD,
                ].filter((k) => !!k) as any[]
              }
              className={"flex h-[300px] flex-col !overflow-hidden bg-white"}
            >
              <div className="flex flex-shrink-0 flex-col border-b border-b-gray-100 px-2 pb-1 pt-2">
                <TabList<Record<string, any>>
                  items={[
                    { id: TABS.PROVINCE, label: "Tỉnh thành" },
                    { id: TABS.DISTRICT, label: "Quận huyện" },
                    { id: TABS.WARD, label: "Phường Xã" },
                  ]}
                  className={"flex"}
                >
                  {(item) => (
                    <Tab
                      id={item.id}
                      className={({ isDisabled, isHovered, isSelected }) =>
                        cn(
                          "cursor-pointer pb-2 pr-4 text-sm outline-none",
                          isDisabled && "cursor-not-allowed opacity-50",
                          isSelected && "text-green2-500",
                        )
                      }
                    >
                      {item.label}
                    </Tab>
                  )}
                </TabList>
                <div className="relative h-5">
                  <SearchIcon size={18} className="absolute left-0 top-0 text-gray-400" />
                  <Input
                    placeholder={`Tìm kiếm...`}
                    value={keyword}
                    onInput={(e) => setKeyword(e.currentTarget.value)}
                    className={"w-full pl-6 outline-none"}
                  />
                </div>
              </div>
              <ScrollBar suppressScrollX className="min-h-0 flex-[1_1_auto] px-1">
                <TabPanel className="" id={TABS.PROVINCE}>
                  <ListBox<TProvince>
                    key={uid + String(value) + "TProvince"}
                    selectedKeys={value?.provinceCode ? new Set([value.provinceCode]) : undefined}
                    selectionMode="single"
                    selectionBehavior="replace"
                    className={"flex flex-col divide-y divide-gray-50 px-0.5 py-1"}
                    items={mappedList(getAllProvincesRes?.result || [], keyword)}
                    disabledKeys={value?.provinceCode ? new Set([value.provinceCode]) : undefined}
                    onSelectionChange={(v) => {
                      const arr = Array.from(v);
                      onChange?.({
                        provinceCode: !!arr?.[0] ? (arr[0] as string) : undefined,
                        districtCode: undefined,
                        wardCode: undefined,
                      });
                      setSelectedTab(TABS.DISTRICT);
                    }}
                  >
                    {(item) => (
                      <ListBoxItem
                        id={item.code}
                        textValue={item.fullName}
                        className={({ isSelected, isDisabled, isHovered }) =>
                          cn(
                            "flex h-10 cursor-pointer items-center rounded px-1 text-gray-600 outline-none",
                            isHovered && "bg-gray-100",
                            isSelected && "bg-gray-100 text-green2-500",
                          )
                        }
                      >
                        {({ isSelected }) => (
                          <>
                            <span>{item.fullName}</span>
                            {isSelected && (
                              <Check strokeWidth={2} className="ml-auto w-5 text-green-500" />
                            )}
                          </>
                        )}
                      </ListBoxItem>
                    )}
                  </ListBox>
                </TabPanel>

                <TabPanel className="" id={TABS.DISTRICT}>
                  <ListBox<TDistrict>
                    key={uid + String(value) + "TDistrict"}
                    selectedKeys={value?.districtCode ? new Set([value.districtCode]) : undefined}
                    disabledKeys={value?.districtCode ? new Set([value.districtCode]) : undefined}
                    selectionMode="single"
                    selectionBehavior="replace"
                    className={"flex flex-col divide-y divide-gray-50 px-0.5 py-1"}
                    items={mappedList(getAllDistrictsRes?.result || [], keyword)}
                    onSelectionChange={(v) => {
                      const arr = Array.from(v);
                      onChange?.({
                        ...value,
                        districtCode: !!arr?.[0] ? (arr[0] as string) : undefined,
                        wardCode: undefined,
                      });
                      setSelectedTab(TABS.WARD);
                    }}
                  >
                    {(item) => (
                      <ListBoxItem
                        id={item.code}
                        textValue={item.fullName}
                        className={({ isSelected, isDisabled, isHovered }) =>
                          cn(
                            "flex h-10 cursor-pointer items-center rounded px-1 text-gray-600 outline-none",
                            isHovered && "bg-gray-100",
                            isSelected && "bg-gray-100 text-green2-500",
                          )
                        }
                      >
                        {({ isSelected }) => (
                          <>
                            <span>{item.fullName}</span>
                            {isSelected && (
                              <Check strokeWidth={2} className="ml-auto w-5 text-green-500" />
                            )}
                          </>
                        )}
                      </ListBoxItem>
                    )}
                  </ListBox>
                </TabPanel>

                <TabPanel className="" id={TABS.WARD}>
                  <ListBox<TWard>
                    key={uid + String(value) + "TWard"}
                    selectedKeys={value?.wardCode ? new Set([value.wardCode]) : undefined}
                    disabledKeys={value?.wardCode ? new Set([value.wardCode]) : undefined}
                    selectionMode="single"
                    selectionBehavior="replace"
                    className={"flex flex-col divide-y divide-gray-50 px-0.5 py-1"}
                    items={mappedList(getAllWardsRes?.result || [], keyword)}
                    onSelectionChange={(v) => {
                      const arr = Array.from(v);
                      onChange?.({
                        ...value,
                        wardCode: !!arr?.[0] ? (arr[0] as string) : undefined,
                      });
                      close();
                    }}
                  >
                    {(item) => (
                      <ListBoxItem
                        id={item.code}
                        textValue={item.fullName}
                        className={({ isSelected, isDisabled, isHovered }) =>
                          cn(
                            "flex h-10 cursor-pointer items-center rounded px-1 text-gray-600 outline-none",
                            isHovered && "bg-gray-100",
                            isSelected && "bg-gray-100 text-green2-500",
                          )
                        }
                      >
                        {({ isSelected }) => (
                          <>
                            <span>{item.fullName}</span>
                            {isSelected && (
                              <Check strokeWidth={2} className="ml-auto w-5 text-green-500" />
                            )}
                          </>
                        )}
                      </ListBoxItem>
                    )}
                  </ListBox>
                </TabPanel>
              </ScrollBar>
            </Tabs>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

type TAddressSelectsFieldProps = TAddressSelectsProps & {
  label?: React.ReactNode;
  isError?: boolean;
  errorMessage?: React.ReactNode;
  required?: boolean;
  classNameWrapper?: TClassValue;
};
export const AddressSelectsField = ({
  label,
  errorMessage,
  isError,
  required,
  classNameWrapper,
  ...selectProps
}: TAddressSelectsFieldProps) => {
  return (
    <div className={cn("flex flex-col", classNameWrapper)}>
      {!!label && (
        <Label className="mb-[3px] flex items-center pl-0.5 text-xs text-gray-500">
          {label}:{required && <span className="ml-0.5">*</span>}
        </Label>
      )}
      <AddressSelects isError={isError} {...selectProps} />
      {isError ? (
        <p className="mt-0.5 line-clamp-1 h-4 text-xs text-red-500">{errorMessage}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddressSelects;
