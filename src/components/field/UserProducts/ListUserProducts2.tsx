// hien thi top san pham thiet bi  dien

import { Tops2 } from "src/components/icons";
import { useGetItemsByUserQuery, useGetItemsQuery } from "src/redux/query/item.query";

function ListUserProducts2({ id, title }: { id: number; title: string }) {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery();
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  // const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();
  // const items = userData?.result.data.filter((item: any) => (item.categoryId = id));
  //const items = (userData?.result.data || []).filter((item: any) => item.categoryId === id);

  const items = userData?.result.data;

  const elecDevices = items?.filter((item: any) => item.categoryId === id);
  console.log(elecDevices);

  const provinces = (elecDevices || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);
  const images = (elecDevices || []).map((item) => item.imageUrlList[0]);

  return (
    <>
      {!!elecDevices && elecDevices?.length >= 1 ? (
        <div className="gap-6">
          <div className="py-4 text-2xl font-semibold">{title}</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8 lg:gap-2  xl:gap-4">
            {!!elecDevices &&
              elecDevices?.map((item: any, index) => {
                return (
                  <div key={item.id} className="cursor-pointer">
                    {/* <Tops1 className="w-full rounded-2xl bg-primary-250" /> */}
                    <img
                      src={`${item.imageUrlList[0]}`}
                      className="aspect-square w-full rounded-lg bg-primary-150 bg-contain object-cover"
                      alt="image"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                      }}
                    />
                    <Tops2 className="w-full" />
                    <div className="line-clamp-1 pt-2 text-center text-lg font-medium  text-primary-150">
                      {item.name}
                    </div>
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

export default ListUserProducts2;
