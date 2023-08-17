import { Item } from "react-aria-components";
function Products({ id, name }: { id: any; name: any }) {
  return (
    <Item
      id={id}
      textValue={name}
      className="group peer relative bottom-5 mb-1 flex cursor-default items-center justify-start gap-x-3  rounded  bg-primary-170 px-8 py-4 text-sm text-primary-150 outline-none before:absolute before:left-4 before:h-1 before:w-1 before:rounded before:bg-primary-150  aria-selected:bg-primary-1500 aria-selected:text-white before:aria-selected:bg-white "
    >
      <div className="text-xs">{name}</div>
    </Item>
  );
}

export default Products;
