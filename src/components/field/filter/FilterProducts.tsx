import { JSX, RefAttributes } from "react";
import {
  Button,
  Item,
  ListBox,
  Popover,
  Select,
  SelectValue,
  Tab,
  TabList,
  TabProps,
  Tabs,
} from "react-aria-components";
import { MdArrowBackIos } from "react-icons/md";
function FilterProducts() {
  return (
    <div className="flex flex-row items-center">
      <Tabs className="flex w-full justify-between">
        <TabList className="flex w-full items-center gap-3  ">
          <MyHeadertab className="">Sắp xếp theo</MyHeadertab>
          <MyTab id="suitable" className="">
            Phù hợp nhất
          </MyTab>
          <MyTab id="newest" className="">
            Mới nhất
          </MyTab>
          <MyTab id="hotest" className="">
            Bán chạy
          </MyTab>
        </TabList>
      </Tabs>
      <SelectExample />
    </div>
  );
}

function SelectExample() {
  return (
    <div className=" hidden w-48 justify-center rounded-md lg:flex  ">
      <Select className="flex flex-col gap-1">
        <Button className="relative flex cursor-pointer gap-1 rounded-lg bg-primary-250 py-2  pl-3 pr-2 text-center text-primary-350 outline-none   sm:text-sm">
          <SelectValue />
          <MdArrowBackIos className="h-4 w-4 -rotate-90 text-gray-500 " aria-hidden="true" />
        </Button>
        <Popover className="max-h-60 w-40 cursor-pointer overflow-auto rounded-md bg-white text-base font-semibold sm:text-sm">
          <ListBox className="p-1 font-semibold outline-none">
            <ListBoxItem>Phù hợp nhất</ListBoxItem>
            <ListBoxItem>Mới nhất</ListBoxItem>
            <ListBoxItem>Bán chạy</ListBoxItem>
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}

function ListBoxItem(props: any) {
  return (
    <Item
      {...props}
      textValue={props.children}
      className={({ isFocused }) => `
        group relative cursor-default select-none rounded py-2 pl-10 pr-4 outline-none
        ${isFocused ? "bg-primary-160 text-white" : "text-primary-350"}
      `}
    >
      {({ isSelected }) => (
        <>
          <span className={`block  ${isSelected ? "font-bold" : "font-normal"}`}>
            {props.children}
          </span>
          {isSelected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[--focus-bg] text-primary-150 group-data-[focused]:bg-primary-450 group-data-[focused]:text-white">
              <MdArrowBackIos className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Item>
  );
}

function MyTab(props: JSX.IntrinsicAttributes & TabProps & RefAttributes<HTMLDivElement>) {
  return (
    <Tab
      {...props}
      className={({ isSelected, isFocusVisible }) => `
      m-0 cursor-pointer rounded  px-3 py-2.5  text-sm font-bold leading-4 outline-none transition-colors  xl:px-8
        ${isFocusVisible ? "" : ""}
        ${
          isSelected
            ? "bg-primary-160 text-white"
            : "bg-primary-250 text-primary-350 data-[hovered]:bg-primary-160 data-[pressed]:bg-primary-160 data-[hovered]:text-white data-[pressed]:text-white"
        }
      `}
    />
  );
}
function MyHeadertab(props: JSX.IntrinsicAttributes & TabProps & RefAttributes<HTMLDivElement>) {
  return (
    <Tab
      {...props}
      className="m-0 flex cursor-pointer items-center justify-start text-sm text-primary-450 outline-none xl:text-base"
    />
  );
}

export default FilterProducts;
