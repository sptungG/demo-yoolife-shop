import { ChevronLeftIcon } from "lucide-react";
import React from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

type TDrawerProps = Omit<ModalOverlayProps, "children"> & {
  children?: React.ReactNode;
  classNameOverlay?: TClassValue;
  placement?: "left" | "right" | "top" | "bottom";
};

const Drawer = ({
  isOpen,
  onOpenChange,
  className,
  children,
  placement = "bottom",
  classNameOverlay,
  ...props
}: TDrawerProps) => {
  return (
    <ModalOverlay
      slot={null}
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      {...props}
      className={({ isEntering, isExiting }) =>
        cn(
          "fixed inset-0 z-[100] bg-gray-900/10 backdrop-blur-[2px]",
          classNameOverlay,
          isEntering && "duration-300 ease-out animate-in fade-in",
          isExiting && "duration-200 ease-in animate-out fade-out",
        )
      }
    >
      <Modal
        slot={null}
        className={({}) =>
          cn(
            "fixed z-[200] bg-white shadow-lg outline-none",
            placement === "bottom" && "bottom-0 right-0 max-h-[calc(100dvh-40px)] w-full",
            placement === "top" && "right-0 top-0 max-h-[calc(100dvh-40px)] w-full",
            placement === "left" && "bottom-0 left-0 h-[100dvh] w-[320px]",
            placement === "right" && "bottom-0 right-0 h-[100dvh] w-[320px]",
            className,
          )
        }
      >
        <Dialog slot={null} className="relative flex max-h-full flex-col outline-none">
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

type TDrawerClose = Pick<ButtonProps, "onPress" | "className" | "children"> & {};
export const DrawerClose = ({ onPress, className, children }: TDrawerClose) => {
  return (
    <Button
      onPress={onPress}
      className={cn(
        "z-[200] flex h-[24px] min-w-[36px] -translate-y-full items-center justify-center self-start rounded-full bg-gray-50 px-2 text-sm text-gray-500 shadow-md",
        className,
      )}
    >
      {children || (
        <>
          <ChevronLeftIcon size={20} strokeWidth={2.5} className="-ml-1" />
          <span>Đóng</span>
        </>
      )}
    </Button>
  );
};

export default Drawer;
