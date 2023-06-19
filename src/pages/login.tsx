import { useLoginMutation } from "src/redux/query/auth.query";

function Page() {
  const [loginMutate, { isLoading }] = useLoginMutation();

  const handleSubmit = (formData: any) => {
    loginMutate(formData)
      .unwrap()
      .then(({ result }) => {
        console.log("Đăng nhập thành công");
      })
      .catch((err) => {
        console.error("Đăng nhập thất bại");
      });
  };

  return <div>Page</div>;
}

export default Page;
