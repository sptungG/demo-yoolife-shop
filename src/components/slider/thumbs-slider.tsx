import React, { useEffect, useId, useState } from "react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

import NImage from "../shared/image";
import Video from "../shared/video";

type TThumbsSliderProps = {
  images?: string[];
  videos?: string[];
  direction?: "x" | "y";
  actions?: React.ReactNode;
  classNameSlideVideo?: TClassValue;
  classNameSlideImg?: TClassValue;
  classNameThumb?: TClassValue;
  classNameThumbWrapper?: TClassValue;
  classNameSlideWrapper?: TClassValue;
  classNameSlideFallback?: TClassValue;
  heightSlide?: string;
};

const ThumbsSlider = ({
  images = [],
  videos = [],
  direction = "x",
  actions,
  classNameSlideVideo,
  classNameSlideImg,
  classNameThumb,
  classNameThumbWrapper,
  classNameSlideWrapper,
  classNameSlideFallback,
  heightSlide = "200px",
}: TThumbsSliderProps) => {
  const ruid = useId();
  const [internalId, setInternalId] = useState<number>(0);
  const uid = ruid + internalId;
  const [activeThumb, setActiveThumb] = useState<SwiperType>();
  const listMedia = [...videos, ...images];
  useEffect(() => {
    // setInternalId((prev) => prev + 1);
    return () => {
      setActiveThumb(undefined);
    };
  }, []);
  return (
    <div className="relative w-full" key={uid}>
      {!listMedia?.length ? (
        <div className="product-images-slider-error">
          <NImage
            src={"https://ui-avatars.com/api/?name=1"}
            alt="1"
            className={cn("w-full object-cover opacity-50", classNameSlideFallback)}
            style={{ height: heightSlide }}
          />
        </div>
      ) : (
        <>
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={12}
            navigation={images.length > 1}
            modules={[Navigation, Thumbs, Autoplay]}
            grabCursor={true}
            autoplay={{ delay: 5000, pauseOnMouseEnter: false, disableOnInteraction: false }}
            thumbs={{ swiper: activeThumb }}
            className={cn(
              "swiper-navigation-1 mb-1.5 w-full overflow-hidden rounded ring-1 ring-gray-200 [&_.swiper-button-next]:right-1 [&_.swiper-button-prev]:left-1",
              classNameSlideWrapper,
            )}
            style={{ height: heightSlide }}
          >
            {videos?.map((item, index) => (
              <SwiperSlide
                key={uid + index + "video" + item}
                className="relative w-full overflow-hidden pb-[100%]"
              >
                <Video
                  controls
                  className={cn("absolute bottom-0 w-full object-cover", classNameSlideVideo)}
                  src={item}
                  type="video/mp4"
                  style={{ maxHeight: heightSlide }}
                />
              </SwiperSlide>
            ))}
            {images.map((item, index) => {
              let img = new Image();
              img.src = item;

              return (
                <SwiperSlide
                  key={uid + index + "image" + item}
                  className={cn(
                    "relative w-full overflow-hidden",
                    img.naturalWidth > img.naturalHeight ? "pb-0" : "pb-[100%]",
                  )}
                >
                  <NImage
                    src={item}
                    alt={String(index + 1)}
                    className={cn(
                      "w-full object-cover",
                      img.naturalWidth > img.naturalHeight ? "" : "absolute bottom-0",
                      classNameSlideImg,
                    )}
                    classNameFallback="opacity-50"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setActiveThumb}
            loop={direction === "x" && listMedia.length > 4}
            spaceBetween={10}
            slidesPerView={"auto"}
            modules={[Thumbs]}
            className={cn(
              "swiper-navigation-1 -ml-1 shrink-0 px-1 py-1",
              classNameThumbWrapper,
              listMedia.length < 2 && "hidden",
            )}
          >
            {videos.map((item, index) => (
              <SwiperSlide
                key={uid + "thumbs" + index + item}
                className={cn(
                  "!h-[50px] !w-[50px] cursor-pointer overflow-hidden rounded ring-1 ring-gray-200 [&.swiper-slide-thumb-active]:opacity-50 [&.swiper-slide-thumb-active]:ring-green2-500",
                  classNameThumb,
                )}
              >
                <Video
                  className="h-full w-full object-contain object-center"
                  src={item}
                  type="video/mp4"
                />
              </SwiperSlide>
            ))}
            {images.map((item, index) => (
              <SwiperSlide
                key={uid + "thumbs" + index + item}
                className={cn(
                  "!h-[50px] !w-[50px] cursor-pointer overflow-hidden rounded ring-1 ring-gray-200 [&.swiper-slide-thumb-active]:opacity-50 [&.swiper-slide-thumb-active]:ring-green2-500",
                  classNameThumb,
                )}
              >
                <NImage
                  src={item}
                  alt={String(index + 1)}
                  className="h-full w-full object-cover"
                  classNameFallback="opacity-50"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {actions && <div className="absolute bottom-[82px] right-2 z-[10]">{actions}</div>}
    </div>
  );
};

export default ThumbsSlider;
