import { useState } from "react";
import { twMerge } from "tailwind-merge";
function FilterProducts() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [data, setData] = useState([
    { name: "Phù hợp nhất", id: 1, isActive: false },
    { name: "Mới nhất", id: 2, isActive: false },
    { name: "Bán chạy nhất", id: 3, isActive: false },
  ]);

  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const handleHover = (index: number) => {
    setHoveredOption(index);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
    handleSelectFilter(event.target.value);
  };

  const handleSelectFilter = (selectedName: string) => {
    const updatedData = data.map((item) => ({
      ...item,
      isActive: item.name === selectedName,
    }));
    setData(updatedData);
    setSelectedItem(selectedName);
  };

  return (
    <div className="flex w-full flex-row items-center">
      <div className="flex flex-row justify-start">
        <div className="flex flex-row items-center">
          <div className="pr-2 text-base text-primary-160">Sắp xếp theo</div>
          <div className="flex flex-row justify-center gap-1">
            {data.map((item, index) => (
              <div
                className={twMerge(
                  "m-0 cursor-pointer rounded   px-2 py-2.5 text-sm font-bold leading-4  outline-none transition-colors  xl:px-5",
                  item.isActive ? "bg-primary-160 text-white" : "bg-primary-170 text-primary-350",
                )}
                onClick={() => handleSelectFilter(item.name)}
                key={item.id}
                id={item.name}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden pl-5 sm:block">
          <select
            className="m-0 cursor-pointer rounded bg-primary-170  px-1 py-2 text-sm font-bold leading-4 outline-none   xl:px-8"
            id="quickFilter"
            value={selectedItem || ""}
            onChange={handleSelectChange}
          >
            {data.map((item, index) => (
              <option
                className={twMerge(
                  "rounded border-none bg-primary-170 px-2 py-1 text-primary-350 shadow-none outline-none ",

                  index === hoveredOption
                    ? "bg-primary-160 text-white"
                    : "hover:bg-primary-160 hover:text-white",
                )}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(10)}
                key={index}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterProducts;
