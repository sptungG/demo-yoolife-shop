import { yupResolver } from "@hookform/resolvers/yup";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Button from "src/components/button/Button";
import Input from "src/components/field/Input";
import InputPassword from "src/components/field/InputPassword";
import backgroundImage from "src/components/images/background.png";
import yoolifeLogo from "src/components/images/yoolife-logo.png";
import * as yup from "yup";

const inter = Inter({ subsets: ["latin"] });

const loginSchema = yup.object({
  email: yup.string().email("Email chưa đúng định dạng!").required("Hãy nhập email của bạn!"),
  password: yup
    .string()
    .min(6, "Mật khẩu cần ít nhất 6 kí tự!")
    .required("Hãy nhập mật khẩu của bạn!"),
});

export default function Home() {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    register,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: any) => {
    await new Promise((res) => setTimeout(res, 5000));
    console.log(formData);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <div className="flex w-2/3 justify-between">
          <div className="flex cursor-pointer items-center">
            <Image src={yoolifeLogo} alt="logo" width="205" height="72" />
          </div>
          <div className="flex items-center">
            <span style={{ color: "#339FD9" }} className="text-2xl font-semibold">
              Đăng nhập
            </span>
          </div>
        </div>
        <div className="relative w-screen">
          <div className="absolute inset-0">
            <Image src={backgroundImage} alt="background image" fill />
          </div>
          <div className="relative flex h-full flex-col items-end justify-center p-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-sm flex-col rounded-2xl bg-white p-8"
            >
              <span style={{ color: "#339FD9" }} className="text-center font-semibold">
                Trải nghiệm và khám phá
              </span>
              <span style={{ color: "#339FD9" }} className="text-center font-semibold">
                Cùng với YooLife
              </span>
              <Input
                required
                type="email"
                label="Email:"
                placeholder="Tên tài khoản hoặc Email"
                className="rounded-2xl"
                errorMessage={errors.email?.message}
                {...register("email")}
              />
              <InputPassword
                label="Mật khẩu:"
                placeholder="Mật khẩu"
                className="rounded-2xl"
                errorMessage={errors.password?.message}
                {...register("password")}
              />

              <Button
                className="mt-2 bg-primary-700 px-7 py-2.5 font-medium text-white"
                icon={<BsFillPersonPlusFill className="mr-2" />}
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
