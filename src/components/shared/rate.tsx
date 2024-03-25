import { StarHalfIcon, StarIcon } from "lucide-react";
import React, { useId } from "react";

import { TClassValue } from "@/types/global-type";
import { cn } from "@/utils/utils";

type TRate5Props = {
  value?: number;
  classNameWrapper?: TClassValue;
  size?: number;
};

const Rate5 = ({ value = 0, size = 16, classNameWrapper }: TRate5Props) => {
  const uid = useId();
  return (
    <div className={cn("flex items-center", classNameWrapper)}>
      {Array(5)
        .fill(null)
        .map((_, index) =>
          value > index && value < index + 1 ? (
            <div key={uid + index} className="relative z-0">
              <StarHalfIcon
                size={size}
                className={cn(
                  "absolute top-0 z-10",
                  value > index && "fill-orange-300 text-orange-300",
                )}
              />
              <StarIcon size={size} className="z-0 text-gray-300" />
            </div>
          ) : (
            <StarIcon
              key={uid + index}
              size={size}
              className={cn("text-gray-300", value > index && "fill-orange-300 text-orange-300")}
            />
          ),
        )}
    </div>
  );
};

export default Rate5;
