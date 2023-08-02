import { Collection, Header, Section } from "react-aria-components";
import { ListItem } from "src/components/icons";

function ProductSection({
  title,
  children,
  items,
}: {
  title?: string;
  children?: any;
  items?: any;
}) {
  return (
    <Section>
      <Header className="sticky top-0 z-10 flex bg-gradient-to-r from-primary-1500 to-primary-1600  text-lg font-semibold text-white">
        <div className="flex items-center justify-around px-4 py-3">
          <ListItem className="mr-2 h-6 w-6" />
          <div className="text-sm ">Danh mục sản phẩm</div>
        </div>
      </Header>
      <Collection items={items}>{children}</Collection>
    </Section>
  );
}

export default ProductSection;
