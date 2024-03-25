import { useId } from "react";
import { Dialog, DialogTrigger, Button as RAButton } from "react-aria-components";

import { cn } from "@/utils/utils";

import { BellAlertSvg } from "../icons";
import ScrollBar from "../scrollbar/scroll-bar";
import Popover, { PopoverArrow } from "../shared/popover";

type THeaderNotificationProps = {};

const HeaderNotification = ({}: THeaderNotificationProps) => {
  const uid = useId();
  return (
    <DialogTrigger>
      <RAButton
        className={({ isHovered }) =>
          cn(
            "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green2-200 bg-green2-50 text-green2-400",
            isHovered && "shadow-md shadow-gray-100",
          )
        }
      >
        <BellAlertSvg strokeWidth={1.6} className="w-[26px]" />
        <span className="tw-badge-count">2</span>
      </RAButton>
      <Popover offset={12} shouldFlip={false} placement="bottom end">
        <PopoverArrow />
        <Dialog className="flex max-h-[calc(100dvh-80px)] w-[calc(100vw-18px)] flex-col text-gray-700 outline-none lg:w-[400px]">
          <div className="flex min-h-[40px] flex-none items-center px-2 font-[400] text-gray-400">
            <span>Thông báo mới nhận</span>
            <span className="mx-1">•</span>
            <span>2</span>
          </div>
          <ScrollBar className="max-h-fit min-h-0 flex-1 p-2">
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <div key={uid + index} className="">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, quam aliquid
                  officiis quae voluptatibus dolorem exercitationem corporis suscipit asperiores
                  est, accusamus veritatis veniam quia repellat at fugit nesciunt nostrum soluta.
                </div>
              ))}
          </ScrollBar>
          <RAButton className="flex min-h-[40px] w-full flex-none items-center justify-center px-2 font-[500] text-green2-500">
            Xem tất cả
          </RAButton>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default HeaderNotification;
