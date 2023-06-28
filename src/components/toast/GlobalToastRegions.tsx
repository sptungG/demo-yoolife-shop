import { AriaToastProps, useToast, useToastRegion } from "@react-aria/toast";
import { ToastQueue, ToastState, useToastQueue } from "@react-stately/toast";
import { useRef } from "react";
import { Button } from "react-aria-components";
import { createPortal } from "react-dom";

interface MyToast {
  title: string;
  description: string;
}

export const toastQueue = new ToastQueue<MyToast>({
  maxVisibleToasts: 5,
});

type ToastProps = AriaToastProps<MyToast> & {
  state: ToastState<MyToast>;
};

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
      className="flex items-center gap-4 rounded-lg bg-primary-200 px-4 py-3 shadow-md"
    >
      <div {...titleProps}>{props.toast.content.title}</div>
      <div {...descriptionProps}>{props.toast.content.description}</div>
      <Button {...closeButtonProps}>x</Button>
    </div>
  );
}

type TGlobalToastRegionProps = {};

function GlobalToastRegions({}: TGlobalToastRegionProps) {
  // Subscribe to it.
  //   let state = useToastQueue(toastQueue);
  const stateQueue = useToastQueue<MyToast>(toastQueue);
  const ref = useRef(null);
  const { regionProps } = useToastRegion({}, stateQueue, ref);

  // Render toast region.
  return stateQueue.visibleToasts.length > 0
    ? createPortal(
        <div
          {...regionProps}
          ref={ref}
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 outline-none"
        >
          {stateQueue.visibleToasts.map((toast) => (
            <Toast key={toast.key} toast={toast} state={stateQueue} />
          ))}
        </div>,
        document.body,
      )
    : null;
}

export default GlobalToastRegions;
