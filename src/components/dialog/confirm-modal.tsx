import { XIcon } from "lucide-react";
import React from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

type TConfirmModalProps = Pick<ModalOverlayProps, "isOpen" | "onOpenChange" | "className"> & {
  children?: React.ReactNode;
  classNameOverlay?: TClassValue;
  onOk?: () => void;
  onCancel?: () => void;
  cancelBtn?: ButtonProps;
  okBtn?: ButtonProps;
  title?: React.ReactNode;
  desc?: React.ReactNode;
};

const ConfirmModal = ({
  isOpen,
  onOpenChange,
  className,
  children,
  classNameOverlay,
  cancelBtn = {},
  okBtn = {},
  onCancel,
  onOk,
  title,
  desc,
  ...props
}: TConfirmModalProps) => {
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
        className={({ isEntering, isExiting }) =>
          cn(
            "fixed z-[200] w-full max-w-md bg-white shadow-lg outline-none",
            className,
            isEntering && "duration-300 ease-out animate-in zoom-in-95",
            isExiting && "duration-200 ease-in animate-out zoom-out-95",
          )
        }
      >
        <Dialog slot={null} className="relative flex h-full flex-col outline-none">
          <Heading slot="title" className="my-0 text-lg font-[600] leading-[1.2] text-gray-700">
            {title}
          </Heading>
          <Button className="absolute right-0 top-0 h-8 w-8">
            <XIcon size={24} />
          </Button>
          <p className="mt-3 text-gray-500">{desc}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button
              {...cancelBtn}
              onPress={() => {
                onCancel?.();
              }}
              className={({}) =>
                cn(
                  "inline-flex cursor-default justify-center rounded-md border border-solid border-transparent px-5 py-2 font-[inherit] text-base font-semibold outline-none ring-blue-500 ring-offset-2 transition-colors focus-visible:ring-2",
                  "pressed:bg-slate-300 bg-slate-200 text-slate-800 hover:border-slate-300",
                  cancelBtn.className,
                )
              }
            >
              {cancelBtn.children || "Hủy"}
            </Button>
            <Button
              {...okBtn}
              onPress={() => {
                onOk?.();
              }}
              className={({}) =>
                cn(
                  "inline-flex cursor-default justify-center rounded-md border border-solid border-transparent px-5 py-2 font-[inherit] text-base font-semibold outline-none ring-blue-500 ring-offset-2 transition-colors focus-visible:ring-2",
                  "pressed:bg-red-600 bg-red-500 text-white hover:border-red-600",
                  okBtn.className,
                )
              }
            >
              {okBtn.children || "Hủy"}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default ConfirmModal;
