import React from "react";
import { useMedia } from "react-use";
import { toast } from "sonner";

import { itemApi } from "@/redux/query/item-query";

import useTranslation from "./use-translation";

function useToggleFavorite() {
  const { t } = useTranslation();
  const [addFavoriteMutate, addFavoriteRes] = itemApi.useAddFavoriteMutation();
  const [removeFavoriteMutate, removeFavoriteRes] = itemApi.useRemoveFavoriteMutation();

  const onAddFavoriteMutate = async (id?: number) => {
    if (!id) return;
    try {
      const res = await addFavoriteMutate({ id }).unwrap();
      toast.success(t("Thêm vào yêu thích thành công"));
    } catch (error) {
      toast.error(t("Đã có lỗi xảy ra khi thêm vào yêu thích"));
    }
  };

  const onRemoveFavoriteMutate = async (id?: number) => {
    if (!id) return;
    try {
      const res = await removeFavoriteMutate({ id }).unwrap();
      toast.success(t("Xóa khỏi yêu thích thành công"));
    } catch (error) {
      toast.error(t("Đã có lỗi xảy ra khi xóa khỏi yêu thích"));
    }
  };

  return {
    addFavorite: {
      mutate: onAddFavoriteMutate,
      ...addFavoriteRes,
    },
    removeFavorite: {
      mutate: onRemoveFavoriteMutate,
      ...removeFavoriteRes,
    },
  };
}

export default useToggleFavorite;
