import { useRouter } from "next/router";
import "react-dropdown/style.css";
import { Ex1, Ex2, Ex3, Ex4, Trash } from "src/components/icons";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import ShoppingHeader from "src/components/pages/ShoppingHeader";

function ShoppingSearch() {
  const router = useRouter();
  function HandleSearchSuccess() {
    router.replace(`/shopping/ShoppingSearchResult`);
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className=" gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <div>
            <ShoppingHeader />
            <div className="-mt-2 mb-2 overflow-auto   text-primary-350">
              <div className="min-w-full bg-white px-5 ">
                <div className="flex gap-4 overflow-x-auto text-sm">
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Công tắc Legrand
                    </div>
                  </div>
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Camera AI Bkav
                    </div>
                  </div>
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Bộ điều khiển TV
                    </div>
                  </div>
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Công tắc đôi Schneider
                    </div>
                  </div>
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Thiết bị thông minh Smart Home
                    </div>
                  </div>
                  <div className="my-2 flex-none cursor-pointer border-r-2 border-primary-350 pr-2.5">
                    <div className="flex flex-col items-center justify-center gap-3 font-semibold lg:text-lg">
                      Bộ điều khiển Ánh sáng
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2 bg-white px-5 pb-4 pt-2  text-lg font-semibold text-primary-350">
            <div className="flex justify-between">
              <div>Lịch sử tìm kiếm</div>
              <div className="flex cursor-pointer justify-between">
                <p>Xóa tất cả</p> <Trash className="h-8 w-8 ps-2" />
              </div>
            </div>
            <div className="mb-2 overflow-auto  text-primary-350">
              <div className="min-w-lg bg-white ">
                <div className="flex gap-2 overflow-x-auto text-sm">
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Ổ cắm đơn 2 chấu
                    </div>
                  </div>
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Deco phòng khách
                    </div>
                  </div>
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Chuông cửa thông minh
                    </div>
                  </div>
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Balo Da chất lượng cao
                    </div>
                  </div>
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Tai nghe thông minh
                    </div>
                  </div>
                  <div className="flex-none cursor-pointer px-3.5 py-2 ">
                    <div className="flex flex-col items-center justify-center gap-3">
                      Zắc kết nối tai nghe
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 xl:gap-6">
              <div className="rounded bg-gradient-to-b from-primary-460 to-white px-2 py-4 text-start text-primary-350">
                <div className="pb-3 text-base text-primary-450">Ẩm thực nổi bật</div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex1 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">
                      Thịt trâu gác bếp tây bắc Hoa Ban food
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex1 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">
                      Thịt dê núi Ninh Bình Đặc sản rừng núi
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex1 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">Chân giò Lã vọng Đặc sản Tây bắc</p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex1 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">Thịt lợn gác bếp Đặc sản Tây ninh</p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex1 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">Combo Hải sản 4 người Hải sản tươi</p>
                  </li>
                </ul>
              </div>
              <div className="rounded bg-gradient-to-b from-primary-470 to-white px-2 py-4 text-start text-primary-350">
                <div className="pb-3 text-base text-primary-450">Sản phẩm đề xuất</div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex2 className="col-span-1" />
                    <p className="col-span-2 line-clamp-3">
                      Tú đựng cơm văn phòng nhỏ nhắn tiện dụng
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex2 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Đèn bàn học HY2266 Bóng LED Chống Cận Bảo Vệ Mắt
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex2 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Đèn treo trang trí phòng ngủ, học, phòng khách
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex2 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Đèn trần phòng khách Macaron Hiện Đại Bắc Âu Đèn led
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex2 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Máy hút bụi giường nệm diệt khuẩn UV thế hệ mới
                    </p>
                  </li>
                </ul>
              </div>
              <div className="rounded bg-gradient-to-b from-primary-480 to-white px-2 py-4 text-start text-primary-350">
                <div className="pb-3 text-base text-primary-450">Thiết bị thông minh</div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex3 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">Thiết bị định vị thông minh Xiaomi</p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex3 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Thiết bị định vị thông minh chống thất lạc cho trẻ em
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex3 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Công tắc thông minh điều khiển hai chiều được sản xuât tại nhật
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex3 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Bộ smart home cơ bản AQARA STARTER KIT
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex3 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Camera an ninh thông minh có kết nối Wifi
                    </p>
                  </li>
                </ul>
              </div>
              <div className="rounded bg-gradient-to-b from-primary-490 to-white px-2 py-4 text-start text-primary-350">
                <div className="pb-3 text-base text-primary-450">Set quà tặng nổi bật</div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex4 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      {" "}
                      Hộp quà tặng Saffron Nhụy Hoa Nghệ Tây Jahan
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex4 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Set quà tặng mẹ Saffron ngâm mật ong 130gr
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex4 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Set quà Saffron ngâm mật ong 130gr thương hiệu Saffron
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex4 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Hộp Quà Trà Hoa Sấy Lạnh Enjoy Tea, Quà Tặng Sức Khỏe
                    </p>
                  </li>
                  <li className="flex cursor-pointer flex-col md:grid md:grid-cols-3 md:gap-3">
                    <Ex4 className="col-span-1" />

                    <p className="col-span-2 line-clamp-3">
                      Set quà tặng Nhụy Hoa Nghệ Tây Saffron Jahan
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <RightTaskbar />
      </div>
    </>
  );
}

export default ShoppingSearch;
