import { LabelAriaProps } from "react-aria";
import { twMerge } from "tailwind-merge";

type TLabelProps = LabelAriaProps & {
  extra?: React.ReactNode;
  classNameWrapper?: string;
  className?: string;
  required?: boolean;
};

const Label = ({ label, extra, classNameWrapper, className, required, ...props }: TLabelProps) => {
  return (
    <div className={twMerge("relative flex flex-nowrap justify-between", classNameWrapper)}>
      <label
        {...props}
        className={twMerge(
          "pl-0.5 text-sm leading-6",
          required && "after:mr-0.5 after:text-red-500 after:content-['*']",
          className,
        )}
      >
        {label}
      </label>
      {extra}
    </div>
  );
};

export default Label;
