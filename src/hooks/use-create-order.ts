import { useRouter } from "next-nprogress-bar";
import React from "react";
import { toast } from "sonner";

import { itemApi } from "@/redux/query/item-query";
import { resetCheckout } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TUpdateCartItem } from "@/types/item-type";

import useGetCart from "./use-get-cart";

type TuseCreateOrderProps = { providerId?: number };

function useCreateOrder({ providerId }: TuseCreateOrderProps) {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const {
    deliveryProvider,
    paymentMethod,
    selectedItems,
    toAddress,
    voucherProvider,
    voucherShipping,
  } = useAppSelector((s) => s.checkout);
  const { currentData: cartRes, totalQuantity } = useGetCart();

  const [createOrderMutate, result] = itemApi.useCreateOrderMutation();

  const [updateItemCartMutate, { isLoading: updateItemCartLoading }] =
    itemApi.useUpdateItemCartMutation({});

  const [checkAvailableVoucherMutate, { isLoading: checkAvailableVoucherLoading }] =
    itemApi.useCheckAvailableVoucherMutation();

  const handleCreate = async () => {
    try {
      if (!providerId) throw new Error("Đã có lỗi xảy ra khi lấy thông tin cửa hàng");

      if (!paymentMethod) throw new Error("Đã có lỗi xảy ra Phương thức thanh toán");

      if (!toAddress) throw new Error("Đã có lỗi xảy ra Địa chỉ nhận hàng");

      if (!deliveryProvider) throw new Error("Đã có lỗi xảy ra Đơn vị vận chuyển");

      if (!selectedItems?.length) throw new Error("Đã có lỗi xảy ra Sản phẩm");
      const listItems = selectedItems?.map((item) => ({
        id: item.itemModel.id,
        quantity: item.quantity,
      }));
      const listVoucher = [voucherShipping?.id, voucherProvider?.id].filter((v) => !!v) as number[];
      if (!!listVoucher?.length) {
        const checkVoucherRes = await checkAvailableVoucherMutate({
          items: listVoucher,
        }).unwrap();
        if (!checkVoucherRes?.data.every((i) => !!i)) throw new Error("Đã có lỗi xảy ra Voucher");
      }

      const res = await createOrderMutate({
        description: "",
        imageUrl: "",
        providerId,
        paymentMethod,
        listVouchers: listVoucher,
        orderItemList: listItems,
        deliveryInfo: {
          deliveryProvider,
          toAddress: toAddress.detail,
          toProvinceName: toAddress.provinceName,
          toDistrictName: toAddress.districtName,
          toWardName: toAddress.wardName,
          toName: toAddress.name,
          toPhone: toAddress.phoneNumber,
        },
      }).unwrap();
      if (!res.data) throw new Error("Đã có lỗi xảy ra khi tạo đơn hàng");

      const mappedCartItems =
        cartRes?.data.map((c) => {
          if (!!listItems.find((i) => i.id === c.itemModel.id)) return undefined;
          return {
            itemModelId: c.itemModel.id,
            providerId: c.providerId,
            quantity: c.quantity,
          } as TUpdateCartItem;
        }) || [];
      const updateCartRes = await updateItemCartMutate({
        items: mappedCartItems.filter((i) => !!i) as any[],
      }).unwrap();

      toast.success("Cập nhật giỏ hàng thành công");
      toast.success("Tạo đơn hàng thành công", { duration: 3000 });

      dispatch(resetCheckout());
      replace(`/me/purchase?id=${res.data}`, { shallow: true });
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Đã có lỗi xảy ra khi tạo đơn hàng");
        console.error(error);
      }
    }
  };

  return {
    handleCreate,
    ...result,
    isLoading: checkAvailableVoucherLoading || updateItemCartLoading || result.isLoading,
  };
}

export default useCreateOrder;
