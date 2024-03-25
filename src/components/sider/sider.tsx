import { Building, Home, Newspaper, Settings2 } from "lucide-react";
import Link from "next/link";

type TSiderProps = {};

const Sider = ({}: TSiderProps) => {
  return (
    <nav className="flex h-full w-[68px] flex-col items-center justify-center gap-16 overflow-hidden px-2">
      <Link
        href={"/"}
        className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-full bg-green2-50 text-green2-400 shadow shadow-green2-100"
      >
        <Home className="w-6" />
      </Link>
      <div>
        <Link href={"/"}>
          <Newspaper className="w-6" />
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <Building className="w-6" />
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <Settings2 className="w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Sider;
