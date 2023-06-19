export type DateISO = string;
export type ID = number;

export type TBaseFilter = {
  keyword?: string;
  sort?: string;
  page: number;
  limit: number;
};

export type TLocale = "vi" | "en" | "ko";
