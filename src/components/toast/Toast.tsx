import { useToast } from "@react-aria/toast";
import { useRef } from "react";
import { Button } from "react-aria-components";
import { MdDangerous } from "react-icons/md";
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
        "flex items-center gap-4 rounded-lg bg-primary-200 px-6 py-4 text-xl text-white shadow-md",
        props.toast.content.state === "success" ? "bg-green-400" : "",
        props.toast.content.state === "error" ? "bg-red-500" : "",
        props.toast.content.state === "invalid" ? "bg-yellow-400" : "",
      )}
    >
      <div {...titleProps}>{props.toast.content.title}</div>
      <div {...descriptionProps}>{props.toast.content.description}</div>
      <Button className="" {...closeButtonProps}>
        <MdDangerous className="hover:outline-none" />
      </Button>
    </div>
  );
}

export default Toast;
