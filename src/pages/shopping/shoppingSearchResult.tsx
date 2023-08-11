import "react-dropdown/style.css";
import { MdLocationOn, MdStar } from "react-icons/md";
import Button from "src/components/button/Button";
import FilterProducts from "src/components/field/FilterProducts";
import FilterSearch from "src/components/field/FilterSearch";
import InputSearchBar from "src/components/field/InputSearchBar";
import MenuDropdown from "src/components/field/MenuDropdown";
import { QrCode, ShoppingCart } from "src/components/icons";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import {
  useGetAllItemsQuery,
  useGetItemsByUserQuery,
  useGetItemsQuery,
} from "src/redux/query/item.query";

function ShoppingSearchResult() {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery();
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();

  const items = userData?.result.data;

  const provinces = (items || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);
  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className=" gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <div className="mb-2   bg-white  px-5 pb-4 pt-12">
            <div className="flex justify-between">
              <div className="flex items-center justify-center">
                <div className="block lg:hidden">
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
          </div>
          <div className="mb-2 flex items-center justify-between bg-white px-5 pb-4 pt-2  text-xl font-semibold text-primary-350">
            <FilterProducts />
            <FilterSearch />
          </div>
          <div className="mb-2 bg-white px-5 pb-4 pt-2  text-xl font-semibold text-primary-350">
            <div className="grid grid-cols-2  gap-4 text-start md:grid-cols-3 lg:grid-cols-5  lg:gap-2 xl:gap-4">
              {!!items &&
                items?.map((item: any, index) => {
                  return (
                    <div
                      key={item.id}
                      className="relative cursor-pointer rounded-3xl bg-primary-250 p-2 "
                    >
                      <img
                        src={`${item.imageUrlList[0]}`}
                        className="aspect-square w-full rounded-lg bg-contain object-cover "
                        alt="image"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                        }}
                      />
                      <div className="line-clamp-2 overflow-hidden pb-2 pt-2 text-xl font-semibold text-primary-150 lg:text-base">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center justify-between ">
                          <p className="my-1 flex h-4  items-center rounded-md bg-gradient-to-r from-primary-1500 to-primary-1600 px-1 text-[10px] text-white xl:px-3">
                            {item.minPrice}đ
                          </p>
                        </div>
                        <div className="flex h-4 items-center text-[10px] text-primary-150 line-through">
                          <p>{item.maxPrice}đ</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-xl text-yellow-400 ">
                        <div className="flex items-center justify-start">
                          <MdStar size={14} />
                          <p className="text-xs text-primary-50">
                            {item.ratePoint}{" "}
                            <span className="text-primary-150">({item.countRate})</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-start">
                          <MdLocationOn size={14} />
                          <p className="text-xs text-primary-150">{provinceName[index]}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <RightTaskbar />
      </div>
    </>
  );
}

export default ShoppingSearchResult;
