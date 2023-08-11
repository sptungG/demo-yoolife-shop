import { Menu, MenuTrigger, Popover } from "react-aria-components";
import { MdList } from "react-icons/md";
import MenuItem from "./MenuItem";
import OverlayButton from "./Notify/OverlayButton";

function MenuDropdown() {
  return (
    <div className="cursor-pointer rounded-lg bg-blue-300 lg:hidden ">
      <MenuTrigger>
        <OverlayButton aria-label="Menu">
          <MdList className="text-white" size={28} />
        </OverlayButton>
        <Popover className="w-60 origin-top-left overflow-auto rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 fill-mode-forwards data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95">
          <Menu className="outline-none">
            <MenuItem id="homepage">Trang chủ</MenuItem>
            <MenuItem id="forum">Diễn đàn</MenuItem>
            <MenuItem id="department">Căn hộ</MenuItem>
            <MenuItem id="account">Tài khoản</MenuItem>
            <MenuItem id="settings">Cài đặt</MenuItem>
            <MenuItem id="logout">Đăng xuất</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </div>
  );
}

export default MenuDropdown;
