import React from "react";
import { Button } from "react-aria-components";

import { useAppSelector } from "@/redux/store";
import { cn } from "@/utils/utils";

import Image from "../shared/image";
import Drawer from "./drawer";

type TDrawerSideNavProps = {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const DrawerSideNav = ({ isOpen, onOpenChange }: TDrawerSideNavProps) => {
  const userData = useAppSelector((s) => s.user.data);

  return (
    <Drawer isDismissable isOpen={isOpen} onOpenChange={onOpenChange} className="rounded-t-lg">
      <Button
        className={({ isHovered }) =>
          cn(
            "flex items-center rounded-full text-left outline-none",
            isHovered && "bg-gray-100 shadow-md shadow-gray-100",
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
        <div className="ml-0.5 flex max-w-[100px] flex-1 flex-col items-start">
          <div className="mb-0.5 line-clamp-1 break-all text-sm font-[600] leading-none text-gray-700 lg:text-base">
            {userData?.fullName}
          </div>
          <div className="line-clamp-1 break-all text-xs leading-none text-gray-400">
            @{userData?.userName}
          </div>
        </div>
      </Button>
    </Drawer>
  );
};

export default DrawerSideNav;
