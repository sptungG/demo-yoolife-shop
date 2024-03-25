import { DoorOpen, History, UserCircle2 } from "lucide-react";
import { useId } from "react";
import { Button, Dialog, DialogTrigger, Link, Separator } from "react-aria-components";
import { useMedia } from "react-use";

import useLogout from "@/hooks/use-logout";
import { useAppSelector } from "@/redux/store";
import { cn } from "@/utils/utils";

import Image from "../shared/image";
import Popover, { PopoverArrow } from "../shared/popover";

type THeaderUserProps = {};

const HeaderUser = ({}: THeaderUserProps) => {
  const uid = useId();
  const mediaAbove1024 = useMedia("(min-width: 1024px)");
  const userData = useAppSelector((s) => s.user.data);
  const { handleLogout, isLoadingLogout } = useLogout();

  return (
    <DialogTrigger>
      <Button
        className={({ isHovered }) =>
          cn(
            "flex items-center rounded-full text-left outline-none",
            isHovered && "bg-green2-100 shadow-md shadow-green2-100",
          )
        }
      >
        <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Image
            className="z-10 h-8 w-8 rounded-full bg-gray-100 object-cover"
            alt={userData?.name}
            src={userData?.imageUrl}
          />
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-gradient-to-tr from-green2-300 via-green2-400 to-green3-600 opacity-90 blur-sm lg:mx-0"></div>
          </div>
        </div>
        {mediaAbove1024 && (
          <div className="ml-1.5 flex max-w-[120px] flex-1 flex-col items-start">
            <div className="mb-0.5 line-clamp-1 max-w-full break-all text-sm font-[600] leading-none text-gray-700 lg:text-sm">
              {userData?.fullName}
            </div>
            <div className="line-clamp-1 break-all text-xs leading-none text-gray-400">
              @{userData?.userName}
            </div>
          </div>
        )}
      </Button>
      <Popover
        slot={"HeaderUser"}
        shouldUpdatePosition
        offset={12}
        shouldFlip={false}
        placement="bottom start"
        className={"!translate-x-1"}
      >
        <PopoverArrow className={"!left-[155px] lg:!left-[14px]"} />
        <Dialog slot={null} className="flex flex-col rounded bg-white p-1 outline-none">
          <Link
            href="/me"
            className={({ isHovered }) =>
              cn(
                "relative flex cursor-pointer items-center justify-between gap-4 whitespace-nowrap rounded p-2 text-sm font-[500] text-gray-600 outline-none lg:text-base",
                isHovered && "bg-gray-100",
              )
            }
          >
            <span>Tài khoản của tôi</span>
            <UserCircle2 className="w-[22px] opacity-80" />
          </Link>
          <Link
            href="/me/purchase"
            className={({ isHovered }) =>
              cn(
                "flex cursor-pointer items-center justify-between rounded p-2 text-sm font-[500] text-gray-600 outline-none lg:text-base",
                isHovered && "bg-gray-100",
              )
            }
          >
            <span>Đơn mua</span>
            <History className="w-[22px] opacity-80" />
          </Link>
          <Separator className="mx-1 my-1 h-[1px] bg-gray-200" />
          <Button
            isDisabled={isLoadingLogout}
            onPress={() => handleLogout()}
            className={({ isHovered }) =>
              cn(
                "flex cursor-pointer items-center justify-between gap-2 p-2 text-sm text-gray-500 outline-none lg:text-base",
                isHovered && "bg-gray-100",
              )
            }
          >
            <span>Đăng xuất</span>
            <DoorOpen className="w-[22px]" strokeWidth={1.8} />
          </Button>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default HeaderUser;
