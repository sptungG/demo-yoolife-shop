import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassFunction<T> = (values: T) => string;
type ClassValues<T> = (ClassValue | ClassFunction<T>)[];

// Helper function to allow functions to be input to be calculated with react-aria-components
export function cnv<T>(values: T, ...inputs: ClassValues<T>) {
  const processedInputs = inputs.map((input) => {
    if (typeof input === "function") {
      return input(values);
    }
    return input;
  });

  return cn(processedInputs);
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(Math.floor(value));
};

export const formatNumber2 = (value: number) => {
  const internalValue = Math.floor(value);
  if (internalValue < 1000) return internalValue;
  if (internalValue > 1000000) return `${internalValue / 1000000}tr`;
  return `${internalValue / 1000}k`;
};

export const getRandomInt = (min = 100000, max = 999999) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const regexVNMobilePhone = /^(84|0[3|5|7|8|9])+([0-9]+$)\b/;

export const regexVNPhone =
  /^(84|0)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])+([0-9]+$)\b/;

export const regexVNPhoneAll =
  /^(84|0)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])|^(1800|1900)+([0-9]+$)\b/;

export const mappedAddressDetail = (address: any) => {
  return `${!!address?.wardName ? address.wardName + ", " : ""}${
    !!address?.districtName ? address.districtName + ", " : ""
  }${!!address?.provinceName ? address.provinceName : ""}`;
};

export const vietnameseSlug = (str: string, separator = "-") => {
  if (str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, "");
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\\=|\\<|\\>|\?|\/|,|\.|\\:|\\;|\\'|\\"|\\&|\\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      "",
    );
    str = str.replace(/ +/g, "-");

    if (separator) {
      return str.replace(/-/g, separator);
    }
    return str;
  } else return "";
};
