import { Avatar } from "src/components/icons";

function RightTaskbar() {
  return (
    <div className="right-taskbar hidden bg-white  px-5 py-12 lg:block">
      <div className="">
        <div className="flex items-center justify-center">
          <Avatar className="flex h-28 w-28 justify-center rounded-full" />
        </div>
        <div className="text-center font-semibold text-primary-50 lg:text-lg xl:text-xl">
          Lưu Vương Thịnh
        </div>
        <div className="text-lg font-medium">ID: Miracles3345</div>
      </div>
      <div className="pt-10">
        <div className="pb-4 text-start text-2xl font-semibold text-primary-50">Liên hệ</div>
        <div className="border-2 border-primary-150"></div>
        <div className="flex flex-col gap-6 pt-7">
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div>
              <Avatar className="h-14 w-14" />
            </div>
            <div className="pl-2 text-start">
              <div>Chử Hoàng</div>
              <div className="relative after:absolute after:right-4 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-green-500">
                Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightTaskbar;
