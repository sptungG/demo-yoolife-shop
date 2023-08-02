import { Item } from "react-aria-components";
function Products({ id, name }: { id: any; name: any }) {
  return (
    <Item
      id={id}
      textValue={name}
      className="bottom-5 before:absolute before:left-4 before:h-1 before:w-1 before:rounded before:bg-primary-150 group peer relative  mb-1  flex cursor-default items-center justify-start gap-x-3 rounded bg-primary-250 px-8 py-4 text-sm text-primary-150 outline-none  aria-selected:bg-primary-1500 before:aria-selected:bg-white aria-selected:text-white "
    >
      <div className="text-sm">
        {name}
      </div>
    </Item>
  );
}

export default Products;
