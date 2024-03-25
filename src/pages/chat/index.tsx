import React from "react";

import withAuth from "@/components/hoc/with-auth";
import Layout01 from "@/components/layout/Layout01";

type TPageProps = {};

const Page = ({}: TPageProps) => {
  return <Layout01>Page</Layout01>;
};

export default withAuth(Page);
