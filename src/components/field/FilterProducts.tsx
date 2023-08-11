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
  TabPanel,
  TabPanelProps,
  TabProps,
  Tabs,
} from "react-aria-components";
import { MdArrowBackIos } from "react-icons/md";
function FilterProducts() {
  return (
    <div className="flex flex-row items-center">
      <Tabs className="flex w-full justify-between">
        <TabList className="flex w-full items-center gap-3 space-x-1 ">
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

        {/* <MyTabPanel className="" id="suitable">
          <div className="relative flex items-center justify-between">
            <div className="w-28">Phù hợp nhất</div>
            <MdArrowBackIos className="absolute right-[-10px] top-[2px] w-6 -rotate-90 " />
          </div>
        </MyTabPanel>
        <MyTabPanel className="" id="newest">
          <div className="relative flex items-center justify-between">
            <div className="w-20">Mới nhất</div>
            <MdArrowBackIos className="absolute right-[-10px] top-[2px] w-6 -rotate-90 " />
          </div>
        </MyTabPanel>
        <MyTabPanel className="" id="hotest">
          <div className="relative flex items-center justify-between">
            <div className="w-20">Bán chạy</div>
            <MdArrowBackIos className="absolute right-[-10px] top-[2px] w-6 -rotate-90 " />
          </div>
        </MyTabPanel> */}
      </Tabs>
      <SelectExample />
    </div>
  );
}

function SelectExample() {
  return (
    <div className=" hidden w-48 justify-center rounded-md lg:flex  ">
      <Select className="flex flex-col gap-1">
        <Button className="relative flex cursor-default rounded-lg bg-primary-250 py-2 pl-3 pr-2 text-center text-primary-350 outline-none  sm:text-sm">
          <SelectValue />
          <MdArrowBackIos className="h-4 w-4 -rotate-90 text-gray-500" aria-hidden="true" />
        </Button>
        <Popover className="max-h-60 w-40 overflow-auto rounded-md bg-white text-base sm:text-sm">
          <ListBox className="p-1 outline-none">
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
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[--focus-bg] text-primary-150 group-data-[focused]:text-white">
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
      m-0 cursor-pointer rounded bg-primary-250 px-3 py-2.5  text-sm font-bold leading-4 text-primary-350  focus:bg-primary-160 active:bg-primary-160 xl:px-8   
          ${isSelected ? "bg-primary-160 text-white outline-none" : ""}
          ${isFocusVisible ? "bg-blue-300" : ""}
        `}
    />
  );
}
function MyHeadertab(props: JSX.IntrinsicAttributes & TabProps & RefAttributes<HTMLDivElement>) {
  return (
    <Tab
      {...props}
      className="m-0 flex cursor-pointer items-center justify-start text-sm text-primary-450 outline-none xl:text-xl"
    />
  );
}

function MyTabPanel(
  props: JSX.IntrinsicAttributes & TabPanelProps & RefAttributes<HTMLDivElement>,
) {
  return (
    <TabPanel
      {...props}
      className="relative ml-5 hidden cursor-pointer items-center justify-start rounded bg-primary-250 px-3 py-1.5 text-base text-sm font-bold text-primary-350 lg:flex"
    />
  );
}

export default FilterProducts;
