import prettyBytes from "pretty-bytes";
import * as yup from "yup";

import i18n from "@/i18n";

yup.addMethod(
  yup.mixed<File | string>,
  "fileType",
  function fn(fileType = "image/png, image/jpg, image/jpeg") {
    return this.test("type", `${i18n.t("Định dạng ko đúng")} ${fileType}`, (value: any) => {
      if (!value) return true;
      if (typeof value === "string") return true;
      return ["image/png", "image/jpg", "image/jpeg"].includes(value?.type);
    });
  },
);
yup.addMethod(yup.mixed<File | string>, "fileSize", function fn(fileSize = 2000000) {
  return this.test(
    "fileSize",
    `${i18n.t("Kích thước quá lớn")} ( > ${prettyBytes(fileSize)})`,
    (value: any) => {
      if (!value) return true;
      if (typeof value === "string") return true;
      return value?.size <= fileSize;
    },
  );
});

export default yup;
