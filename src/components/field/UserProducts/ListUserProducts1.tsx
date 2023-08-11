// hien thi san pham thiet bi thong minh flash sale 50%

import { MapLocation } from "src/components/icons";
import { useGetItemsByUserQuery } from "src/redux/query/item.query";

function ListUserProducts1({ id, title }: { id: number; title: string }) {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery();
  //const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  // const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();
  // const items = userData?.result.data.filter((item: any) => (item.categoryId = id));
  //const items = (userData?.result.data || []).filter((item: any) => item.categoryId === id);

  const items = userData?.result.data;
  const smartDevices = items?.filter((item: any) => item.categoryId === id);

  console.log(smartDevices);

  const provinces = (items || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);
  //const images = (items || []).map((item) => item.imageUrlList[0]);

  return (
    <>
      {!!smartDevices && smartDevices?.length >= 1 ? (
        <div className="gap-6">
          <div className="py-4 text-2xl font-semibold">{title}</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-2  xl:gap-4">
            {!!smartDevices &&
              smartDevices?.map((item: any, index) => {
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-3xl bg-primary-250 p-2 text-sm"
                  >
                    <div className="rounded-lg">
                      <img
                        src={`${item.imageUrlList[0]}`}
                        className="aspect-square w-full rounded-lg object-fill "
                        alt="image"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                        }}
                      />
                    </div>
                    <div className="line-clamp-2 pt-2 text-sm text-primary-150">{item.name}</div>

                    <div className="flex justify-between">
                      <div className="flex items-center justify-between ">
                        <div className="my-1 flex h-4 items-center  rounded-md bg-gradient-to-r from-primary-1700  to-primary-1800 px-1 text-[10px] text-white xl:px-3">
                          50% Giảm
                        </div>
                      </div>
                      <div className="flex items-center justify-start">
                        <MapLocation className="w-2.5 text-yellow-400 xl:w-3.5" />
                        <div className=" flex h-4 items-center text-[10px] text-primary-150">
                          {provinceName[index]}
                        </div>
                      </div>
                    </div>
                    <div className=" text-base font-semibold">{item.minPrice}đ</div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ListUserProducts1;
