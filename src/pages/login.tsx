import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { Checkbox } from "react-aria-components";
import { useForm } from "react-hook-form";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdCheck, MdFacebook } from "react-icons/md";
import Button from "src/components/button/Button";
import {
  AndroidIcon,
  AppstoreIcon,
  EmailIcon,
  OfficeIcon,
  PhoneIcon,
  TiktokIcon,
  TwitterIcon,
  YoolifeIContent,
  YoolifeIHeader,
} from "src/components/icons";
import backgroundImage from "src/components/images/background.png";
import logoBCT1 from "src/components/images/logoBCT1.png";
import { toastQueue } from "src/components/toast/GlobalToastRegion";
import { useLoginMutation } from "src/redux/query/auth.query";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Hãy nhập email của bạn!"),
  password: yup
    .string()
    .min(6, "Mật khẩu cần ít nhất 6 kí tự!")
    .required("Hãy nhập mật khẩu của bạn!"),
});

function Page() {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    register,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const [loginMutate, { isLoading }] = useLoginMutation();

  const onSubmit = (formData: any) => {
    loginMutate(formData)
      .unwrap()
      .then(({ result }) => {
        console.log("Đăng nhập thành công");
      })
      .catch((err) => {
        toastQueue.add({ title: "Đăng nhập thất bại" }, { timeout: 3000 });
      });
  };

  return (
    <>
      <header className="mx-auto mb-6 flex w-full max-w-[1000px] justify-between px-6">
        <div className="flex cursor-pointer items-center pt-6">
          <YoolifeIHeader className="h-20 w-40" />
        </div>
        <div className="flex items-end">
          <span className="cursor-pointer text-3xl font-semibold text-primary-50">Đăng nhập</span>
        </div>
      </header>
      <div className="relative flex w-full">
        <div className="absolute inset-0">
          <Image className="bg-contain" src={backgroundImage} alt="background image" fill />
        </div>
        <div className="relative flex w-full py-6">
          <div className="mx-auto flex w-full max-w-[1000px] justify-center md:justify-between ">
            <div className=" hidden self-center text-center text-2xl font-light md:block ">
              <YoolifeIContent className="lg:h-96 lg:w-96" />
              <div className="pt-6">Một sản phẩm của nền tảng </div>
              <div>YooTek IOT Platform </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-10 me-0 flex w-fit flex-col rounded-2xl bg-white p-8 md:me-8 lg:me-0"
            >
              <span className="text-center text-2xl font-semibold text-primary-50">
                Trải nghiệm và khám phá
              </span>
              <span className="text-center text-2xl font-semibold text-primary-50">
                Cùng với YooLife
              </span>

              <input
                className="my-5 rounded-2xl border-2 border-primary-50 bg-white  p-2 text-base focus-visible:border-primary-50"
                type="text"
                placeholder="Tên tài Khoản Hoặc Email"
                {...register("email")}
              />

              <input
                className=" rounded-2xl border-2 border-primary-50 bg-white  p-2 text-base focus-visible:border-primary-50"
                type="password"
                placeholder="Mật khẩu"
                {...register("password")}
              />
              <div className="flex justify-between">
                <Checkbox className="my-5 mr-10  flex cursor-pointer items-center justify-start">
                  {({ isSelected }) => (
                    <>
                      <div
                        className={twMerge(
                          "flex h-5 w-5 items-center justify-center rounded border-2  border-primary-50 transition-all",
                          isSelected ? "bg-primary-50" : "",
                        )}
                      >
                        <MdCheck className="text-white" />
                      </div>
                      <span className="ps-2 font-normal ">Ghi nhớ đăng nhập</span>
                    </>
                  )}
                </Checkbox>
                <span className="flex cursor-pointer items-center text-primary-50">
                  Quên mật khẩu ?
                </span>
              </div>

              <Button
                // style={{ backgroundColor: "#339FD9" }}
                className="mt-4 rounded-2xl bg-primary-50 px-7 py-2.5 text-base font-semibold text-white"
                // icon={<BsFillPersonPlusFill className="mr-2" />}
                type="submit"

                // isLoading={isSubmitting}
              >
                Đăng nhập
              </Button>
              <span className="my-4 cursor-pointer text-center text-primary-50">
                Hoặc đăng nhập với
              </span>
              <div className="flex justify-around px-10 py-9">
                <MdFacebook style={{ color: "#1877F2" }} className="h-12 w-12 cursor-pointer " />
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-primary-1000 ">
                  <FcGoogle className="h-8 w-8" />
                </div>
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-primary-1000 bg-black ">
                  <FaApple className="h-9 w-9 text-white" />
                </div>
              </div>
              <div className="cursor-pointer text-center">
                Bạn chưa có tài khoản?
                <span className="text-primary-50"> Đăng ký ngay</span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full p-5 text-primary-150  lg:max-w-[1000px] ">
        <div className="m-0 my-7 p-0 text-3xl font-medium">CÔNG NGHỆ CỔ PHẦN YOOTEK HOLDINGS</div>
        <div className="m-0 grid grid-cols-1 gap-4 p-0 pb-7 md:grid-cols-3">
          <div className="">
            <div className="pb-7 text-xl font-medium ">Liên hệ với chúng tôi</div>
            <div className="flex items-center justify-start pb-4 text-sm font-medium">
              <EmailIcon className="me-1 h-3 w-3" />
              <span>Info@imaxhitech.com</span>
            </div>
            <div className="flex items-center justify-start pb-4 text-sm font-medium">
              <PhoneIcon className="me-1 h-3 w-3" />
              <span>+84 24 7301 1968</span>
            </div>
            <div className="flex items-center justify-start pb-4 text-sm font-medium">
              <OfficeIcon className="me-1 h-3 w-3" />
              <span>Văn phòng:</span>
            </div>
            <div className="text-sm font-normal">
              Trụ sở chính: Tầng 3, Tòa Audi, Số 8 Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà nội
            </div>
            <div className="text-sm font-normal">
              Showroom: D02-L38, An Vuong Villa block, Duong Noi, Ha Dong, Hà nội.
            </div>
            <div className="text-sm font-normal">
              HCM Office: Block A1, 312 Lạc Long Quân, Quận 11, Thành phố Hồ Chí Minh.
            </div>
            <div className="text-sm font-normal">
              Trung tâm RD: 5/167 Herring Rd, Macquarie Park, NSW 2113.
            </div>
          </div>
          <div className="lg:ps-20">
            <div className="pb-7 text-xl font-medium ">Ứng dụng</div>
            <div className="flex items-center justify-start pb-4 text-sm font-medium">
              <AppstoreIcon className="me-1 h-4 w-4" />
              <span>YooLife (IOS)</span>
            </div>
            <div className="flex items-center justify-start pb-4 text-sm font-medium">
              <AndroidIcon className="me-1 h-4 w-4" />
              <span>IMAX (Android)</span>
            </div>

            <div className="pe-10 ">
              <div>Kết nối với YooTek</div>
              <div className="flex justify-start py-6">
                <MdFacebook className="me-2 h-8 w-8 cursor-pointer" />
                <TwitterIcon className="me-2 h-8 w-8 cursor-pointer" />
                <TiktokIcon className="h-7 w-7 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-start">
            <Image src={logoBCT1} alt="logoBCT1" />
          </div>
        </div>
        <div className="m-0 cursor-pointer  py-8 text-center">
          <span>Copyright © 2021 &nbsp; YooTek Holdings All &nbsp; Right Reserved</span>
        </div>
      </div>
    </>
  );
}

export default Page;
