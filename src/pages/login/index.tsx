import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button as RAButton } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import Button from "@/components/button/Button";
import Checkbox from "@/components/field/checkbox";
import PasswordField from "@/components/field/password-field";
import VariantTextField from "@/components/field/variant-input";
import Footer from "@/components/footer/footer";
import withoutAuth from "@/components/hoc/without-auth";
import { AppleSvg, FacebookSvg, GoogleSvg, YooSvg } from "@/components/icons";
import NImage from "@/components/shared/next-image";
import SEO from "@/components/shared/seo";
import useTranslation from "@/hooks/use-translation";
import i18n from "@/i18n";
import { authApi } from "@/redux/query/auth-query";
import yup from "@/utils/yup";

const schema = yup.object({
  userNameOrEmailAddress: yup.string().required(i18n.t("required-field")),
  password: yup.string().required(i18n.t("required-password")),
  rememberClient: yup.boolean().default(false),
});

const Page = ({}) => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { password: "", rememberClient: false, userNameOrEmailAddress: "" },
  });

  const [loginMutate, { isLoading }] = authApi.useLoginMutation();

  const onSubmitForm = handleSubmit(async (formData) => {
    try {
      const res = await loginMutate(formData).unwrap();
      toast.success(t("Đăng nhập thành công"));
      reset();
    } catch (err: any) {
      reset();
      if (!!err?.data?.error?.details) {
        toast.error(err.data.error.details);
      } else if (!!err?.data?.error?.message) {
        toast.error(err.data.error.message);
      } else {
        toast.error(t("Đã có lỗi xảy ra khi đăng nhập"));
      }
    }
  });

  return (
    <>
      <SEO title="Đăng nhập | Shop Yoolife" description="Yoolife AIoT Platform" />
      <header className="fixed left-0 top-0 flex h-[64px] w-full items-center justify-center bg-transparent px-6 sm:justify-start">
        <div className="flex items-baseline">
          <YooSvg className="w-14" />
          <div className="text-[30px] font-[600] leading-none text-green2-400">Seller</div>
        </div>
      </header>
      <section className="relative flex h-[100dvh] flex-col justify-center">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-between px-4 sm:flex-row">
          <div className="relative mb-4 hidden flex-col lg:flex">
            <NImage
              src="/assets/logo-with-text.png"
              width={340}
              height={0}
              quality={100}
              className=""
            />
            <p className="text-center text-lg text-slate-400">
              {t("Một sản phẩm của của nền tảng")}
            </p>
            <p className="text-center text-lg text-slate-400">YooTek IoT Platform</p>
          </div>
          <div className="flex w-full max-w-[420px] flex-col rounded-3xl bg-white px-9 py-8">
            <p className="text-center text-2xl font-[500] text-green3-500">
              {t("Trải nghiệm và khám phá")}
            </p>
            <p className="mb-8 text-center text-2xl font-[500] text-green3-500">
              {`${t("cùng với")} YooSeller`}
            </p>

            <form className="mb-3 flex flex-col" noValidate onSubmit={onSubmitForm}>
              <Controller
                control={control}
                name="userNameOrEmailAddress"
                render={({ field, fieldState }) => (
                  <VariantTextField
                    label={t("Tên tài Khoản Hoặc Email")}
                    variant="outlined"
                    placeholder="you@example.com..."
                    isRequired
                    autoComplete="off"
                    className="mb-6"
                    classNameInput="rounded-xl"
                    classNameErrMsg="indent-[4px] mt-1"
                    errorMessage={`•${fieldState.error?.message}`}
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <PasswordField
                    label={t("Mật khẩu")}
                    variant="outlined"
                    placeholder="••••••••"
                    isRequired
                    autoComplete="off"
                    className="mb-6"
                    classNameInput="rounded-xl"
                    classNameErrMsg="indent-[4px] mt-1"
                    errorMessage={`•${fieldState.error?.message}`}
                    isInvalid={fieldState.invalid}
                    {...field}
                  />
                )}
              />

              <div className="mb-6 flex justify-between gap-1">
                <Controller
                  control={control}
                  name="rememberClient"
                  render={({ field: { value, ...field }, fieldState }) => (
                    <Checkbox isSelected={value} {...field} className="gap-x-2">
                      <div className="text-sm text-gray-600">{t("Ghi nhớ đăng nhập")}</div>
                    </Checkbox>
                  )}
                />

                <Link
                  href={"/forgot-password"}
                  className="text-sm text-primary-500 hover:underline"
                >
                  {t("Quên mật khẩu")}?
                </Link>
              </div>

              <Button
                isLoading={isLoading}
                type="submit"
                className="rounded-xl bg-primary-500 py-3 font-[600] text-white"
              >
                {t("Đăng nhập")}
              </Button>
            </form>

            <p className="mb-3 text-center text-sm text-primary-500">{t("Hoặc đăng nhập với")}</p>
            <div className="mb-8 flex items-center gap-4 self-center">
              <RAButton className="flex items-center justify-center rounded-full hover:shadow-md hover:shadow-blue-300/50">
                <FacebookSvg className="h-10 w-10 text-blue-600" />
              </RAButton>
              <RAButton className="flex h-11 w-11 items-center justify-center rounded-full border hover:shadow-md hover:shadow-gray-300/50">
                <GoogleSvg className="h-9 w-9" />
              </RAButton>
              <RAButton className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 hover:shadow-md hover:shadow-gray-900/50">
                <AppleSvg className="-mt-0.5 h-7 w-7 text-white" />
              </RAButton>
            </div>

            <div className="flex gap-1 self-center text-sm text-gray-400">
              <span>{t("Bạn chưa có tài khoản")}?</span>
              <Link href={"/register"} className="text-sm text-primary-500 hover:underline">
                {t("Đăng ký ngay")}
              </Link>
            </div>
          </div>
        </div>
        <DevTool control={control} />
        <NImage src="/assets/login-bg.png" fill quality={100} className="-z-10 object-cover" />
      </section>
      <Footer />
    </>
  );
};

export default withoutAuth(Page);
