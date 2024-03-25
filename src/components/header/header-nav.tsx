import { BarChart, BarChartIcon, UserCircle2 } from "lucide-react";
import React from "react";
import { Button, Dialog, DialogTrigger, Link, Separator } from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import Popover, { PopoverArrow } from "../shared/popover";

type THeaderNavProps = {
  classNameBtn?: TClassValue;
};

const HeaderNav = ({ classNameBtn }: THeaderNavProps) => {
  return (
    <DialogTrigger>
      <Button
        className={({ isHovered, isPressed }) =>
          cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-left outline-none",
            classNameBtn,
            isPressed && "text-green2-500",
          )
        }
      >
        <BarChartIcon className="-rotate-90" />
      </Button>
      <Popover
        slot={"HeaderUser"}
        shouldUpdatePosition
        offset={12}
        shouldFlip={false}
        placement="bottom start"
        className={"!translate-x-1"}
      >
        <PopoverArrow className={"!left-[155px] lg:!left-[54px]"} />
        <Dialog slot={null} className="flex flex-col rounded bg-white p-1 outline-none">
          <Link
            href="/me/profile"
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
          <Separator className="mx-1 my-1 h-[1px] bg-gray-200" />
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default HeaderNav;
