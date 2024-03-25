import { twMerge } from "tailwind-merge";

type TCircleLoadingProps = { className?: string; classNameWrapper?: string };

const CircleLoading = ({ className, classNameWrapper }: TCircleLoadingProps) => {
  return (
    <div role="status" className={twMerge("flex items-center", classNameWrapper)}>
      <div
        className={twMerge(
          "loading h-5 w-5 animate-spin rounded-full border-2 border-t-primary-500",
          className,
        )}
      ></div>
      <span className="sr-only">...</span>
    </div>
  );
};

export default CircleLoading;
