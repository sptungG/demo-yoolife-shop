import { ChevronRightIcon, MapPinIcon, ShoppingCartIcon } from "lucide-react";
import { groupBy } from "rambda";
import { useId, useState } from "react";
import { Button } from "react-aria-components";

import CheckoutProvider, { CheckoutProviderEmpty } from "@/components/card/checkout-provider";
import DrawerAddressConfig from "@/components/dialog/drawer-address-config";
import { Header01 } from "@/components/header/header";
import HeaderBreadcrumbs from "@/components/header/header-breadcrumbs";
import withAuth from "@/components/hoc/with-auth";
import Layout01 from "@/components/layout/Layout01";
import useTranslation from "@/hooks/use-translation";
import { resetCheckout, setCheckoutAddress } from "@/redux/reducer/checkout-reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn, mappedAddressDetail } from "@/utils/utils";

type TPageProps = {};

const Page = ({}: TPageProps) => {
  const uid = useId();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((s) => s.user.data);
  const { toAddress: checkoutAddress, selectedItems } = useAppSelector((s) => s.checkout);

  const [isOpenAddressDrawer, setIsOpenAddressDrawer] = useState<boolean>(false);

  const mappedItems = groupBy((item) => String(item.providerId), selectedItems) || {};

  return (
    <Layout01
      classNameBNav="hidden"
      className="bg-gray-100 pb-0"
      classNameHeader="sticky top-0 bg-white border-b border-gray-100"
      header={
        <Header01
          left={
            <HeaderBreadcrumbs
              items={[
                {
                  href: "/cart",
                  onPress: () => dispatch(resetCheckout()),
                  children: <ShoppingCartIcon size={24} className="text-green2-500" />,
                },
                { href: "/checkout", children: `Thanh toán` },
              ]}
            />
          }
          right={<></>}
        />
      }
    >
      <div className="relative flex flex-col bg-white pb-1">
        {!!checkoutAddress ? (
          <Button
            className={cn("flex min-h-[60px] items-center text-left outline-none")}
            onPress={() => setIsOpenAddressDrawer(true)}
          >
            <div className="flex flex-col items-start px-2 py-2">
              <div className="flex items-center gap-2">
                <MapPinIcon size={18} className="-mt-1 fill-green2-50 text-green2-500" />
                <span className="font-[500] text-gray-700">{checkoutAddress.name}</span>
                <span className="-mt-0.5 text-gray-300">|</span>
                <span className="font-[400] text-gray-700">{checkoutAddress.phoneNumber}</span>
              </div>
              <div className="line-clamp-2 break-words text-[15px] text-gray-500">
                <div className="mr-1">{checkoutAddress.detail}</div>
                <div>{mappedAddressDetail(checkoutAddress)}</div>
              </div>
            </div>

            <ChevronRightIcon className="ml-auto mr-0.5 flex-shrink-0 text-gray-500" />
          </Button>
        ) : (
          <Button
            className={"flex min-h-10 items-center text-left"}
            onPress={() => setIsOpenAddressDrawer(true)}
          >
            <div className="flex items-center gap-2 px-2 py-2">
              <MapPinIcon size={20} className="fill-green2-50 text-green2-500" />
              <span className="font-[500] text-gray-700">Chưa có địa chỉ</span>
            </div>
            <ChevronRightIcon className="ml-auto mr-0.5 flex-shrink-0 text-gray-500" />
          </Button>
        )}
        <div className="VdrkOU"></div>
      </div>

      {Object.entries(mappedItems || {}).map(([providerId, selectedItems], index) => {
        return !!providerId ? (
          <CheckoutProvider
            key={uid + providerId + String(selectedItems) + index + "CheckoutProvider"}
            providerId={+providerId}
          />
        ) : (
          <CheckoutProviderEmpty key={uid + index + "CheckoutProvider"} />
        );
      })}

      <DrawerAddressConfig
        isOpen={isOpenAddressDrawer}
        onOpenChange={setIsOpenAddressDrawer}
        onSelectAddress={(addr) => dispatch(setCheckoutAddress(addr))}
      />
    </Layout01>
  );
};

export default withAuth(Page);
