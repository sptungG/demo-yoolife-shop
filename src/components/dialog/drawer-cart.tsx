import { DevTool } from "@hookform/devtools";
import { ArrowRightIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { useId } from "react";
import { Link } from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import useTranslation from "@/hooks/use-translation";
import { itemApi } from "@/redux/query/item-query";
import { TItem } from "@/types/item-type";
import { cn, formatNumber } from "@/utils/utils";

import Button from "../button/Button";
import CheckboxField, { CheckboxButton01 } from "../field/checkbox-field";
import NumberField from "../field/number-field";
import ScrollBar from "../scrollbar/scroll-bar";
import Image from "../shared/image";
import Drawer, { DrawerClose } from "./drawer";

type TDrawerCartProps = TItem & {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const compareTierIndexes = (a: any[], b: any[]) =>
  a.length === b.length && a.every((element, index) => element == b[index]);

const DrawerCart = ({ isOpen, onOpenChange, ...itemData }: TDrawerCartProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const [addItemModelToCartMutate, { isLoading: addItemModelToCartLoading }] =
    itemApi.useAddItemModelToCartMutation();

  const { handleSubmit, control, watch, setValue, reset } = useForm({
    mode: "onChange",
  });
  const selectedTierIndexesForm = watch("selectedTierIndexes", []);
  const quantityForm = watch("quantity");

  const selectedModel = itemData?.modelList.find(
    (m) => !!m.tierIndex.length && compareTierIndexes(m.tierIndex, selectedTierIndexesForm.flat()),
  );

  const onSubmitForm = handleSubmit(async ({ selectedTierIndexes, quantity }) => {
    try {
      let selectedModel: any;
      if (itemData?.modelList.length > 1) {
        selectedModel = itemData?.modelList.find(
          (m) =>
            !!m.tierIndex.length && compareTierIndexes(m.tierIndex, selectedTierIndexes.flat()),
        );
      } else {
        selectedModel = itemData?.modelList[0];
      }
      if (!selectedModel) throw new Error(" ");

      const res = await addItemModelToCartMutate({ itemModelId: selectedModel.id, quantity });
      toast.success(t("Thêm vào giỏ hàng thành công"), {
        duration: 3000,
        description: (
          <Link href="/cart" className={"flex items-center gap-0.5 text-green2-500 underline"}>
            <span>Đi đến giỏ hàng</span>
            <ArrowRightIcon size={16} strokeWidth={1.5} />
          </Link>
        ),
      });
    } catch (error) {
      toast.error(t("Đã có lỗi xảy ra khi thêm vào giỏ hàng"));
    } finally {
      reset();
      onOpenChange(false);
    }
  });

  return (
    <Drawer
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-t-lg"
    >
      <DrawerClose
        onPress={() => {
          reset();
          onOpenChange(false);
        }}
        className={"absolute -top-2 right-2"}
      >
        <XIcon />
      </DrawerClose>
      <ScrollBar suppressScrollX className="min-h-fit flex-[1_1_auto]">
        {itemData ? (
          <form
            className="flex min-h-full flex-col justify-end"
            id={uid + itemData.id + "CART"}
            onSubmit={onSubmitForm}
          >
            {selectedModel ? (
              <div key={String(selectedModel)} className="flex px-2 py-2">
                <Image
                  src={String(selectedModel?.imageUrl)}
                  alt={itemData.name}
                  className="mr-2 h-[100px] w-[100px] rounded border border-gray-100 object-cover"
                />
                <div className="flex flex-col justify-end">
                  <div className="flex items-center text-lg text-green2-500">
                    <span>₫</span>
                    <span>{formatNumber(selectedModel.currentPrice)}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-1">Đã bán:</span>
                    <span className="">{formatNumber(selectedModel.sales)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <ScrollBar suppressScrollY className="max-w-full">
                <div className="flex flex-nowrap gap-2 px-2 py-2">
                  {itemData.imageUrlList?.length ? (
                    itemData.imageUrlList.map((item, imgIndex) => (
                      <Image
                        key={uid + "itemData.imageUrlList" + imgIndex}
                        src={String(item)}
                        alt={imgIndex > 0 ? String(imgIndex + 1) : itemData.name}
                        className="h-[100px] w-[100px] rounded border border-gray-100 object-cover"
                        classNameWrapper="flex-shrink-0"
                      />
                    ))
                  ) : (
                    <Image
                      src="1"
                      alt="1"
                      className="h-[100px] w-[100px] rounded border border-gray-100 object-cover"
                      classNameWrapper="flex-shrink-0"
                    />
                  )}
                </div>
              </ScrollBar>
            )}
            <div
              className={cn(
                "flex flex-col gap-4",
                !!itemData.tierVariationList?.length && "border-t border-t-gray-100 px-2 py-4",
              )}
            >
              {!!itemData.tierVariationList?.length ? (
                itemData.tierVariationList.map((v, index) => (
                  <div
                    key={uid + "tierVariationList" + index}
                    className="flex flex-col items-start lg:flex-row"
                  >
                    <div className="mb-2 line-clamp-3 flex-shrink-0 font-[500] capitalize text-gray-500 lg:mb-0 lg:mr-2 lg:w-[100px] lg:pt-2.5">
                      {v.name}:
                    </div>
                    <Controller
                      control={control}
                      name={`selectedTierIndexes.${index}`}
                      render={({ field, fieldState }) => (
                        <CheckboxField
                          isDisabled={field.disabled}
                          onChange={(v) => {
                            setValue("quantity", undefined);
                            field.onChange(v?.slice(-1));
                          }}
                          value={field.value}
                          className="flex min-w-0 flex-[1_1_auto] flex-wrap gap-3"
                        >
                          {v.optionList.map((o, indexO) => (
                            <CheckboxButton01
                              key={uid + "tierVariationList:optionList" + indexO}
                              value={String(indexO)}
                            >
                              {o}
                            </CheckboxButton01>
                          ))}
                        </CheckboxField>
                      )}
                    />
                  </div>
                ))
              ) : (
                <div className="flex"></div>
              )}
            </div>

            <div className={"flex flex-col border-t border-t-gray-100 px-2 py-4"}>
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <NumberField
                    {...field}
                    isDisabled={!!itemData.tierVariationList?.length && !selectedModel?.stock}
                    minValue={0}
                    maxValue={
                      !!itemData.tierVariationList?.length ? selectedModel?.stock : itemData.stock
                    }
                    className={"mb-2 flex flex-row items-center justify-between"}
                    formatOptions={{
                      maximumFractionDigits: 0,
                    }}
                    label={"Số lượng"}
                    classNameLabel="mb-1.5 text-base w-[88px] font-[500] text-gray-500 lg:mb-2"
                  />
                )}
              />
              {selectedModel ? (
                <div className="flex justify-end text-gray-500">
                  <span className="mr-2 hidden w-[88px]"></span>
                  <span className="mr-1 font-[500]">{formatNumber(selectedModel?.stock || 0)}</span>
                  <span>sản phẩm có sẵn</span>
                </div>
              ) : (
                <div className="flex justify-end text-gray-500">
                  <span className="mr-2 hidden w-[88px]"></span>
                  <span className="mr-1 font-[500]">{formatNumber(itemData?.stock || 0)}</span>
                  <span>tổng sản phẩm có sẵn</span>
                </div>
              )}
            </div>
          </form>
        ) : (
          <></>
        )}
      </ScrollBar>

      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-t-green2-100 px-2">
        <Button
          isLoading={addItemModelToCartLoading}
          isDisabled={!quantityForm || addItemModelToCartLoading}
          form={uid + itemData.id + "CART"}
          type="submit"
          className={
            "relative ml-auto flex h-12 w-full shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 font-[600] text-white"
          }
          icon={<ShoppingCartIcon size={26} />}
        >
          Thêm vào giỏ hàng
          {!!quantityForm && (
            <span className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-green2-500 px-1 text-white">
              {quantityForm}
            </span>
          )}
        </Button>
      </div>

      <DevTool control={control} />
    </Drawer>
  );
};

export default DrawerCart;
