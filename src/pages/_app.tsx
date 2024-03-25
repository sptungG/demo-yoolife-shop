import "mac-scrollbar/dist/mac-scrollbar.css";
import type { AppProps } from "next/app";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/virtual";

import Providers from "@/components/providers/providers";
import "@/styles/flipdown.min.css";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
