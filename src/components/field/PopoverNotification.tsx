import { forwardRef } from "react";
import { Dialog, DialogTrigger, OverlayArrow, Popover } from "react-aria-components";
import { Bell } from "../icons";
import Notification from "./Notification";
import OverlayButton from "./OverlayButton";

function PopoverNotification() {
  return (
    <div className="z-10 flex cursor-pointer items-start justify-center rounded-lg bg-primary-250">
      <DialogTrigger>
        <OverlayButton aria-label="Notifications">
          <span className=" mr-1 text-lg text-primary-150">25</span>
          <Bell className="h-5 w-5 text-white" aria-hidden="true" />
        </OverlayButton>
        <MyPopover className="group w-[280px] data-[placement=bottom]:mt-2 data-[placement=top]:mb-2">
          <OverlayArrow>
            <svg
              viewBox="0 0 12 12"
              className="block h-4 w-4 fill-white group-data-[placement=bottom]:rotate-180"
            >
              <path d="M0 0,L6 6,L12 0" />
            </svg>
          </OverlayArrow>
          <Dialog className="p-2 text-gray-700 outline-none">
            <div className="flex flex-col">
              <Notification
                text="This looks great! Let's ship it."
                avatar={undefined}
                name={""}
                time={0}
              />
              <Notification
                text="Can you add a bit more pizzazz?"
                avatar={undefined}
                name={""}
                time={0}
              />
              <Notification
                text="Here's a first pass. What do you think?"
                avatar={undefined}
                name={""}
                time={0}
              />
            </div>
          </Dialog>
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
          rounded-lg bg-white px-4 ring-1 ring-black/10 drop-shadow-lg sm:px-0 ${
            props.className || ""
          }
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

export default forwardRef(PopoverNotification);
