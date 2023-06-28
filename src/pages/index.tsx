import { yupResolver } from "@hookform/resolvers/yup";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Button from "src/components/button/Button";
import Input from "src/components/field/Input";
import InputPassword from "src/components/field/InputPassword";
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col">
          <Input
            required
            type="email"
            label="Email:"
            placeholder="you@exmaple.com"
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <InputPassword
            label="Mật khẩu:"
            placeholder="••••••••"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          <Button
            className="mt-2 bg-primary-700 px-7 py-2.5 font-medium text-white"
            icon={<BsFillPersonPlusFill className="mr-2" />}
            type="submit"
            isLoading={isSubmitting}
          >
            RegisterRegisterRegisterRegisterRegisterRegisterRegisterRegisterRegisterRegister
          </Button>
        </form>
      </div>
    </main>
  );
}