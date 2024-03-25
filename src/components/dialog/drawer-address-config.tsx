import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  CircleIcon,
  MapPinIcon,
  MapPinOffIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useId, useState } from "react";
import {
  Button,
  GridList,
  GridListItem,
  Key,
  ListBox,
  ListBoxItem,
  ModalOverlayProps,
  TabPanel,
  Tabs,
} from "react-aria-components";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import useTranslation from "@/hooks/use-translation";
import { userApi } from "@/redux/query/user-query";
import { useAppSelector } from "@/redux/store";
import { TSCreateUserAddressData, TUserAddress } from "@/types/user-type";
import { cn, mappedAddressDetail } from "@/utils/utils";

import { AddressSelectsField } from "../field/address-selects";
import Checkbox from "../field/checkbox";
import CheckboxField, { CheckboxButton01 } from "../field/checkbox-field";
import LatLngField from "../field/latlng-field";
import TextField from "../field/text-field";
import TextFieldArea from "../field/text-field-area";
import ScrollBar from "../scrollbar/scroll-bar";
import Drawer, { DrawerClose } from "./drawer";

type TDrawerAddressConfigProps = ModalOverlayProps & {
  onSelectAddress?: (addr?: any) => void;
};

const TABS = {
  LIST_ADDRESS: "LIST_ADDRESS",
  UPDATE_ADDRESS: "UPDATE_ADDRESS",
  ADD_NEW_ADDRESS: "ADD_NEW_ADDRESS",
};

