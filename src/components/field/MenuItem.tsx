import { Item } from "react-aria-components";

function MenuItem(props: any) {
  return (
    <Item
      {...props}
      className={({ isFocused }) => `
      group flex w-full cursor-default items-center rounded-md px-3 py-2 outline-none sm:text-sm
      ${isFocused ? "bg-primary-50 text-white" : "text-gray-900"}
    `}
    />
  );
}

export default MenuItem;
