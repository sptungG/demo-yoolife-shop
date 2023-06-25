import { yupResolver } from "@hookform/resolvers/yup";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
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
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    ></main>
  );
}
