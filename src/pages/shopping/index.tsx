// rfce
import Image from "next/image";
import "react-dropdown/style.css";
import Button from "src/components/button/Button";
import InputSearchBar from "src/components/field/InputSearchBar";
import ListProducts from "src/components/field/ListItems/ListProducts";
import MenuDropdown from "src/components/field/MenuDropdown";
import ListUserProducts from "src/components/field/UserProducts/ListUserProducts";
import ListUserProducts1 from "src/components/field/UserProducts/ListUserProducts1";
import ListUserProducts2 from "src/components/field/UserProducts/ListUserProducts2";
import ListUserProducts3 from "src/components/field/UserProducts/ListUserProducts3";
import {
  AirDevice,
  Decor,
  ElecDevice,
  HouseHold,
  ImageBell,
  QrCode,
  SecureDevice,
  Sensor,
  ShoppingCart,
  SmartDevice,
  SmartLock,
} from "src/components/icons";
import hotdeal from "src/components/images/hotdeal.png";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import {
  useGetAllItemsQuery,
  useGetItemsByUserQuery,
  useGetItemsQuery,
} from "src/redux/query/item.query";
// import { Items } from "src/types/item.types";
// import { useGetAllTenantNameQuery } from "src/redux/query/auth.query";
function ShoppingPage() {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery();
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();

  console.log(userData);
  console.log(userCategory);
  console.log(userAllItems);

  // console.log(data?.result);

  // const items = data?.result?.data;
  // console.log(items);
  // const userDataItems = userData?.result.data;
  // const userCategories = userCategory?.result.data;

  const elecDevice = (userCategory?.result.data || []).filter(
    (item: any) => item.name === "Thiết bị điện",
  );
  const smartDevice = (userCategory?.result.data || []).filter(
    (item: any) => item.name === "Thiết bị thông minh",
  );
  const topSearch = (userCategory?.result.data || []).filter(
    (item: any) => item.name === "Thiết bị thông minh",
  );
  const otherItems = userCategory?.result.data || [];
  // console.log(items);
  //console.log(elecDevice[0].id)
  //const categories = (userCategory?.result.data || []).filter((item: any) => item.parentId === elecDevice[0].id);
  // console.log(categories)

  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className=" gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <div className="mb-2  flex justify-between bg-white  px-5 pb-4 pt-12">
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

          <Image className="w-screen bg-white object-cover px-5 py-3" src={hotdeal} alt="hotdeal" />

          <div className="mb-2 grid grid-cols-3 gap-4 bg-white px-5 pb-6 pt-3 text-primary-150">
            <div
              className="grid grid-flow-row
             grid-cols-3 gap-4 rounded-3xl bg-white"
            >
              <ElecDevice className="object-contain" />
              <SecureDevice className="object-contain" />
              <Sensor className="object-contain" />
              <SmartLock className="object-contain" />
              <SmartDevice className="object-contain" /> <Decor className="object-contain" />
              <HouseHold className="object-contain" /> <AirDevice className="object-contain" />
              <ImageBell className="object-contain" />
            </div>
            <div className="col-span-2 grid grid-cols-5 gap-4 bg-white">
              <div className="col-span-2">
                <ListProducts />
              </div>
              <div className=" col-span-3 bg-primary-250 py-2 pl-6">
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-4 before:h-1 before:w-1 before:rounded before:bg-primary-150 xl:py-2">
                    Thiết bị thường
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-sm  xl:gap-4">
                    <div>Đèn chùm</div>
                    <div>Đèn downlight</div>
                    <div>Đèn bàn</div>
                    <div>Đèn thả</div>
                    <div>Đèn spotlight</div>
                    <div>Đèn tường</div>
                    <div>Đèn trần</div>
                    <div>Đèn thanh nhôm</div>
                    <div>Đèn tranh</div>
                    <div>Đèn cây nội thất</div>
                    <div>Đèn ray nam châm</div>
                  </div>
                </div>
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-4 before:h-1 before:w-1 before:rounded before:bg-primary-150 xl:py-2">
                    Công tắc
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm  xl:gap-4">
                    <div>Đèn tường</div>
                    <div>Đèn trần</div>
                    <div>Đèn thanh nhôm</div>
                    <div>Đèn tranh</div>
                    <div>Đèn cây nội thất</div>
                    <div>Đèn ray nam châm</div>
                  </div>
                </div>
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-4 before:h-1 before:w-1 before:rounded before:bg-primary-150 xl:py-2">
                    Ổ cắm
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm xl:gap-4">
                    <div>Đèn tranh</div>
                    <div>Đèn cây nội thất</div>
                    <div>Đèn ray nam châm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-5 pb-20 text-left text-2xl text-primary-50">
            <ListUserProducts1
              id={smartDevice[0]?.id}
              title="Flash Sale 50%, Thiết bị thông minh"
            />
            <ListUserProducts2 id={elecDevice[0]?.id} title="Top Sản phẩm Thiết bị điện" />
            <ListUserProducts3 id={topSearch[0]?.id} title="Top sản phẩm tìm kiếm" />
            <ListUserProducts1
              id={smartDevice[0]?.id}
              title="Flash Sale 50%, Thiết bị thông minh"
            />
            <ListUserProducts id={otherItems[0]?.id} title="Khám phá những sản phẩm khác" />
          </div>
        </div>
        <RightTaskbar />
      </div>
    </>
  );
}

export default ShoppingPage;
