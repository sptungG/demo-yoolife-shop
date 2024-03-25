import { skipToken } from "@reduxjs/toolkit/query";
import { CheckCircleIcon, StoreIcon, XIcon } from "lucide-react";
import { groupBy } from "rambda";
import { useId, useMemo } from "react";
import { Heading, Button as RAButton } from "react-aria-components";

import { itemApi } from "@/redux/query/item-query";
import { userApi } from "@/redux/query/user-query";
import { TEVoucherStatus, TEVoucherType, TVoucher } from "@/types/item-type";
import { cn } from "@/utils/utils";

import Button from "../button/Button";
import VoucherCard from "../card/voucher-card";
import { EmptyVoucherSvg } from "../icons";
import ScrollBar from "../scrollbar/scroll-bar";
import Drawer, { DrawerClose } from "./drawer";

type TDrawerVoucherSelectProps = {
  providerId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const DrawerVoucherSelect = ({ providerId, isOpen, onOpenChange }: TDrawerVoucherSelectProps) => {
  const uid = useId();

  const { data: getByIdProviderRes } = userApi.useGetByIdProviderQuery(
    providerId ? { id: providerId } : skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const providerData = getByIdProviderRes?.data;
  const { data: getListVoucherRes, isFetching: getListVoucherFetching } =
    itemApi.useGetListVoucherQuery(
      providerId
        ? { providerId, scope: 1, maxResultCount: 100, channelDisplay: 1, formId: 30, sortBy: 2 }
        : skipToken,
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const listVoucher = getListVoucherRes?.data || [];
  const mappedListVoucher = useMemo(
    () =>
      groupBy(
        (v) => String(v.type),
        (getListVoucherRes?.data || []).filter((v) => v.status !== TEVoucherStatus.EXPIRED),
      ),
    [getListVoucherRes?.data],
  );

  const [receiveVoucherMutate, { isLoading: receiveVoucherLoading }] =
    itemApi.useReceiveVoucherMutation();
  const handleReceiveVoucher = async (voucher?: TVoucher) => {
    try {
      if (!voucher) throw new Error(" ");
      const receiveRes = await receiveVoucherMutate({ id: voucher.id }).unwrap();
      if (!receiveRes.data) throw new Error(" ");
    } catch (error) {
    } finally {
    }
  };

  const [checkAvailableVoucherMutate, { isLoading: checkAvailableVoucherLoading }] =
    itemApi.useCheckAvailableVoucherMutation();

  return (
    <Drawer
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-t-lg"
    >
      <DrawerClose
        onPress={() => {
          onOpenChange(false);
        }}
        className={"absolute -top-2 right-2"}
      >
        <XIcon />
      </DrawerClose>

      <Heading
        slot="title"
        className="flex h-9 shrink-0 items-center whitespace-nowrap border-b border-gray-100 px-2 py-1 text-lg text-gray-600"
      >
        <StoreIcon className="mr-1 text-gray-500" size={20} />
        <span className="line-clamp-1">{providerData?.name}</span>
        <span className="ml-1 shrink-0 text-green2-500">Voucher</span>
      </Heading>
      {!!listVoucher.length ? (
        <ScrollBar suppressScrollX className="max-h-[calc(100dvh-140px)] min-h-0 flex-[1_1_auto]">
          <div key={uid + "VOUCHER_DISCOUNT" + "CheckboxGroup"} className="flex flex-col px-2 py-2">
            <div className="mb-1 text-base font-[500] leading-none text-gray-500">
              {"Mã giảm giá"}
            </div>

            <div className="flex flex-col gap-2">
              {mappedListVoucher[TEVoucherType.VOUCHER_DISCOUNT].map((item, index) => (
                <VoucherCard
                  key={uid + String(item) + index}
                  {...item}
                  right={
                    item.isReceived ? (
                      <div className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2 text-green2-500">
                        <CheckCircleIcon size={20} className="-ml-1 mb-1 fill-green2-100" />
                        <span className="whitespace-nowrap text-[14px]">Đã lưu</span>
                      </div>
                    ) : (
                      <div className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2">
                        <RAButton
                          className={({ isDisabled }) =>
                            cn(
                              "rounded bg-green2-500 px-2.5 py-1.5 text-sm font-[500] text-white",
                              isDisabled && "bg-gray-300",
                            )
                          }
                          onPress={() => handleReceiveVoucher(item)}
                        >
                          Lưu
                        </RAButton>
                      </div>
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div key={uid + "VOUCHER_SHIPPING" + "CheckboxGroup"} className="flex flex-col px-2 py-2">
            <div className="mb-1 text-base font-[500] leading-none text-gray-500">
              {"Ưu đãi phí vận chuyển"}
            </div>
            <div className="flex flex-col gap-2">
              {mappedListVoucher[TEVoucherType.VOUCHER_SHIPPING]?.map((item, index) => (
                <VoucherCard
                  key={uid + String(item) + index}
                  {...item}
                  right={
                    item.isReceived ? (
                      <div className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2 text-green2-500">
                        <CheckCircleIcon size={20} className="-ml-1 mb-1 fill-green2-100" />
                        <span className="whitespace-nowrap text-[14px]">Đã lưu</span>
                      </div>
                    ) : (
                      <div className="ml-auto flex w-[70px] flex-shrink-0 flex-col items-center justify-center border-l border-dashed px-2">
                        <RAButton
                          className={({ isDisabled }) =>
                            cn(
                              "rounded bg-green2-500 px-2.5 py-1.5 text-sm font-[500] text-white",
                              isDisabled && "bg-gray-300",
                            )
                          }
                          onPress={() => handleReceiveVoucher(item)}
                        >
                          Lưu
                        </RAButton>
                      </div>
                    )
                  }
                />
              ))}
            </div>
          </div>
        </ScrollBar>
      ) : (
        <div className="flex min-h-[calc(50dvh-56px)] w-full flex-[1_1_auto] flex-col items-center justify-center">
          <EmptyVoucherSvg width={140} height={140} />
          <div className="font-[500] text-gray-600">Chưa có mã giảm giá nào của Shop</div>
          {/* <div className="">Nhập mã giảm giá có thể sử dụng vào thanh bên trên</div> */}
        </div>
      )}

      {!!listVoucher.length && (
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-t border-t-gray-100 px-2">
          <Button
            isLoading={
              receiveVoucherLoading || checkAvailableVoucherLoading || getListVoucherFetching
            }
            isDisabled={checkAvailableVoucherLoading}
            type="button"
            onPress={() => onOpenChange(false)}
            className={
              "relative ml-auto flex h-12 w-full shrink-0 items-center justify-center rounded-lg bg-green2-300 pl-4 pr-5 font-[600] text-white"
            }
          >
            Xác nhận
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default DrawerVoucherSelect;
