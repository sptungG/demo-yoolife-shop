import { ForwardRefRenderFunction, forwardRef, useId } from "react";
import { Link } from "react-aria-components";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import { GoogleSvg } from "../icons";
import TextField, { TTextFieldProps } from "./text-field";

type TLatLngFieldProps = TTextFieldProps & {
  classNameWrapper?: TClassValue;
};

const LatLngField: ForwardRefRenderFunction<HTMLInputElement, TLatLngFieldProps> = (
  { type = "password", value, onChange, classNameWrapper, ...props },
  forwardedRef,
) => {
  const uid = useId();
  const MAP_API_KEY = "AIzaSyC5MTim8olw6C3i3_uQj6tj-dfMEuGViZE";

  return (
    <div className={cn("flex flex-col", classNameWrapper)}>
      <TextField
        {...props}
        ref={forwardedRef}
        value={value}
        onChange={(e) => {
          onChange?.(e?.replace(/[^\d,.]+/g, "") || "");
        }}
        type={"text"}
        description={
          <div className="">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${
                value || "21.010157968391244,105.78869991247372"
              }`}
              className="flex items-center"
            >
              <span className="mr-1 underline">Xem vị trí trên bản đồ</span>
              <GoogleSvg width={14} />
            </Link>
          </div>
        }
        suffix={<></>}
      />

      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=${value || "21.010117801177774,105.7889324333525"}`}
        width="100%"
        height="160"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default forwardRef(LatLngField);
