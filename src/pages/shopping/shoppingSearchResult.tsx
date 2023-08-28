import { useRouter } from "next/router";
import "react-dropdown/style.css";
import { MdLocationOn, MdStar } from "react-icons/md";
import FilterProducts from "src/components/field/filter/FilterProducts";
import FilterSearch from "src/components/field/filter/FilterSearch";
import LeftTaskbar from "src/components/pages/LeftTaskbar";
import RightTaskbar from "src/components/pages/RightTaskbar";
import ShoppingHeader from "src/components/pages/ShoppingHeader";
import { useGetItemsByUserQuery } from "src/redux/query/item.query";
function ShoppingSearchResult() {
  // const [items, setItems] = useState([]);

  // const handleSearchSuccess = (result: any) => {
  //   setItems(result);
  // };
  const router = useRouter();
  const searchQuery = router.query.search as string;
  console.log(searchQuery);
  const { data: userData, isLoading: isLoadingUserData } = useGetItemsByUserQuery({
    search: `${searchQuery}`,
  });
  const items = userData?.result.data;
  console.log(items);

  const provinces = (items || []).map((item: any) => JSON.parse(item.address));
  const provinceName = provinces.map((item) => item.ProvinceName);

  return (
    <>
      <div className="flex w-full text-center lg:grid  lg:grid-cols-6">
        <LeftTaskbar />
        <div className="w-full  gap-2 bg-primary-250 md:col-span-4 md:col-start-2 lg:px-4">
          <ShoppingHeader />
          <div className="mb-2 flex items-center justify-between bg-white px-5 pb-4 pt-2  text-xl font-semibold text-primary-350">
            <FilterProducts />
            <FilterSearch />
          </div>
          <div className="mb-2 bg-white px-5 pb-4 pt-2  text-xl font-semibold text-primary-350">
            <div className="grid grid-cols-2  gap-4 text-start md:grid-cols-3 lg:grid-cols-5  lg:gap-2 xl:gap-4">
              {items?.length === 0 ? (
                <div className="col-span-2 flex items-center justify-center text-lg md:col-span-3 lg:col-span-5">
                  Hiện chưa có sản phẩm phù hợp
                </div>
              ) : (
                items?.map((item: any, index) => {
                  return (
                    <div
                      key={item.id}
                      className="relative cursor-pointer rounded-3xl bg-primary-250 p-2 "
                    >
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
                            {item.ratePoint}{" "}
                            <span className="text-primary-150">({item.countRate})</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <MdLocationOn className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                          <p className="text-base text-primary-150 lg:text-xs">
                            {provinceName[index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <RightTaskbar />
      </div>
    </>
  );
}

export default ShoppingSearchResult;
