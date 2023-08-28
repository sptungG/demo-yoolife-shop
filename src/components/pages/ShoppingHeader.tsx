import { useRouter } from "next/router";
import { useState } from "react";
import "react-dropdown/style.css";
import Button from "src/components/button/Button";
import InputSearchBar from "src/components/field/InputSearchBar";
import MenuDropdown from "src/components/field/dropdown/MenuDropdown";
import { QrCode, ShoppingCart } from "src/components/icons";
import { useGetItemsByUserQuery } from "src/redux/query/item.query";

// function ShoppingHeader({ onSearchSuccess }: { onSearchSuccess: any }) {
function ShoppingHeader() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery({
    search: `${q}`,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.replace(`/shopping/ShoppingSearchResult?search=${q}`);
    console.log(q);
    console.log(userData);
    const items = userData?.result.data;
    console.log(items);
    const provinces = (items || []).map((item: any) => JSON.parse(item.address));
    const provinceName = provinces.map((item) => item.ProvinceName);
  };
  return (
    <div className="mb-2 flex w-full bg-white  px-5 pb-4 pt-12">
      <div className="mr-1 cursor-pointer rounded bg-primary-250 lg:hidden">
        <MenuDropdown />
      </div>

      <div className="flex grow">
        <form onSubmit={(e) => handleSubmit(e)} className="flex w-full grow items-center ">
          <InputSearchBar
            className="rounded-full bg-primary-250 px-10 py-2.5 text-base xl:text-lg"
            placeholder="Tìm kiếm sản phẩm bạn muốn?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button
            type="submit"
            className="ml-3 hidden cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-primary-1500 to-primary-1600 px-5 text-white md:block "
          >
            <div className="px-0 py-2.5 text-base xl:text-lg">Tìm kiếm</div>
          </Button>
        </form>
      </div>

      <div className="flex items-center justify-start gap-1 text-base text-primary-350 xl:text-xl 2xl:gap-4 ">
        <div className="relative flex cursor-pointer items-center justify-start gap-1 bg-white p-2.5 after:absolute after:right-2 after:top-3 after:z-10 after:flex after:h-3 after:w-3 after:items-center after:justify-center after:rounded-full after:bg-red-500 after:text-[8px] after:text-white after:content-['25'] xl:gap-6 xl:after:top-2 xl:after:h-4 xl:after:w-4 xl:after:text-[10px]">
          <div className="hidden items-center  pb-1 text-base sm:block xl:text-lg">Giỏ hàng</div>
          <ShoppingCart className="h-4 w-4 xl:h-6 xl:w-6 " />
        </div>
        <div className="flex cursor-pointer items-center justify-start gap-1 bg-white p-2.5 xl:gap-3">
          <div className="hidden items-center  pb-1 text-base sm:block xl:text-lg ">Danh mục</div>
          <QrCode className="h-4 w-4 xl:h-6 xl:w-6" />
        </div>
      </div>
    </div>
  );
}

export default ShoppingHeader;
