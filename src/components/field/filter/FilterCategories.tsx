import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { DropDown, Filter, SettingsFilter } from "src/components/icons";

function FilterCategories() {
  return (
    <div className="flex items-start justify-center ">
      <DialogTrigger>
        <Button className="inline-flex cursor-pointer items-center justify-center rounded-md  bg-white bg-clip-padding  outline-none transition-colors data-[hovered]:bg-opacity-30 data-[pressed]:bg-opacity-40 data-[focus-visible]:ring-2 data-[focus-visible]:ring-white/75 ">
          <div className="flex items-center justify-center bg-white  text-lg font-semibold">
            <Filter className="h-8 w-8" />
            Lọc
          </div>
        </Button>
        <MyPopover className="group relative  w-[250px] overflow-auto">
          <Dialog className="px-5 py-7 text-gray-700 outline-none">
            <div className=" flex flex-col">
              <h6 className="flex items-center justify-start font-bold uppercase text-primary-150">
                <SettingsFilter className="mr-2 h-4 w-4" />
                Bộ lọc tìm kiếm
              </h6>
              <ul>
                <p className="text-primary-150">Theo danh mục</p>
                <li>
                  <input className="mr-1" type="checkbox" id="device1" />
                  <label className="text-primary-350" htmlFor="device1">
                    Thiết bị điện gia dụng
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device2" />
                  <label className="text-primary-350" htmlFor="device2">
                    Thiết bị điện gia dụng
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device3" />
                  <label className="text-primary-350" htmlFor="device3">
                    Thiết bị điện gia dụng
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device5" />
                  <label className="text-primary-350" htmlFor="device5">
                    Thiết bị điện gia dụng
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device4" />
                  <label className="text-primary-350" htmlFor="device4">
                    Thiết bị điện gia dụng
                  </label>
                </li>
              </ul>
              <ul>
                <p className="text-primary-150">Nơi bán</p>
                <li>
                  <input className="mr-1" type="checkbox" id="device6" />
                  <label className="text-primary-350" htmlFor="device6">
                    Hà nội
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device7" />
                  <label className="text-primary-350" htmlFor="device7">
                    TP. Hồ Chí Minh
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device8" />
                  <label className="text-primary-350" htmlFor="device8">
                    Quận Cầu giấy
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device9" />
                  <label className="text-primary-350" htmlFor="device9">
                    Quận Hoàng Mai
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device10" />
                  <label className="text-primary-350" htmlFor="device10">
                    Quận Mễ trì
                  </label>
                </li>
                <li className="ml-5 flex items-center justify-start">
                  Thêm <DropDown className="ml-2 mt-1 h-4 w-4" />
                </li>
              </ul>
              <ul>
                <p className="text-primary-150">Đơn vị Vận chuyển</p>
                <li>
                  <input className="mr-1" type="checkbox" id="device11" />
                  <label className="text-primary-350" htmlFor="device11">
                    Nhanh
                  </label>
                </li>
                <li>
                  <input className="mr-1" type="checkbox" id="device12" />
                  <label className="text-primary-350" htmlFor="device12">
                    Tiết kiệm
                  </label>
                </li>
              </ul>
            </div>
          </Dialog>
          <div className="sticky bottom-0 flex w-full items-center justify-center gap-2.5 bg-white px-5 pb-6 pt-4">
            <div className="cursor-pointer rounded-lg bg-primary-250 px-7 py-1 text-primary-150">
              Hủy
            </div>
            <div className="cursor-pointer rounded-lg bg-primary-450 px-3 py-1 text-white">
              Áp dụng
            </div>
          </div>
        </MyPopover>
      </DialogTrigger>
    </div>
  );
}

function MyPopover(props: any) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) => `
      rounded-lg bg-white ring-1 ring-black/10 drop-shadow-lg  ${props.className || ""}
          ${
            isEntering
              ? "animate-in fade-in duration-200 ease-out fill-mode-forwards data-[placement=bottom]:slide-in-from-top-1 data-[placement=top]:slide-in-from-bottom-1"
              : ""
          }
          ${
            isExiting
              ? "animate-out fade-out duration-150 ease-in fill-mode-forwards data-[placement=bottom]:slide-out-to-top-1 data-[placement=top]:slide-out-to-bottom-1"
              : ""
          }
        `}
    />
  );
}

export default FilterCategories;
