import { useToast } from "@react-aria/toast";
import { useRef } from "react";
import { Button } from "react-aria-components";
import { MdCheckCircleOutline, MdClose, MdErrorOutline, MdWarningAmber } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import type { ToastProps } from "./GlobalToastRegion";

function Toast({ state, ...props }: ToastProps) {
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } = useToast(
    props,
    state,
    ref,
  );

  return (
    <div
      {...toastProps}
      ref={ref}
      className={twMerge(
        "flex items-center gap-4 rounded-lg border-2 bg-primary-200 px-6 py-4 text-lg text-white shadow-md",
        props.toast.content.state === "success" ? " bg-green-100 text-green-700" : "",
        props.toast.content.state === "error" ? " bg-red-100 text-red-700" : "",
        props.toast.content.state === "invalid" ? " bg-yellow-100 text-yellow-700" : "",
      )}
    >
      <MdErrorOutline
        className={twMerge("hidden", props.toast.content.state === "success" ? "block" : "")}
        size={22}
      />
      <MdWarningAmber
        className={twMerge("hidden", props.toast.content.state === "error" ? "block" : "")}
        size={22}
      />
      <MdCheckCircleOutline
        className={twMerge("hidden", props.toast.content.state === "invalid" ? "block" : "")}
        size={22}
      />
      <div className="m-0 p-0" {...titleProps}>
        {props.toast.content.title}
      </div>
      <div className="m-0 p-0" {...descriptionProps}>
        {props.toast.content.description}
      </div>
      <Button {...closeButtonProps}>
        <MdClose size={22} className="hover:outline-none active:outline-none" />
      </Button>
    </div>
  );
}

export default Toast;
