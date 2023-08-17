import Image from "next/image";
import "react-dropdown/style.css";
import { MdLocationOn, MdStar } from "react-icons/md";
import {
  ShopChat,
  ShopFollow,
  ShopFollowers,
  ShopIcon,
  ShopLikes,
  ShopParticipated,
  ShopProducts,
  ShopRemark,
  ShopSold,
} from "src/components/icons";
import ShopBackground from "src/components/images/ShopBackground.png";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import ShoppingHeader from "src/components/pages/ShoppingHeader";
import { useGetItemsByUserQuery } from "src/redux/query/item.query";
function Stores() {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery({
    search: "name",
    id: 2,
  });

  const items = userData?.result.data;
  console.log(items);
  const provinces = (items || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);

  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className="flex flex-col gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <ShoppingHeader />

          <div className=" bg-white px-5 pb-5 text-primary-350">
            <Image
              className="w-screen bg-white object-cover pb-4"
              src={ShopBackground}
              alt="shop background"
            />
            <div className="flex flex-col md:flex-row md:justify-start ">
              <div className="flex items-start justify-start">
                <ShopIcon className="h-12 w-12 xl:h-[70px] xl:w-[70px]" />
                <div className="mt-4 border-primary-350 pl-[9px] pr-[16px]  md:border-r-2">
                  <div className="text-start font-semibold">Miracles Shop</div>
                  <div className="text-start text-[10px] ">Online</div>
                  <div className="flex justify-between gap-2">
                    <div className="flex cursor-pointer items-center justify-start gap-0 rounded-[5px] border-2 border-primary-50 px-2 py-1 text-[10px] text-primary-50  xl:gap-1 xl:text-xs">
                      <ShopChat className=" h-5 w-5 xl:h-6 xl:w-6" />
                      Chat Ngay
                    </div>
                    <div className="flex cursor-pointer items-center justify-between gap-0 rounded-[5px] border-2 border-primary-350 px-2 py-1 text-[10px] text-primary-350  xl:gap-1 xl:text-xs">
                      <ShopFollow className="h-3 w-3 xl:h-4 xl:w-4" />
                      Theo dõi shop
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:text-md  mt-3 flex min-w-fit items-center justify-between gap-2 text-start text-[10px] sm:text-xs  md:pl-5 lg:pl-1 lg:text-[10px] xl:gap-4 xl:pl-5  xl:text-xs">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-start">
                    <ShopProducts className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Sản phẩm : 150
                  </div>
                  <div className="flex items-center justify-start">
                    <ShopLikes className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Lượt thích : 2k
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-start">
                    <ShopSold className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Đã bán : 5.5k
                  </div>
                  <div className="flex items-center justify-start">
                    <ShopFollowers className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Người theo dõi : 3k
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-start">
                    <ShopRemark className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Đánh giá : 4.8 (400 Đánh giá)
                  </div>
                  <div className="flex items-center justify-start">
                    <ShopParticipated className="h-[14px] w-[14px] xl:h-5 xl:w-5" />
                    Tham gia : 11 Tháng trước
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start pt-8 text-start text-xs lg:text-base">
              <div>Chào mừng đến với Miracles Shop</div>
              <div>Hotline: 0985458225</div>
              <div>Địa chỉ: Số 8 Phạm Hùng, Phường Mễ trì, Quận Nam từ liêm, Hà nội.</div>
            </div>
          </div>
          <div className=" bg-white px-5 py-6">
            <div className="pb-5 text-start text-2xl font-semibold text-primary-50">
              Tất cả sản phẩm
            </div>
            <div className="grid grid-cols-2  gap-4 text-start md:grid-cols-3 lg:grid-cols-5  lg:gap-2 xl:gap-4">
              {!!items &&
                items?.map((item: any, index) => {
                  return (
                    <div
                      key={item.id}
                      className="relative cursor-pointer rounded-xl bg-primary-250 p-2 "
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
                      <div className="line-clamp-2 pt-2 text-lg font-semibold text-primary-150 lg:text-xs">
                        {item.name}
                      </div>
                      <div className="grid grid-cols-1 items-center sm:flex sm:justify-between ">
                        <div className="flex items-center justify-between ">
                          <div className="my-1 flex items-center rounded bg-gradient-to-r from-primary-1500 to-primary-1600 px-1 text-lg text-white lg:h-4 lg:text-[10px] xl:px-2 xl:text-xs">
                            {item.minPrice}đ
                          </div>
                        </div>
                        <div className=" text-lg text-primary-150 line-through lg:text-[10px] xl:text-xs">
                          {item.maxPrice}đ
                        </div>
                      </div>
                      <div className="flex justify-between text-xl text-yellow-400 ">
                        <div className="flex items-center justify-between">
                          <MdStar className="h-[14px] w-[14px] lg:h-3.5 lg:w-3.5" />
                          <p className="text-base text-primary-50 lg:text-xs">
                            {item.ratePoint}{" "}
                            <span className="text-primary-150">({item.countRate})</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <MdLocationOn className="h-[14px] w-[14px] lg:h-3.5 lg:w-3.5" />
                          <p className="text-base text-primary-150 lg:text-xs">
                            {provinceName[index]}
                          </p>
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

export default Stores;
