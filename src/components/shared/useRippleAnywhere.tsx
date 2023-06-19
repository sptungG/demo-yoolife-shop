import { MouseEventHandler, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const useRippleAnywhere = <T extends HTMLElement>(uid: string, className?: string) => {
  const handleClickRef = useRef<MouseEventHandler<T>>(() => null);

  useEffect(() => {
    const container = document.getElementById(uid);
    handleClickRef.current = (event) => {
      if (!!event) {
        const rect = container
          ? container.getBoundingClientRect()
          : {
              width: 0,
              height: 0,
              left: 0,
              top: 0,
            };
        const ripple = document.createElement("div");
        const width = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = width + "px";
        ripple.style.height = width + "px";
        ripple.style.left = event.clientX - rect.left - width / 2 + "px";
        ripple.style.top = event.clientY - rect.top - width / 2 + "px";
        ripple.className = twMerge(
          "absolute inset-0 z-0 animate-[rippleClick_0.8s_forwards] rounded-full bg-primary-100 bg-opacity-60",
          className,
        );
        container?.appendChild(ripple);

        setTimeout(() => {
          container?.removeChild(ripple);
        }, 1000);
      }
    };

    return () => {
      handleClickRef.current = () => null;
    };
  }, [uid, className]);

  return handleClickRef.current;
};

export default useRippleAnywhere;
