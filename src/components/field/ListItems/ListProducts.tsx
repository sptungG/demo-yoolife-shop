import { forwardRef } from "react";
import { ListBox } from "react-aria-components";
import { useGetItemsQuery } from "src/redux/query/item.query";
import ProductSection from "./ProductSection";
import Products from "./Products";
function ListProducts() {
  const { data, isLoading } = useGetItemsQuery();
  const items = data?.result?.data;
  return (
    <div className="flex w-full justify-end rounded-l-lg text-sm">
      <ListBox
        aria-label="Productss"
        selectionMode="multiple"
        selectionBehavior="replace"
        className="flex h-96 w-72 flex-col gap-2 overflow-auto rounded-lg bg-white text-gray-700 shadow outline-none"
      >
        <ProductSection title="">
          {!!items &&
            items.map((item) => {
              return <Products key={item.id} id={item.id} name={item.name} />;
            })}

          {/* <Products id="arelene" name="Điện thông minh" />
          <Products id="tom" name="Thiết bị an ninh" />
          <Products id="dade" name="Chuông hình" />
          <Products id="irelene" name="Đồng hồ đo lường" />
          <Products id="tamh" name="Đồng hồ đo lường" />
          <Products id="kade" name="Chuông hình" />
          <Products id="karelene" name="Thiết bị điện" />
          <Products id="tomixiaomi" name="Thiết bị điện" />
          <Products id="wade1" name="Thiết bị điện" />
          <Products id="arelene1" name="Điện thông minh" />
          <Products id="tom1" name="Thiết bị an ninh" />
          <Products id="dade1" name="Chuông hình" />
          <Products id="irelene1" name="Đồng hồ đo lường" />
          <Products id="tamh1" name="Đồng hồ đo lường" /> */}
        </ProductSection>
      </ListBox>
    </div>
  );
}

export default forwardRef(ListProducts);
