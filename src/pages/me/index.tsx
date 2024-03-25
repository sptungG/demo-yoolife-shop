import { t } from "i18next";
import { ArrowLeft, CircleUserRound, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-aria-components";

import Button from "@/components/button/Button";
import withAuth from "@/components/hoc/with-auth";
import { YooLogoSvg } from "@/components/icons";
import Layout01 from "@/components/layout/Layout01";
import { useAppSelector } from "@/redux/store";

const Page = () => {
  const userState = useAppSelector((s) => s.user.data);

  return (
    <Layout01 className="p-0" header={<></>}>
      <div className="mx-auto w-full max-w-[768px]">
        <div className="flex items-center justify-between bg-white p-3">
          <Link href="/">
            <ArrowLeft size={25} className="text-green2-400" />
          </Link>
          <div>{t("Tôi")}</div>
          <div>
            <Settings size={25} className="text-green2-400" />
          </div>
        </div>
        <div className="relative h-40 bg-gradient-to-b from-green2-500 to-green2-400 p-2">
          <ShoppingCart size={25} className="absolute right-3 top-3 cursor-pointer text-white" />
          <div className="absolute bottom-3 left-3 flex cursor-pointer flex-row items-center gap-2">
            <CircleUserRound size={40} className=" text-white " />
            <div>
              <div className="text-white">{userState?.fullName}</div>
              <div className="rounded-lg bg-white px-2 text-[8px] text-green2-500 ">Thành viên</div>
            </div>
          </div>
        </div>
        <div className="my-2 bg-white p-3">{t("Đơn mua")}</div>
        <div className="flex  flex-col items-center justify-center gap-2 bg-white py-10 text-center">
          <div>
            <YooLogoSvg className="h-12 w-12 rounded-lg border-2 border-green2-600 p-1" />
          </div>
          <div className="font-semibold">{t("Tải ngay ứng dụng Yoolife")}</div>
          <div className="text-sm">
            {t("Chuyển sang ứng dụng để xem chi tiết hơn lịch sử mua hàng")}
          </div>
          <div>
            <Button className="cursor-pointer rounded-md bg-green2-400 text-white">
              <Link target="_blank" href="https://play.google.com/store/search?q=yoolife&c=apps">
                Tải ứng dụng
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout01>
  );
};

export default withAuth(Page);
