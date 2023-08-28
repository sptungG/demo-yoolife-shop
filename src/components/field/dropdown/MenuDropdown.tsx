import { useRouter } from "next/router";
import { Menu, MenuTrigger, Popover } from "react-aria-components";
import { MdList } from "react-icons/md";

import OverlayButton from "../Notify/OverlayButton";
import MenuItem from "./MenuItem";
function MenuDropdown() {
  const router = useRouter();
  function handlePagination(id: any) {
    console.log(id);
    if (id === "search") {
      router.replace("/shopping/ShoppingSearch");
    } else if (id === "homepage") {
      router.replace("/homepage");
    } else if (id === "logout") {
      router.replace("/login");
    }
  }
  return (
    <div className="cursor-pointer rounded-lg lg:hidden ">
      <MenuTrigger>
        <OverlayButton aria-label="Menu">
          <MdList className="text-primary-150" size={28} />
        </OverlayButton>
        <Popover className="w-60 origin-top-left overflow-auto rounded-md bg-white p-1 shadow-lg  ">
          <Menu className="outline-none" onAction={handlePagination}>
            <MenuItem id="homepage">Trang chủ</MenuItem>
            <MenuItem id="forum">Diễn đàn</MenuItem>
            <MenuItem id="department">Căn hộ</MenuItem>
            <MenuItem id="account">Tài khoản</MenuItem>

            <MenuItem id="search">Tìm kiếm</MenuItem>

            <MenuItem id="settings">Cài đặt</MenuItem>
            <MenuItem id="logout">Đăng xuất</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
      {/* <MenuTrigger>
        <Button aria-label="Menu">☰</Button>
        <Popover>
          <Menu onAction={alert}>
            <MenuItem id="homepage">Trang chủ</MenuItem>
            <MenuItem id="forum">Diễn đàn</MenuItem>
            <MenuItem id="department">Căn hộ</MenuItem>
            <MenuItem id="account">Tài khoản</MenuItem>
            <MenuItem on id="account">
              Tìm kiếm
            </MenuItem>
            <MenuItem id="settings">Cài đặt</MenuItem>
            <MenuItem id="logout">Đăng xuất</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger> */}
    </div>
  );
}

export default MenuDropdown;
