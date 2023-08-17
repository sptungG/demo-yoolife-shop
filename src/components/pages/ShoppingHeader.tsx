import "react-dropdown/style.css";
import Button from "src/components/button/Button";
import InputSearchBar from "src/components/field/InputSearchBar";
import MenuDropdown from "src/components/field/dropdown/MenuDropdown";
import { QrCode, ShoppingCart } from "src/components/icons";
function ShoppingHeader() {
  return (
    <div className="mb-2  flex justify-between bg-white  px-5 pb-4 pt-12">
      <div className="flex items-center justify-center">
        <div className="mr-1 block cursor-pointer rounded bg-primary-250 lg:hidden">
          <MenuDropdown />
        </div>

        <div className="flex w-full items-center justify-end">
          <InputSearchBar
            className=" rounded-full bg-primary-250 px-10 py-2.5 text-xl md:w-256 lg:w-48 xl:w-80 2xl:w-256"
            placeholder="Tìm kiếm sản phẩm bạn muốn?"
          />
          <Button className="ml-3 hidden h-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-primary-1500 to-primary-1600 px-5 text-white lg:block">
            <div className="p-2.5 text-lg">Tìm kiếm</div>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-start gap-1 text-xl text-primary-350 2xl:gap-4 ">
        <div className="relative flex h-12 cursor-pointer items-center justify-between gap-0 bg-white p-2.5 after:absolute after:right-2 after:top-2 after:z-10 after:h-4 after:w-4 after:rounded-full after:bg-red-500 after:text-xs after:text-white after:content-['25'] xl:gap-6">
          <div className=" hidden items-center justify-center pb-1  lg:block">Giỏ hàng</div>
          <ShoppingCart className="h-6 w-6 " />
        </div>
        <div className="flex h-12 cursor-pointer items-center justify-between gap-0 bg-white p-2.5 xl:gap-3">
          <div className=" hidden items-center justify-center pb-1 lg:block">Danh mục</div>
          <QrCode className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default ShoppingHeader;
