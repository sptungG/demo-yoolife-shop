//hien thi cac san pham khac

import { useEffect, useState } from "react";
import { MdLocationOn, MdStar } from "react-icons/md";
import { useGetItemsByUserQuery, useGetItemsQuery } from "src/redux/query/item.query";

function ListUserProducts({ id, title }: { id: number; title: string }) {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery({
    search: "name",
    id: 2,
  });
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();

  const [items, setItems] = useState(userData?.result.data.slice(0, 5));
  // console.log(items);
  const provinces = (items || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);

  // const images = (items || []).map((item) => item.imageUrlList[0]);

  useEffect(() => {
    if (userData?.result.data && userData?.result.data.length > 0)
      setItems(userData?.result.data.slice(0, 5));
  }, [userData]);

  return (
    <div className="gap-6">
      <div className="py-4 text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-2  gap-4 text-start md:grid-cols-3 lg:grid-cols-5  lg:gap-2 xl:gap-4">
        {!!items &&
          items?.map((item: any, index) => {
            return (
              <div key={item.id} className="relative cursor-pointer rounded-xl bg-primary-250 p-2 ">
                <img
                  src={`${item.imageUrlList[0]}`}
                  className="aspect-square w-full rounded-lg bg-contain object-cover "
                  alt="image"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                  }}
                />
                <div className="line-clamp-2 pt-2 text-lg font-semibold text-primary-150 lg:text-xs">
                  {item.name}
                </div>
                <div className="grid grid-cols-1 items-center sm:flex sm:justify-between ">
                  <div className="flex items-center justify-between ">
                    <div className="my-1 flex items-center rounded bg-gradient-to-r from-primary-1500 to-primary-1600 px-1 text-lg text-white lg:h-4 lg:text-[10px] xl:px-2 xl:text-xs">
                      {item.minPrice}đ
                    </div>
                  </div>
                  <div className=" text-lg text-primary-150 line-through lg:text-[10px] xl:text-xs">
                    {item.maxPrice}đ
                  </div>
                </div>
                <div className="flex justify-between text-xl text-yellow-400 ">
                  <div className="flex items-center justify-between">
                    <MdStar className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                    <p className="text-base text-primary-50 lg:text-xs">
                      {item.ratePoint} <span className="text-primary-150">({item.countRate})</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <MdLocationOn className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                    <p className="text-base text-primary-150 lg:text-xs">{provinceName[index]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        <div
          onClick={() => {
            setItems(userData?.result.data);
          }}
          className="ms:col-span-3 flex cursor-pointer items-center justify-center  rounded-xl bg-primary-250 py-2 text-base font-bold text-primary-150 lg:col-start-2 lg:col-end-5"
        >
          Xem thêm
        </div>
      </div>
    </div>
  );
}

export default ListUserProducts;
