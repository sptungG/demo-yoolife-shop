import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronRightIcon, ShoppingCartIcon, StoreIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useId, useState } from "react";
import { Button, Link } from "react-aria-components";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import Checkbox from "@/components/field/checkbox";
import NumberField from "@/components/field/number-field";
import { Header01 } from "@/components/header/header";
import HeaderBreadcrumbs from "@/components/header/header-breadcrumbs";
import withAuth from "@/components/hoc/with-auth";
import Layout01 from "@/components/layout/Layout01";
import ItemCartActions from "@/components/popover/item-cart-actions";
import Image from "@/components/shared/image";
import useGetCart from "@/hooks/use-get-cart";
import { itemApi } from "@/redux/query/item-query";
import { setCheckoutSelectedItems } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch } from "@/redux/store";
import { TCart } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";
import yup from "@/utils/yup";

type TPageProps = {};

const schema = yup.object({
  items: yup.array(yup.mixed<TCart & { isSelected?: boolean }>().required()),
});

const Page = ({}: TPageProps) => {
  const uid = useId();
  const { replace: replaceRouter } = useRouter();
  const { mappedCartItems, totalQuantity } = useGetCart();
  const dispatch = useAppDispatch();

  const { handleSubmit, control, getValues } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    values: { items: mappedCartItems || [] },
  });
  const { fields, replace, update, remove } = useFieldArray({
    name: "items",
    control,
    keyName: "id",
    rules: { required: true, minLength: 1 },
  });

  const itemsFormWatch = useWatch({ control, name: "items" });
  const itemsForm = itemsFormWatch || [];
  const selectedItems = itemsForm?.filter((i) => !!i?.isSelected) || [];
  const totalPriceSelected = selectedItems.reduce(
    (curr, prev) => curr + (prev?.itemModel.currentPrice || 0) * (prev?.quantity || 0),
    0,
  );

  const [updateItemCartMutate, { isLoading: updateItemCartLoading }] =
    itemApi.useUpdateItemCartMutation({});
  const updateCartItem = async (index: number) => {
    try {
      const mappedItems = (getValues("items") || []).map((item) => ({
        itemModelId: item.itemModel.id,
        providerId: item.providerId,
        quantity: item.quantity,
      }));
      const res = await updateItemCartMutate({ items: mappedItems });
    } catch (error) {}
  };
  const removeCartItem = async (index: number) => {
    try {
      remove(index);
      toast("Đã cập nhật Giỏ hàng");
    } catch (error) {
    } finally {
      updateCartItem(index);
    }
  };

  const handleSelectCartItem = (index: number) => {
    try {
      const itemsForm = getValues("items") || [];
      const selectedItem = itemsForm[index];
      if (!selectedItem) throw new Error("Đã có lỗi xảy ra");
      const mappedItems = itemsForm.map((item) =>
        item?.providerId !== itemsForm[index]?.providerId ? { ...item, isSelected: false } : item,
      );
      replace(mappedItems);
    } catch (error) {}
  };

  const onSubmitForm = handleSubmit(async ({ items }) => {
    const mappedItems =
      items
        ?.filter((i) => !!i?.isSelected)
        .map(({ isSelected, ...item }) => {
          return item;
        }) || [];
    dispatch(setCheckoutSelectedItems(mappedItems));

    replaceRouter("/checkout");
  });

  return (
    <Layout01
      classNameBNav="hidden"
      className="pb-0"
      classNameHeader="sticky top-0 bg-white border-b border-gray-100"
      header={
        <Header01
          left={
            <HeaderBreadcrumbs
              items={[{ href: "/cart", children: `Giỏ hàng (${totalQuantity})` }]}
            />
          }
          right={<></>}
        />
      }
    >
      <form
        onSubmit={onSubmitForm}
        className={cn(
          "relative z-0 flex min-h-0 flex-[1_1_auto] flex-col",
          !!fields?.length ? "bg-gray-100" : "",
        )}
        key={String(itemsForm) + String(selectedItems)}
      >
        {!!fields?.length ? (
          fields.map((item, index) => {
            const isEqualProvider = index > 0 && item.providerId === fields[index - 1]?.providerId;
            return (
              <div
                key={uid + index + String(item)}
                className={cn(
                  "flex flex-col border-t border-gray-100 bg-white px-2 last-of-type:border-b-8",
                  (index === 0 || !isEqualProvider) && "border-t-8",
                )}
              >
                {(index === 0 || !isEqualProvider) && (
                  <div className="flex items-center border-b border-gray-100 py-2 text-gray-500">
                    <StoreIcon size={20} className="mr-2" />
                    <div className={"flex min-w-0 flex-[1_1_auto] items-center"}>
                      <Link
                        href={`/${item.providerId}`}
                        className="line-clamp-1 break-all text-base"
                      >
                        {item.providerName}
                      </Link>
                      <Link href={`/${item.providerId}`} className="-mr-1 ml-auto">
                        <ChevronRightIcon size={22} />
                      </Link>
                    </div>
                  </div>
                )}
                <div className="flex py-2">
                  <div className="mr-2 flex pt-0">
                    <Controller
                      control={control}
                      name={`items.${index}.isSelected`}
                      render={({ field: { value, onChange, ...field } }) => (
                        <Checkbox
                          {...field}
                          isSelected={value}
                          value={String(index)}
                          onChange={(v) => {
                            onChange(v);
                            handleSelectCartItem(index);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="mr-2 flex flex-col justify-start">
                    <div className="h-[80px] w-[80px] rounded shadow-sm">
                      <Image
                        src={item.itemModel.imageUrl}
                        alt={item.itemName}
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-[1_1_auto] flex-col">
                    <div className="flex w-full items-center justify-between">
                      <Link
                        href={`/items/${item.itemModel.itemId}`}
                        className="mr-2 line-clamp-1 break-all text-base text-gray-600"
                      >
                        {item.itemName}
                      </Link>
                      <ItemCartActions
                        items={[
                          {
                            label: "Xóa",
                            icon: <Trash2Icon size={16} />,
                            onPress: () => {
                              removeCartItem(index);
                            },
                            className: "text-red-400",
                          },
                        ]}
                      />
                    </div>

                    {!!item.itemModel.tierIndex.length && (
                      <Button
                        className={
                          "mt-0.5 flex items-center self-start rounded bg-gray-100 py-0.5 pl-2 pr-1 text-sm text-gray-500"
                        }
                      >
                        <span className="mr-1">Phân loại hàng:</span>
                        <span className="mr-1 font-[500] text-green2-500">
                          {item.itemModel.name}
                        </span>
                        {/* <ChevronDownIcon size={16} /> */}
                      </Button>
                    )}

                    <div className="mt-0.5 flex text-lg font-[500] text-green2-500">
                      <span>₫</span>
                      <span>{formatNumber(item.itemModel.currentPrice)}</span>
                    </div>

                    <Controller
                      control={control}
                      name={`items.${index}.quantity`}
                      disabled={updateItemCartLoading}
                      render={({ field }) => (
                        <NumberField
                          {...field}
                          onChange={(v) => {
                            field.onChange(v);
                            updateCartItem(index);
                          }}
                          isDisabled={!item.itemModel?.stock}
                          minValue={0}
                          maxValue={item.itemModel?.stock}
                          className={"mb-1 mt-2 flex flex-row items-center justify-between"}
                          classNameGroup="h-[32px]"
                          classNameBtn="w-[32px]"
                          classNameInput="w-[56px]"
                          formatOptions={{
                            maximumFractionDigits: 0,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="absolute left-0 top-0 -z-10 flex h-full w-full flex-col items-center justify-center px-2 pb-16">
            <div className="relative">
              <ShoppingCartIcon
                size={80}
                strokeWidth={1.5}
                className="fill-gray-100 text-gray-500"
              />
              <span className="tw-badge-count -top-1 h-8 w-auto min-w-8 border-none bg-gray-300 px-1 text-lg">
                0
              </span>
            </div>
            <div className="mt-2 text-lg text-gray-500">Giỏ hàng đang trống</div>
          </div>
        )}

        {!!fields?.length && (
          <div className="sticky bottom-16 mt-auto flex h-10 items-center border-t border-gray-100 bg-white/90 px-2 backdrop-blur-sm">
            <div className="flex flex-col">
              <Checkbox
                isReadOnly
                className={"text-sm text-gray-500"}
                key={String(selectedItems)}
                isIndeterminate={
                  selectedItems.length > 0 && selectedItems.length < mappedCartItems?.length
                }
                isSelected={
                  selectedItems.length > 0 && selectedItems.length === mappedCartItems?.length
                }
                // onChange={(isSelected) => {
                //   if (isSelected) {
                //     const mappedItems = mappedCartItems.map((i) => ({ ...i, isSelected: true }));
                //     replace(mappedItems as any[]);
                //   } else {
                //     resetField("items");
                //   }
                // }}
              >
                Đã chọn {selectedItems.length}/{mappedCartItems?.length}
              </Checkbox>
            </div>
          </div>
        )}

        {!!fields?.length ? (
          <div className="sticky bottom-0 left-0 z-[100] mt-0 flex h-16 shrink-0 items-center justify-between gap-2 border-t border-gray-100 bg-white/90 px-2 backdrop-blur-sm">
            {!!totalPriceSelected ? (
              <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center gap-0">
                  <span className="mr-1 line-clamp-1 break-all text-sm leading-none text-gray-500">
                    Tổng số tiền:
                  </span>
                  <span className="flex-shrink-0 whitespace-nowrap text-lg font-[500] leading-none text-green2-500">
                    ₫{formatNumber(totalPriceSelected)}
                  </span>
                </div>

                {/* <div className="flex flex-nowrap items-center gap-0">
                  <span className="mr-1 line-clamp-1 break-all text-sm leading-none text-gray-400">
                    Tiết kiệm:
                  </span>
                  <span className="flex-shrink-0 whitespace-nowrap text-sm font-[400] text-green2-500">
                    ₫{formatNumber(0)}
                  </span>
                </div> */}
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <span className="mb-0.5 mr-1 line-clamp-1 break-all text-sm leading-none text-gray-500">
                  Tổng số tiền:
                </span>
                <span className="text-green2-500">Vui lòng chọn sản phẩm</span>
              </div>
            )}
            <Button
              isDisabled={!selectedItems?.length}
              type="submit"
              className={
                "relative ml-auto flex h-11 shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-1 pr-2.5 text-white"
              }
              onPress={() => {
                // setIsOpenCartDrawer(true);
              }}
            >
              <span className="ml-2 whitespace-nowrap text-left font-[600]">Thanh toán ngay</span>
            </Button>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 z-[100] mt-0 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-t border-gray-100 bg-white/90 px-2 backdrop-blur-sm">
            <Link
              href="/"
              className={
                "flex h-11 w-full items-center justify-center rounded bg-green2-500 text-lg text-white"
              }
            >
              Lướt Yoolife ngay!
            </Link>
          </div>
        )}
      </form>
      <DevTool control={control} />
    </Layout01>
  );
};

export default withAuth(Page);
