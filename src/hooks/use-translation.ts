import { useTranslation as useNTranslation } from "react-i18next";

import { vi } from "@/i18n/vi";

function useTranslation() {
  const { t, ...rest } = useNTranslation();
  return {
    // debug check i18nKeys
    t: (key: keyof typeof vi) => t(vi[key]),
    // t: (key: string) => t(key),
    ...rest,
  };
}

export default useTranslation;
