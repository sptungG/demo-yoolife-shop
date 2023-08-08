// rfce
import Image from "next/image";
import "react-dropdown/style.css";
import { MdLocationOn, MdStar } from "react-icons/md";
import InputSearchBar from "src/components/field/InputSearchBar";
import MenuDropdown from "src/components/field/MenuDropdown";
import PopoverNotification from "src/components/field/PopoverNotification";
import {
  Chat,
  Craft,
  DropDown,
  Education,
  Entertainment,
  Fix,
  Flashsales1,
  Flashsales2,
  Food,
  Global,
  Healthcare,
  Job,
  MapLocation,
  Medical,
  Research,
  Resident,
  Service,
  Shopping,
  Sports,
  Top2,
  Tops1,
  Tops2,
  Tourism,
  Traffic,
  UserIcon,
} from "src/components/icons";
import hotdeal from "src/components/images/hotdeal.png";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";

// import { useGetAllTenantNameQuery } from "src/redux/query/auth.query";
function HomePage() {
  return (
    <>
      <div className="grid w-full grid-cols-1 text-center  lg:grid-cols-6">
        <LeftTaskbar />
        <div className=" gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <div className="mb-2  flex justify-between bg-white  px-5 pb-4 pt-12">
            <div className="flex items-center justify-between">
              <div className="mr-4 flex w-20 items-center justify-center rounded-full bg-primary-250 ">
                <UserIcon className=" hidden w-7 py-2.5 lg:block" />
                <MenuDropdown />
              </div>

              <div className="flex w-full items-center justify-start">
                <InputSearchBar
                  // style={{ width: "670px" }}
                  className=" rounded-full bg-primary-250 px-10 py-2.5 text-xl md:w-256 lg:w-80 xl:w-192 2xl:w-512"
                  placeholder="Bạn cần trợ giúp gì không?"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xl text-primary-350 ">
              <div className="mr-3 flex h-12 cursor-pointer items-center justify-between rounded-full bg-primary-250 p-2.5">
                {/* 
                <Bell className="w-5" /> */}
                <PopoverNotification />
              </div>
              <div className="languages flex h-12 cursor-pointer items-center justify-between gap-2 rounded-full bg-primary-250 p-2.5">
                <DropDown className="hidden h-3 w-6 md:block" />
                <div className="hidden text-sm lg:block">Tiếng Việt</div>
                <div className="text-sm lg:hidden">VIE</div>
                <Global className="hidden h-6 w-6 md:block" />
              </div>
            </div>
          </div>
          <div className="bg-white px-5 py-3">
            <Image src={hotdeal} alt="hotdeal" />
          </div>
          <div className="mb-2 grid grid-flow-row grid-cols-4 gap-4 bg-white px-5 pb-6 pt-3 text-primary-150">
            <div
              className="grid grid-flow-col 
              grid-rows-4 gap-4 rounded-3xl bg-primary-250 py-3 lg:grid-rows-2"
            >
              <div className="flex cursor-pointer flex-col items-center">
                <Shopping className="w-20" />
                <div>Mua sắm</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Research className="w-20" />
                <div>Tra Cứu</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Service className="w-20" />
                <div>Dịch vụ</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Chat className="w-20" />
                <div>Chat</div>
              </div>
            </div>
            <div
              className=" col-span-3
             grid grid-flow-col grid-rows-4 gap-4 rounded-3xl bg-primary-250 py-4 lg:grid-rows-2"
            >
              <div className="flex cursor-pointer flex-col items-center">
                <Education className="h-16 w-16" />
                <div className="pt-2">Giáo dục</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Craft className="h-16 w-16" />
                <div className="pt-2">Làng nghề</div>
              </div>

              <div className="flex cursor-pointer flex-col items-center">
                <Food className="h-16 w-16" />
                <div className="pt-2">Ẩm thực</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Entertainment className="h-16 w-16" />
                <div className="pt-2">Giải trí</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Medical className="h-16 w-16" />
                <div className="pt-2">Y tế</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Fix className="h-16 w-16" />
                <div className="pt-2">Sửa chữa</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Healthcare className="h-16 w-16" />
                <div className="pt-2">CSSK</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Traffic className="h-16 w-16" />
                <div className="pt-2">Giao thông</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Tourism className="h-16 w-16" />
                <div className="pt-2">Du lịch</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Job className="h-16 w-16" />
                <div className="pt-2">Việc làm</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Resident className="h-16 w-16" />
                <div className="pt-2">Lưu trú</div>
              </div>

              <div className="flex cursor-pointer flex-col items-center">
                <Sports className="h-16 w-16" />
                <div className="pt-2">Thể thao</div>
              </div>
            </div>
          </div>
          <div className="bg-white px-5 pb-20 text-left text-2xl text-primary-50">
            <div className="gap-6">
              <div className="py-4 text-2xl font-semibold">Flash Sale 50%, Thiết bị thông minh</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <span className="rounded-sm  bg-gradient-to-r from-primary-1500 to-primary-1600 px-2 text-white">
                    Gia sư Tiếng anh
                  </span>
                  <div className="text-xl font-semibold text-primary-150">David Nguyễn</div>
                  <div className="text-sm text-primary-150">Đại học Ngoại ngữ Hà Nội</div>
                  <div className="py-2 font-semibold">4.500.000đ/tháng</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50">
                        4.5 <span className="text-primary-150">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <span className="rounded-sm  bg-gradient-to-r from-primary-1500 to-primary-1600 px-2 text-white">
                    Gia sư Tiếng anh
                  </span>
                  <div className="text-xl font-semibold text-primary-150">David Nguyễn</div>
                  <div className="text-sm text-primary-150">Đại học Ngoại ngữ Hà Nội</div>
                  <div className="py-2 font-semibold">4.500.000đ/tháng</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50">
                        4.5 <span className="text-primary-150">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <span className="rounded-sm  bg-gradient-to-r from-primary-1500 to-primary-1600 px-2 text-white">
                    Gia sư Tiếng anh
                  </span>
                  <div className="text-xl font-semibold text-primary-150">David Nguyễn</div>
                  <div className="text-sm text-primary-150">Đại học Ngoại ngữ Hà Nội</div>
                  <div className="py-2 font-semibold">4.500.000đ/tháng</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50">
                        4.5 <span className="text-primary-150">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <span className="rounded-sm  bg-gradient-to-r from-primary-1500 to-primary-1600 px-2 text-white">
                    Gia sư Tiếng anh
                  </span>
                  <div className="text-xl font-semibold text-primary-150">David Nguyễn</div>
                  <div className="text-sm text-primary-150">Đại học Ngoại ngữ Hà Nội</div>
                  <div className="py-2 font-semibold">4.500.000đ/tháng</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50">
                        4.5 <span className="text-primary-150">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <span className="rounded-sm  bg-gradient-to-r from-primary-1500 to-primary-1600 px-2 text-white">
                    Gia sư Tiếng anh
                  </span>
                  <div className="text-xl font-semibold text-primary-150">David Nguyễn</div>
                  <div className="text-sm text-primary-150">Đại học Ngoại ngữ Hà Nội</div>
                  <div className="py-2 font-semibold">4.500.000đ/tháng</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50">
                        4.5 <span className="text-primary-150">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-6">
              <div className="py-4 text-2xl font-semibold">Flash Sale 50%, Thiết bị thông minh</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-sm text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="my-1 rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white">
                        50% GIảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400" />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-2xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-sm text-primary-150 ">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="my-1 rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white">
                        50% GIảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400" />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-2xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-sm text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="my-1 rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white">
                        50% GIảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400" />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-2xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-sm text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="my-1 rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white">
                        50% GIảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400" />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-2xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-sm text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="my-1 rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white">
                        50% GIảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400" />
                      <p className="text-primary-150">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-2xl font-semibold">500.000đ</div>
                </div>
              </div>
            </div>

            <div className="gap-5">
              <div className="py-4 text-2xl font-semibold">Top Sản phẩm Thiết bị điện</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-xs text-primary-150">
                    Camera tích hợp AI
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-7">
              <div className="py-4 text-2xl font-semibold">Top sản phẩm tìm kiếm hàng đầu</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Top2 className="w-full" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightTaskbar />
      </div>
    </>
  );
}

export default HomePage;
