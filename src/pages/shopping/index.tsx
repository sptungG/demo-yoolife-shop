// rfce
import Image from "next/image";
import "react-dropdown/style.css";
import ListProducts from "src/components/field/ListItems/ListProducts";
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
  SecureDevice,
  Sensor,
  SmartDevice,
  SmartLock,
} from "src/components/icons";
import hotdeal from "src/components/images/hotdeal.png";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import ShoppingHeader from "src/components/pages/ShoppingHeader";
import {
  useGetAllItemsQuery,
  useGetItemsByUserQuery,
  useGetItemsQuery,
} from "src/redux/query/item.query";
function ShoppingPage() {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery({});
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();

  console.log(userData);
  console.log(userCategory);
  console.log(userAllItems);

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
  console.log(otherItems);
  console.log(elecDevice);
  console.log(smartDevice);
  console.log(topSearch);
  function handleSearchSuccess() {}
  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className=" gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <ShoppingHeader />

          <Image className="w-screen bg-white object-cover px-5 py-3" src={hotdeal} alt="hotdeal" />

          <div className="mb-2 grid grid-cols-1 gap-4 bg-white px-5 pb-6 pt-3 text-primary-150 md:grid-cols-7 ">
            <div
              className="col-span-3 grid   grid-flow-row
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
            <div className="col-span-4 grid grid-cols-5 gap-4 bg-white">
              <div className="col-span-2">
                <ListProducts />
              </div>
              <div className=" col-span-3 rounded-e-lg bg-primary-170 py-2 pl-6">
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-3.5 before:h-1 before:w-1 before:rounded before:bg-primary-150  lg:text-xs lg:before:-left-3 lg:before:top-3 xl:py-2 xl:before:-left-3 xl:before:top-4">
                    Thiết bị thường
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-[2px] xl:gap-2">
                    <div className="lg:text-[10px] xl:text-xs ">Đèn chùm</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn downlight</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn bàn</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn thả</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn spotlight</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn tường</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn trần</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn thanh nhôm</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn tranh</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn cây nội thất</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn ray nam châm</div>
                  </div>
                </div>
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-3.5 before:h-1 before:w-1 before:rounded before:bg-primary-150  lg:text-xs lg:before:-left-3 lg:before:top-3 xl:py-2 xl:before:-left-3 xl:before:top-4">
                    Công tắc
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-[2px] xl:gap-2">
                    <div className="lg:text-[10px] xl:text-xs ">Đèn tường</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn trần</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn thanh nhôm</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn tranh</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn cây nội thất</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn ray nam châm</div>
                  </div>
                </div>
                <div className="relative text-start">
                  <div className="relative py-1 before:absolute before:-left-3 before:top-3.5 before:h-1 before:w-1 before:rounded before:bg-primary-150  lg:text-xs lg:before:-left-3 lg:before:top-3 xl:py-2 xl:before:-left-3 xl:before:top-4">
                    Ổ cắm
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-[2px] xl:gap-2 ">
                    <div className="lg:text-[10px] xl:text-xs ">Đèn tranh</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn cây nội thất</div>
                    <div className="lg:text-[10px] xl:text-xs ">Đèn ray nam châm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-2 pb-20 text-left text-2xl text-primary-50 sm:px-5">
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
