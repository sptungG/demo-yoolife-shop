import { useRouter } from "next/router";

import { useAppSelector } from "@/redux/store";

import Navigate from "../shared/navigate";

function withoutAuth(WrappedComponent: any) {
  return function ComponentWithoutAuth() {
    const { query } = useRouter();
    const accessToken = useAppSelector((s) => s.auth.accessToken);

    if (!!accessToken) {
      const callbackUrl = (query?.callbackUrl as string) || "/";
      return <Navigate to={callbackUrl} />;
    }

    return <WrappedComponent />;
  };
}

export default withoutAuth;
