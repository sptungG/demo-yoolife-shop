import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import { useId } from "react";

import { cn } from "@/utils/utils";

import imageLoader from "./next-image-loader";

/**
 * for internal images only (/assets,...)
 */
const NImage = ({
  src,
  alt,
  style,
  fill,
  ...props
}: Omit<NextImageProps, "alt"> & { alt?: string }) => {
  const uid = useId();
  return (
    <NextImage
      src={src}
      alt={alt || uid}
      sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
      loader={imageLoader}
      style={fill ? style : { height: "auto", ...style }}
      fill={fill}
      {...props}
    />
  );
};
export default NImage;
