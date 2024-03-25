import {
  AndroidFillSvg,
  AppStoreFillSvg,
  EmailOutlinedSvg,
  FbFillSvg,
  MapOutlinedSvg,
  PhoneOutlinedSvg,
  TiktokFillSvg,
  YooLogoSvg,
  YooSvg,
  YoutubeFillSvg,
} from "@/components/icons";
import { cn } from "@/utils/utils";

import NImage from "../shared/next-image";

type TFooterProps = {
  className?: string;
};

const Footer = ({ className }: TFooterProps) => {
  return (
    <footer className={cn("relative mx-auto flex flex-col justify-center", className)}>
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-0">
          <div className="inline-flex flex-nowrap items-end px-2">
            <YooLogoSvg className="h-[44px] w-[44px]" />
            <div className="flex flex-nowrap items-baseline">
              <span className="flex items-center justify-center">
                <YooSvg height={26} />
              </span>
              <span className="logo-text-gradient-green ml-0 text-[2.2rem] font-[700]">life</span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex flex-col gap-4 px-2 xl:flex-row">
          <div className="">
            <div className="mb-4 text-xl font-[700] text-green2-600">
              Công ty Cổ phẩn YooTek Holdings
            </div>
            <div className="mb-2 text-lg font-[600] text-green2-500">Liên hệ với chúng tôi</div>
            <div className="mb-2 flex cursor-pointer items-center text-base text-gray-500 hover:underline">
              <EmailOutlinedSvg className="h-[18px] w-[18px]" />
              <a href="mailto:info@yootek.com" className="ml-2.5">
                <b>Email:</b> info@yootek.com
              </a>
            </div>
            <div className="mb-2 flex cursor-pointer items-center text-base text-gray-500 hover:underline">
              <PhoneOutlinedSvg className="h-[18px] w-[18px]" />
              <a href="tel:+842473011968" className="ml-2.5">
                <b>Số điện thoại:</b> +84 24 7301 1968
              </a>
            </div>
            <div className="mb-2 flex items-center text-gray-500">
              <MapOutlinedSvg className="h-[18px] w-[18px]" />
              <div className="ml-2.5 text-base font-[700]">Văn phòng:</div>
            </div>
            <div className="flex flex-col gap-1 text-base">
              <p className="cursor-pointer text-gray-500 hover:underline">
                <b>Trụ sở chính:</b> Tầng 3, Tòa Audi, Số 8 Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội.
              </p>
              <p className="cursor-pointer text-gray-500 hover:underline md:whitespace-nowrap">
                <b>Showroom:</b> D02-L38, Khu An Vượng Villa, Khu đô thị Dương Nội, Quận Hà Đông, Hà
                Nội.
              </p>
              <p className="cursor-pointer text-gray-500 hover:underline">
                <b>HCM Office:</b> Tầng 10, Tòa Sài Gòn Paragon, Số 3 Nguyễn Lương Bằng, Phường Tân
                Phú, Quận 7, TP. HCM.
              </p>
              <p className="cursor-pointer text-gray-500 hover:underline">
                <b>Trung tâm R&D:</b> 5/167 Herring Rd, Macquarie Park, NSW 2113, Australia.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="mb-2 text-xl font-[600] text-green2-500">Ứng dụng</div>
              <div className="mb-4 text-base">
                <div className="mb-4 flex cursor-pointer items-center text-gray-500 hover:underline">
                  <AppStoreFillSvg className="h-6 w-6" />
                  <a
                    href="https://apps.apple.com/vn/app/imaxtek-smartlife/id1672904034?l=vi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2.5"
                  >
                    Yoolife (IOS)
                  </a>
                </div>
                <div className="flex cursor-pointer items-center text-gray-500 hover:underline">
                  <AndroidFillSvg className="h-6 w-6" />
                  <a
                    href="https://play.google.com/store/apps/details?id=com.imax.smartlife&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2.5 whitespace-nowrap"
                  >
                    Yoolife (Android)
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 whitespace-nowrap text-lg font-[600] text-green2-500">
                Kết nối với YooTek
              </div>
              <div className="flex flex-nowrap gap-4 text-gray-500">
                <a
                  href="https://www.facebook.com/IMAXIoTPlatform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center hover:text-blue-600"
                >
                  <FbFillSvg className="h-8 w-8" />
                </a>
                <a
                  href="https://www.tiktok.com/@imaxtek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center hover:text-black"
                >
                  <TiktokFillSvg className="h-8 w-8" />
                </a>
                <a
                  href="https://www.youtube.com/@imaxsmartlife9418/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center hover:text-red-500"
                >
                  <YoutubeFillSvg className="h-9 w-9" />
                </a>
              </div>
            </div>
          </div>

          {/* <div className="flex-shrink-0">
            <NImage
              src="/assets/online-gov-vn.png"
              alt=""
              width={220}
              height={0}
              quality={100}
              className="mx-auto flex-shrink-0 opacity-70"
            />
          </div> */}
        </div>

        <div className="flex flex-col items-center justify-center pb-6 pt-2 text-center text-base text-gray-500 xl:pb-[20px] xl:pt-[56px]">
          <div className="">Copyright © 2023 YooTek Holdings.</div>
          <div className="">All Right Reserved</div>
        </div>
      </div>
    </footer>
  );
};

export const SmFooter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "-z-10 flex items-center gap-x-6 gap-y-3 text-xs text-gray-400 xl:flex-col xl:items-start xl:gap-1",
        className,
      )}
    >
      <a
        href="https://seller.imaxhitech.com/"
        className="opacity-50 hover:underline hover:opacity-100"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kênh người bán
      </a>

      <div className="flex items-center opacity-50 hover:opacity-100">
        <span>Tải ứng dụng:</span>
        <div className="ml-2 flex flex-nowrap gap-2 text-gray-400">
          <a
            href="https://apps.apple.com/vn/app/imaxtek-smartlife/id1672904034?l=vi"
            className="hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppStoreFillSvg className="w-5" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.imax.smartlife&pli=1"
            className="hover:text-green-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AndroidFillSvg className="w-5" />
          </a>
        </div>
      </div>

      <div className="flex items-center opacity-50 hover:opacity-100">
        <span>Kết nối qua:</span>
        <div className="ml-2 flex flex-nowrap gap-2 text-gray-400">
          <a
            href="https://www.facebook.com/IMAXIoTPlatform"
            className="flex cursor-pointer items-center justify-center hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FbFillSvg className="w-[18px]" />
          </a>
          <a
            href="https://www.tiktok.com/@imaxtek"
            className="flex cursor-pointer items-center justify-center hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokFillSvg className="w-3.5" />
          </a>
          <a
            href="https://www.youtube.com/@imaxsmartlife9418/videos"
            className="flex cursor-pointer items-center justify-center hover:text-red-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeFillSvg className="w-5" />
          </a>
        </div>
      </div>
      <div className="opacity-50">© 2023 YooTek Holdings.</div>
    </div>
  );
};

export default Footer;
