import { useRouter } from "next/router";
//import { Button } from "react-aria-components";
import {
  AccountNo,
  AccountYes,
  DepartmentNo,
  DepartmentYes,
  ForumNo,
  ForumYes,
  HomeNo,
  HomeYes,
  SettingsNo,
  SettingsYes,
  YoolifeIContent,
} from "src/components/icons";

function LeftTaskbar() {
  const router = useRouter();

  function handleLogOut() {
    router.replace("/homepage");
  }

  return (
    <div className="left-taskbar hidden bg-white lg:block ">
      <div className="flex items-center justify-center pb-6 pt-12">
        <YoolifeIContent className="w-32" />
      </div>
      <div className="flex  flex-col gap-8 pt-5 ">
        <div
          dir="ltr"
          className="relative ml-3 flex cursor-pointer items-center justify-start rounded-s-full bg-white p-1 hover:z-10 hover:bg-primary-250 xl:ml-10 "
        >
          <div className=" absolute -top-8 right-0 h-8 w-8 bg-inherit after:absolute after:right-0 after:top-0 after:h-8 after:w-16 after:rounded-br-full after:bg-white"></div>

          {/* <div onClick={listAllDatas} className="h-20 w-64"> */}
          <div className="h-20 w-64">
            <HomeYes className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:z-10 " />
            <HomeNo className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:hidden" />
          </div>
          <div className="absolute -bottom-8 right-0 h-8 w-8 bg-inherit after:absolute after:bottom-0 after:right-0 after:h-8 after:w-16 after:rounded-tr-full after:bg-white"></div>
        </div>
        <div
          dir="ltr"
          className="relative ml-3 flex cursor-pointer items-center justify-start rounded-s-full bg-white p-1 hover:z-10 hover:bg-primary-250 xl:ml-10 "
        >
          <div className=" absolute -top-8 right-0 h-8 w-8 bg-inherit after:absolute after:right-0 after:top-0 after:h-8 after:w-16 after:rounded-br-full after:bg-white"></div>

          <div className="h-20 w-64">
            <ForumYes className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:z-10 " />
            <ForumNo className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:hidden" />
          </div>
          <div className="absolute -bottom-8 right-0 h-8 w-8 bg-inherit after:absolute after:bottom-0 after:right-0 after:h-8 after:w-16 after:rounded-tr-full after:bg-white"></div>
        </div>
        <div
          dir="ltr"
          className="relative ml-3 flex cursor-pointer items-center justify-start rounded-s-full bg-white p-1 hover:z-10 hover:bg-primary-250 xl:ml-10 "
        >
          <div className=" absolute -top-8 right-0 h-8 w-8 bg-inherit after:absolute after:right-0 after:top-0 after:h-8 after:w-16 after:rounded-br-full after:bg-white"></div>

          <div className="h-20 w-64">
            <DepartmentYes className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:z-10 " />
            <DepartmentNo className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:hidden" />
          </div>
          <div className="absolute -bottom-8 right-0 h-8 w-8 bg-inherit after:absolute after:bottom-0 after:right-0 after:h-8 after:w-16 after:rounded-tr-full after:bg-white"></div>
        </div>
        <div
          dir="ltr"
          className="relative ml-3 flex cursor-pointer items-center justify-start rounded-s-full bg-white p-1 hover:z-10 hover:bg-primary-250 xl:ml-10 "
        >
          <div className=" absolute -top-8 right-0 h-8 w-8 bg-inherit after:absolute after:right-0 after:top-0 after:h-8 after:w-16 after:rounded-br-full after:bg-white"></div>

          <div className="h-20 w-64">
            <SettingsYes className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:z-10 " />
            <SettingsNo className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:hidden" />
          </div>
          <div className="absolute -bottom-8 right-0 h-8 w-8 bg-inherit after:absolute after:bottom-0 after:right-0 after:h-8 after:w-16 after:rounded-tr-full after:bg-white"></div>
        </div>
        <div
          dir="ltr"
          className="relative ml-3 flex cursor-pointer items-center justify-start rounded-s-full bg-white p-1 hover:z-10 hover:bg-primary-250 xl:ml-10 "
        >
          <div className=" absolute -top-8 right-0 h-8 w-8 bg-inherit after:absolute after:right-0 after:top-0 after:h-8 after:w-16 after:rounded-br-full after:bg-white"></div>

          <div className="h-20 w-64">
            <AccountYes className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:z-10 " />
            <AccountNo className="absolute left-2 top-1  h-20 w-48 pr-12 opacity-100 hover:hidden" />
          </div>
          <div className="absolute -bottom-8 right-0 h-8 w-8 bg-inherit after:absolute after:bottom-0 after:right-0 after:h-8 after:w-16 after:rounded-tr-full after:bg-white"></div>
        </div>
      </div>
      <div
        onClick={handleLogOut}
        className="mx-4 mb-8 mt-64 cursor-pointer rounded-2xl bg-primary-250 from-primary-1500 to-primary-1600 px-6 py-2.5 text-primary-350 hover:bg-gradient-to-r hover:text-white xl:ml-8 xl:mr-2 xl:px-10"
      >
        Đăng xuất
      </div>
    </div>
  );
}

export default LeftTaskbar;
