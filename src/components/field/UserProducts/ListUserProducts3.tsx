// hien thi top san pham tim kiem

import { Top2 } from "src/components/icons";
import { useGetItemsByUserQuery, useGetItemsQuery } from "src/redux/query/item.query";

function ListUserProducts3({ id, title }: { id: number; title: string }) {
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery();
  const { data: userCategory, isLoading: isLoadingUserCategory } = useGetItemsQuery();
  // const { data: userAllItems, isLoading: isLoadingAllItems } = useGetAllItemsQuery();
  // const items = userData?.result.data.filter((item: any) => (item.categoryId = id));
  //const items = (userData?.result.data || []).filter((item: any) => item.categoryId === id);

  const items = userData?.result.data;

  console.log(items);
  const sortItems = (items || []).slice().sort((a, b) => {
    return b.viewCount - a.viewCount;
  });
  console.log(sortItems);

  const topSearchItems = sortItems.slice(0, 6);

  const provinces = (topSearchItems || []).map((item: any) => JSON.parse(item.address));
  // const provinceName = provinces.map((item) => item.ProvinceName);
  // const images = (topSearchItems || []).map((item) => item.imageUrlList[0]);

  return (
    <div className="gap-6">
      <div className="py-4 text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-2  xl:gap-4">
        {!!topSearchItems &&
          topSearchItems?.map((item: any, index) => {
            return (
              <div key={item.id} className="cursor-pointer">
                <div className="relative rounded-lg">
                  <img
                    src={`${item.imageUrlList[0]}`}
                    className="aspect-square w-full rounded-lg bg-primary-150 object-cover "
                    alt="image"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                    }}
                  />
                  <Top2 className="absolute bottom-0 left-0 h-6" />
                </div>
                <div className="line-clamp-1 pt-2 text-lg font-medium text-primary-150">
                  {item.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ListUserProducts3;