const DrawerAddressConfig = ({
  isOpen,
  onOpenChange,
  onSelectAddress,
  ...props
}: TDrawerAddressConfigProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const userState = useAppSelector((s) => s.user.data);
  const [selectedTab, setSelectedTab] = useState<Key>(TABS.LIST_ADDRESS);

  const { data: getListAddressRes } = userApi.useGetListAddressQuery(
    userState?.id ? { providerId: userState.id } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const [createAddressMutate, { isLoading: createAddressLoading }] =
    userApi.useCreateAddressMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(TSCreateUserAddressData),
  });
  const onSubmitCreate = handleSubmit(
    async ({ address, geoLocationString, type, ...formData }: any) => {
      try {
        const [latitude, longitude] = geoLocationString.split(",");
        const res = await createAddressMutate({
          ...formData,
          latitude: +latitude,
          longitude: +longitude,
          type: !!type ? +type[0] : undefined,
          ...address,
        }).unwrap();
        reset();
        toast.success(t("Thêm mới địa chỉ thành công"));
        setSelectedTab(TABS.LIST_ADDRESS);
      } catch (error) {
        toast.error(t("Đã có lỗi xảy ra khi thêm mới địa chỉ"));
      }
    },
  );

  return (
    <Drawer
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-t-lg"
      {...props}
    >
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        className={"flex flex-col"}
      >
        <DrawerClose
          onPress={() => {
            reset();
            setSelectedTab(TABS.LIST_ADDRESS);
            onOpenChange?.(false);
          }}
          className={"absolute -top-2 right-2"}
        >
          <XIcon />
        </DrawerClose>

        <div className="flex h-10 flex-shrink-0 items-center border-b border-b-gray-100 px-2">
          <span className="text-base font-[600] leading-none text-gray-500">
            {selectedTab === TABS.LIST_ADDRESS && "Địa chỉ nhận hàng"}
            {selectedTab === TABS.ADD_NEW_ADDRESS && "Địa chỉ mới"}
            {selectedTab === TABS.UPDATE_ADDRESS && "Cập nhật Địa chỉ"}
          </span>
        </div>

        <TabPanel id={TABS.LIST_ADDRESS} className={"flex min-h-full flex-col"}>
          <ScrollBar suppressScrollX>
            <div className="mt-2 px-2 font-[500] leading-none text-gray-500">Địa chỉ của tôi:</div>
            <ListBox<TUserAddress>
              items={getListAddressRes?.data}
              selectionMode="single"
              onSelectionChange={(k) => {
                const arr = Array.from(k);
                const foundAddr = getListAddressRes?.data?.find((a) => a.id === arr?.[0]);
                onSelectAddress?.(foundAddr);
                if (!!foundAddr)
                  toast(`Đã chọn địa chỉ`, {
                    duration: 2000,
                    description: `${foundAddr.detail} ${mappedAddressDetail(foundAddr)}`,
                  });
                onOpenChange?.(false);
              }}
              className={"flex flex-col"}
              renderEmptyState={() => (
                <div className="flex h-full flex-col items-center justify-center">
                  <MapPinOffIcon size={40} className="mb-2 text-gray-500" />
                  <span className="mb-2 text-gray-500">Không có dữ liệu địa chỉ của bạn</span>
                </div>
              )}
            >
              {(item) => (
                <ListBoxItem
                  id={item.id}
                  textValue={String(item.id)}
                  className={"border-b border-gray-50 p-2 outline-none"}
                >
                  {({ isSelected }) => (
                    <div className="relative flex min-h-[60px] flex-col items-start rounded bg-gray-100 py-2 pl-[28px] pr-2">
                      <div className="mb-1 flex items-center gap-2 divide-x">
                        <div className="font-[500]">{item.name}</div>
                        <div className="pl-2">{item.phoneNumber}</div>
                      </div>
                      <div className="flex items-baseline justify-start text-gray-500">
                        {item.detail} {mappedAddressDetail(item)}
                      </div>

                      {!!item.default && (
                        <div className="mt-1 rounded border border-green2-500 px-2 py-0.5 text-green2-500">
                          {"Mặc định"}
                        </div>
                      )}

                      <div className="absolute left-0 top-0 flex h-full flex-col items-center justify-center pl-1">
                        {isSelected ? (
                          <CheckCircleIcon size={19} className="text-green2-400" />
                        ) : (
                          <CircleIcon size={19} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  )}
                </ListBoxItem>
              )}
            </ListBox>
          </ScrollBar>
          <div className="sticky bottom-0 left-0 mt-auto w-full border-t border-t-gray-50 p-2">
            <Button
              onPress={() => setSelectedTab(TABS.ADD_NEW_ADDRESS)}
              className={
                "flex w-full items-center justify-center rounded bg-green2-400 py-2 pl-2 pr-4 text-white shadow-lg"
              }
            >
              <PlusIcon />
              <span>Thêm địa chỉ</span>
            </Button>
          </div>
        </TabPanel>
        <TabPanel id={TABS.ADD_NEW_ADDRESS} className={"flex min-h-0 flex-[1_1_auto] flex-col"}>
          <ScrollBar suppressScrollX className="max-h-[calc(100dvh-80px)] min-h-0 flex-[1_1_auto]">
            <form
              id={uid + "ADD_NEW_ADDRESS_FORM"}
              className="flex flex-col pt-2"
              onSubmit={onSubmitCreate}
            >
              <div className="w-full px-2 pb-2">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Tên người nhận"
                      isRequired
                      placeholder="Nguyen Van A"
                      className={"mb-2"}
                      isInvalid={!!fieldState.error?.message}
                      errorMessage={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Số điện thoại người nhận"
                      isRequired
                      placeholder="xxxx xxx xxx"
                      className={"mb-2"}
                      isInvalid={!!fieldState.error?.message}
                      errorMessage={fieldState.error?.message}
                      type="tel"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <AddressSelectsField
                      label="Địa chỉ"
                      required
                      value={value}
                      onChange={onChange}
                      classNameTrigger="w-full rounded"
                      classNameWrapper="mb-2"
                      isError={!!errors.address?.wardCode?.message}
                      errorMessage={errors.address?.wardCode?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="detail"
                  render={({ field, fieldState }) => (
                    <TextFieldArea
                      label="Địa chỉ cụ thể"
                      placeholder="Ví dụ: Số nhà, Tên đường,..."
                      autoComplete="off"
                      className="mb-2"
                      classNameInput="rounded"
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="geoLocationString"
                  render={({ field, fieldState }) => (
                    <LatLngField
                      label="Tọa độ địa chỉ"
                      placeholder="Nhập tọa độ địa chỉ..."
                      isRequired
                      autoComplete="off"
                      className="mb-1"
                      classNameInput="rounded"
                      classNameDescMsg="mt-1"
                      classNameWrapper="mb-2"
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="type"
                  render={({ field, fieldState }) => (
                    <CheckboxField
                      {...field}
                      label="Loại địa chỉ"
                      className={"mb-3 flex flex-col"}
                      isInvalid={!!fieldState.error?.message}
                      errorMessage={fieldState.error?.message}
                      onChange={(v) => {
                        field.onChange(v?.slice(-1));
                      }}
                      value={field.value}
                    >
                      <div className="flex gap-2">
                        <CheckboxButton01 value="1">Nhà riêng</CheckboxButton01>
                        <CheckboxButton01 value="2">Văn Phòng</CheckboxButton01>
                      </div>
                    </CheckboxField>
                  )}
                />

                <Controller
                  control={control}
                  name="default"
                  render={({ field: { value, ...field }, fieldState }) => (
                    <Checkbox isSelected={value} {...field} className="mb-2 gap-x-2">
                      <div className="text-[15px] text-gray-600">Đặt làm địa chỉ mặc định</div>
                    </Checkbox>
                  )}
                />
              </div>
              <div className="sticky bottom-0 mt-auto flex h-14 shrink-0 items-center justify-between gap-2 border-t border-t-gray-100 bg-white px-2">
                <Button
                  onPress={() => {
                    reset();
                    setSelectedTab(TABS.LIST_ADDRESS);
                  }}
                  className={
                    "flex h-8 items-center rounded-full bg-gray-50 pl-1 pr-4 text-left font-[500] text-gray-500"
                  }
                  isDisabled={createAddressLoading}
                >
                  <ChevronLeftIcon />
                  <span>Quay lại</span>
                </Button>
                <Button
                  type="submit"
                  className={
                    "flex items-center rounded bg-green2-400 py-2 pl-6 pr-8 text-white shadow-lg"
                  }
                  isDisabled={createAddressLoading}
                >
                  <MapPinIcon className="mr-1" />
                  <span>Thêm địa chỉ</span>
                </Button>
              </div>
            </form>
          </ScrollBar>
          <DevTool control={control} />
        </TabPanel>
      </Tabs>
    </Drawer>
  );
};

export default DrawerAddressConfig;
