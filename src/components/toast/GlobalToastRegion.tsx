import { AriaToastProps, useToastRegion } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { ToastQueue, useToastQueue } from "@react-stately/toast";
import { useRef } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

type TToast = {
  title?: string;
  description?: string;
  state?: string;
};

export type ToastProps = AriaToastProps<TToast> & {
  state: ToastState<TToast>;
};

export const toastQueue = new ToastQueue<TToast>({
  maxVisibleToasts: 5,
});

type TGlobalToastRegionProps = {};

function GlobalToastRegion({}: TGlobalToastRegionProps) {
  const stateQueue = useToastQueue<TToast>(toastQueue);
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

export default GlobalToastRegion;
