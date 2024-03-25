import { SearchIcon } from "lucide-react";
import { Input, Link } from "react-aria-components";

import useTranslation from "@/hooks/use-translation";
import { cn } from "@/utils/utils";

type THeaderSearchProps = {};

const HeaderSearch = ({}: THeaderSearchProps) => {
  const { t } = useTranslation();
  return (
    <div className="group relative w-full max-w-[340px] flex-shrink-0">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 lg:left-2.5">
        <SearchIcon className="w-[22px] text-green2-400 group-focus-within:text-green2-400" />
      </div>
      <Input
        placeholder={`${t("Tìm kiếm sản phẩm, danh mục")}...`}
        className="hidden h-[36px] w-full rounded-full border border-green2-200/80 bg-green2-50 pl-[38px] pr-[44px] outline-none placeholder:text-sm group-focus-within:border-green2-400 lg:flex"
      />
      <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 px-1 py-2 lg:flex">
        <div className="h-full border-l px-3 text-sm font-[600] text-green2-300 outline-none">
          ⌘K
        </div>
      </div>
    </div>
  );
};

export const HeaderSearchIcon = () => {
  return (
    <Link
      href="/items"
      className={({ isHovered }) =>
        cn(
          "flex h-[34px] w-[34px] items-center justify-center rounded-full bg-green2-100 text-green2-500 outline-none ring-1 ring-green2-500",
          isHovered && "shadow-md shadow-gray-100",
        )
      }
    >
      <SearchIcon size={22} className="" />
    </Link>
  );
};

export default HeaderSearch;
