// rfce
import Image from "next/image";
import "react-dropdown/style.css";
import { MdLocationOn, MdStar } from "react-icons/md";
import InputSearchBar from "src/components/field/InputSearchBar";
import PopoverNotification from "src/components/field/Notify/PopoverNotification";
import MenuDropdown from "src/components/field/dropdown/MenuDropdown";
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
  SunHouse,
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
          <div className="mb-2  flex justify-between bg-white px-2 pb-4 pt-12 sm:px-5">
            <div className="relative flex grow items-center ">
              <div className="mr-4 flex w-20 items-center justify-center rounded-full bg-primary-250 ">
                <UserIcon className=" hidden w-6 py-2.5 lg:block" />
              </div>
              <div className="absolute left-0 block cursor-pointer rounded bg-primary-250 lg:hidden">
                <MenuDropdown />
              </div>

              <div className="flex  grow items-center justify-start ">
                <InputSearchBar
                  // style={{ width: "670px" }}
                  className=" grow rounded-full bg-primary-250 px-10 py-2.5 text-base"
                  placeholder="Bạn cần trợ giúp gì không?"
                />
              </div>
            </div>
            <div className="ml-1 flex items-center justify-between text-xl text-primary-350">
              <PopoverNotification />

              <div className="flex cursor-pointer items-center justify-start gap-2 rounded-full bg-primary-250 p-2.5">
                <DropDown className="w-4 xl:w-6" />
                <div className="hidden text-xs sm:block md:text-sm xl:text-base">Tiếng Việt</div>
                <div className="text-xs sm:hidden">VIE</div>
                <Global className="w-4 xl:w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white px-2 py-3 sm:px-5">
            <Image src={hotdeal} alt="hotdeal" />
          </div>
          <div className="mb-2  flex justify-between gap-4 bg-white px-2 pb-6 pt-3 text-primary-150 sm:px-5">
            <div
              className="grid grid-flow-col grid-rows-4 gap-4 rounded-3xl 
              bg-primary-250  px-4 py-3 sm:grid-rows-2 lg:text-xs xl:text-base 2xl:gap-8 2xl:px-8"
            >
              <div className="flex cursor-pointer flex-col items-center">
                <Shopping className="w-16 xl:w-20" />
                <div>Mua sắm</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Research className="w-16 xl:w-20" />
                <div>Tra Cứu</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Service className="w-16 xl:w-20" />
                <div>Dịch vụ</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Chat className="w-16 xl:w-20" />
                <div>Chat</div>
              </div>
            </div>
            <div
              className=" grid w-full grid-flow-col  
             grid-rows-4 gap-2 rounded-3xl bg-primary-250 px-2 py-4 sm:grid-rows-2 lg:text-xs xl:text-base"
            >
              <div className="flex cursor-pointer flex-col items-center">
                <Education className="w-12 xl:w-16" />
                <div className="pt-2">Giáo dục</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Craft className="w-12 xl:w-16" />
                <div className="pt-2">Làng nghề</div>
              </div>

              <div className="flex cursor-pointer flex-col items-center">
                <Food className="w-12 xl:w-16" />
                <div className="pt-2">Ẩm thực</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Entertainment className="w-12 xl:w-16" />
                <div className="pt-2">Giải trí</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Medical className="w-12 xl:w-16" />
                <div className="pt-2">Y tế</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Fix className="w-12 xl:w-16" />
                <div className="pt-2">Sửa chữa</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Healthcare className="w-12 xl:w-16" />
                <div className="pt-2">CSSK</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Traffic className="w-12 xl:w-16" />
                <div className="pt-2">Giao thông</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Tourism className="w-12 xl:w-16" />
                <div className="pt-2">Du lịch</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Job className="w-12 xl:w-16" />
                <div className="pt-2">Việc làm</div>
              </div>
              <div className="flex cursor-pointer flex-col items-center">
                <Resident className="w-12 xl:w-16" />
                <div className="pt-2">Lưu trú</div>
              </div>

              <div className="flex cursor-pointer flex-col items-center">
                <Sports className="w-12 xl:w-16" />
                <div className="pt-2">Thể thao</div>
              </div>
            </div>
          </div>
          <div className="bg-white px-2 pb-20 text-left text-2xl text-primary-50 sm:px-5">
            <div className="gap-6">
              <div className="py-4 text-2xl font-semibold">Flash Sale 50%, Thiết bị thông minh</div>
              <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5 xl:gap-4">
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <div className="line-clamp-1 flex items-center rounded-sm bg-gradient-to-r from-primary-1500 to-primary-1600 px-3 text-base text-white lg:h-4 lg:px-1 lg:text-[10px] xl:px-2 xl:text-xs">
                    Gia sư Tiếng anh
                  </div>
                  <div className="text-xl font-semibold text-primary-150 lg:text-xs xl:text-lg">
                    David Nguyễn
                  </div>
                  <div className="text-base leading-3 text-primary-150 lg:text-[8px] xl:text-[10px]">
                    Đại học Ngoại ngữ Hà Nội
                  </div>
                  <div className="pb-2 text-sm font-semibold">4.500.000đ/thg</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50 lg:text-[10px] xl:text-sm">
                        4.5
                        <span className="text-primary-150 lg:text-[10px] xl:text-sm">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <div className="line-clamp-1 flex items-center rounded-sm bg-gradient-to-r from-primary-1500 to-primary-1600 px-3 text-base text-white lg:h-4 lg:px-1 lg:text-[10px] xl:px-2 xl:text-xs">
                    Gia sư Toán, Lý, Hóa
                  </div>
                  <div className="text-xl font-semibold text-primary-150 lg:text-xs xl:text-lg">
                    Phùng Hải Linh
                  </div>
                  <div className="text-base leading-3 text-primary-150 lg:text-[8px] xl:text-[10px]">
                    Đại học kinh tế Quốc dân
                  </div>
                  <div className="pb-2 text-sm font-semibold">2.500.000đ/thg</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50 lg:text-[10px] xl:text-sm">
                        4.5
                        <span className="text-primary-150 lg:text-[10px] xl:text-sm">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <div className="line-clamp-1 flex items-center rounded-sm bg-gradient-to-r from-primary-1500 to-primary-1600 px-3 text-base text-white lg:h-4 lg:px-1 lg:text-[10px] xl:px-2 xl:text-xs">
                    Gia sư Mỹ thuật
                  </div>
                  <div className="text-xl font-semibold text-primary-150 lg:text-xs xl:text-lg">
                    Hà Phương Nhi
                  </div>
                  <div className="text-base leading-3 text-primary-150 lg:text-[8px] xl:text-[10px]">
                    Đại học Mỹ thuật Hà nội
                  </div>
                  <div className="pb-2 text-sm font-semibold">3.500.000đ/thg</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50 lg:text-[10px] xl:text-sm">
                        4.5
                        <span className="text-primary-150 lg:text-[10px] xl:text-sm">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <div className="line-clamp-1 flex items-center rounded-sm bg-gradient-to-r from-primary-1500 to-primary-1600 px-3 text-base text-white lg:h-4 lg:px-1 lg:text-[10px] xl:px-2 xl:text-xs">
                    Gia sư tiếng Nhật
                  </div>
                  <div className="text-xl font-semibold text-primary-150 lg:text-xs xl:text-lg">
                    Trần Thái Linh
                  </div>
                  <div className="text-base leading-3 text-primary-150 lg:text-[8px] xl:text-[10px]">
                    Đại học Ngoại giao
                  </div>
                  <div className="pb-2 text-sm font-semibold">600.000đ/lần</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50 lg:text-[10px] xl:text-sm">
                        4.5
                        <span className="text-primary-150 lg:text-[10px] xl:text-sm">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales1 className="w-full pb-5" />
                  <div className="line-clamp-1 flex items-center rounded-sm bg-gradient-to-r from-primary-1500 to-primary-1600 px-3 text-base text-white lg:h-4 lg:px-1 lg:text-[10px] xl:px-2 xl:text-xs">
                    Gia sư Tiếng anh
                  </div>
                  <div className="text-xl font-semibold text-primary-150 lg:text-xs xl:text-lg">
                    David Nguyễn
                  </div>
                  <div className="text-base leading-3 text-primary-150 lg:text-[8px] xl:text-[10px]">
                    Đại học Ngoại ngữ Hà Nội
                  </div>
                  <div className="pb-2 text-sm font-semibold">4.500.000đ/thg</div>
                  <div className="flex justify-between text-sm text-yellow-400">
                    <div className="flex items-center justify-between">
                      <MdStar size={14} />
                      <p className="text-primary-50 lg:text-[10px] xl:text-sm">
                        4.5
                        <span className="text-primary-150 lg:text-[10px] xl:text-sm">(150)</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MdLocationOn size={14} />
                      <p className="text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-6">
              <div className="py-4 text-2xl font-semibold">Flash Sale 50%, Thiết bị thông minh</div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-xs text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="h-4.5 my-1 flex items-center rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white lg:px-[2px] lg:text-[10px] xl:px-2 xl:text-xs">
                        50% Giảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400 lg:w-2.5 xl:w-3.5" />
                      <p className=" text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-xs text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="h-4.5 my-1 flex items-center rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white lg:px-[2px] lg:text-[10px] xl:px-2 xl:text-xs">
                        50% Giảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400 lg:w-2.5 xl:w-3.5" />
                      <p className=" text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-xs text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="h-4.5 my-1 flex items-center rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white lg:px-[2px] lg:text-[10px] xl:px-2 xl:text-xs">
                        50% Giảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400 lg:w-2.5 xl:w-3.5" />
                      <p className=" text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-xs text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="h-4.5 my-1 flex items-center rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white lg:px-[2px] lg:text-[10px] xl:px-2 xl:text-xs">
                        50% Giảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400 lg:w-2.5 xl:w-3.5" />
                      <p className=" text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-xl font-semibold">500.000đ</div>
                </div>
                <div className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm">
                  <Flashsales2 className="w-full pb-5" />
                  <div className="line-clamp-2 text-xs text-primary-150">
                    Đèn ngủ cảm ứng kèm sạc điện thoại không dây và nhieu thu khac nua hasdasdadadaa
                  </div>

                  <div className="flex justify-between ">
                    <div className="flex items-center justify-between">
                      <p className="h-4.5 my-1 flex items-center rounded-md  bg-gradient-to-r from-primary-1700 to-primary-1800 px-3 text-white lg:px-[2px] lg:text-[10px] xl:px-2 xl:text-xs">
                        50% Giảm
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <MapLocation className="w-3.5 text-yellow-400 lg:w-2.5 xl:w-3.5" />
                      <p className=" text-primary-150 lg:text-[10px] xl:text-sm">Hà Nội</p>
                    </div>
                  </div>
                  <div className=" text-xl font-semibold">500.000đ</div>
                </div>
              </div>
            </div>

            <div className="gap-5">
              <div className="py-4 text-2xl font-semibold">Top Sản phẩm Thiết bị điện</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Tops1 className="w-full rounded-2xl bg-primary-250" />
                  <Tops2 className="w-full" />
                  <div className="line-clamp-1 text-center text-lg text-primary-150 lg:text-[10px]">
                    Camera tích hợp AI
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-7">
              <div className="py-4 text-2xl font-semibold">Top sản phẩm tìm kiếm hàng đầu</div>
              <div className="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1">
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
                  <div className="line-clamp-1 text-sm text-primary-150">
                    Nồi chiên không dầu Sunhouse SHD 4026 6 Lít
                  </div>
                </div>
                <div className="relative cursor-pointer">
                  <SunHouse className="w-full" />
                  <Top2 className="absolute bottom-5 left-0 w-1/2 rounded-bl-3xl lg:rounded-bl-lg" />
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
