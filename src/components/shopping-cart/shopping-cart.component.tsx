import React from "react";

import type { ShoppingCartItem} from "@/src/context/global-context";
import { useGlobalContext } from "@/src/context/global-context";
import { cn } from "@/src/utils/cn.util";
import { useLocalStorage } from "@/src/utils/hooks/use-local-storage";

import { Flex, FlexCol, FlexRow } from "../nextgen-core-ui";

export const ShoppingCart: React.FC = () => {
  const { globalData, setGlobalData, activateCheckout, deactivateCheckout } = useGlobalContext();
  const [, setCartItemsCached] = useLocalStorage<Array<ShoppingCartItem>>('cartItems', [])

  const handleDelete = (id: string) => {
    setGlobalData((prevData) => {
      const updatedItems = prevData.shoppingCartData.items.filter(
        (item) => item.id !== id
      );
      const totalPrice = updatedItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      const totalItems = updatedItems.length;

      setCartItemsCached(updatedItems)

      return {
        ...prevData,
        shoppingCartData: {
          items: updatedItems,
          totalItems,
          totalPrice,
        },
      };
    });
  };


  const zeroItems = globalData.shoppingCartData.items.length === 0;

  const activeCheckout = globalData.shoppingCartData.checkoutActive;

  return (
    <FlexCol className="w-full min-w-[22rem] max-w-[22rem] justify-between gap-y-3 rounded-2xl font-sans ease-out md:w-1/3">
      <FlexCol className={`h-1/2 ${zeroItems ? "opacity-30" : ""} h-full gap-y-1  rounded-2xl bg-lunnheim-olive  bg-opacity-5 font-thin`}>
        {globalData.shoppingCartData.items.length > 0 ? (
          globalData.shoppingCartData.items.map((item) => (
            <Flex key={item.id} className="border-rounded group w-full scale-90 items-center justify-between rounded-lg bg-lunnheim-ivory-yellow bg-opacity-20 p-3 first:mt-3">
              <Flex className="w-full gap-x-4 text-sm">
                <FlexCol className="w-1/6">
                  <img src={item.imageUrl} alt="" className="w-full rounded-md" />
                </FlexCol>
                <FlexCol className="w-full">
                  <FlexCol className="w-full text-sm">{item.name}</FlexCol>
                  <FlexCol className="text-xs">NOK {item.price},00</FlexCol>
                  <FlexCol className="text-xs tracking-wide opacity-60 md:flex-row">{item.variant}</FlexCol>
                </FlexCol>
              </Flex>

              <button className="!group-hover:scale-80 rounded-full bg-lunnheim-ivory-yellow bg-opacity-30 p-2 px-3 text-xs text-lunnheim-darker-olive opacity-80 hover:scale-95 hover:opacity-100 active:scale-90" onClick={() => handleDelete(item.id)}>x</button>
            </Flex>
          ))
        ) : (
          <Flex className={`my-auto h-full place-self-center self-center justify-self-center rounded-2xl bg-slate-200 bg-opacity-10 p-6 text-center text-xl font-thin opacity-20`}>
            <div className="my-auto">Empty cart</div>
          </Flex>
        )}
      </FlexCol>
      <FlexCol className="rounded-md bg-lunnheim-olive bg-opacity-10 p-6 text-sm">

        <p className=""> Total: {globalData.shoppingCartData.totalPrice},00kr <span className="text-xs opacity-40">(inkl. moms)</span></p>
        <p className="text-xs opacity-60">Shipping: Free</p>


      </FlexCol>
      <FlexRow className={` h-[3rem] bg-lunnheim-olive py-2 transition-all duration-500 ${zeroItems ? "opacity-30" : ""}  place-items-center rounded-md text-lunnheim-ivory-yellow ${activeCheckout ? "flex !bg-lunnheim-ivory-yellow !text-lunnheim-dark-olive" : "mb-16"}`}>
        <button onClick={!activeCheckout ? activateCheckout : deactivateCheckout} className={cn("w-full text-center", activeCheckout && "")} disabled={zeroItems || globalData.shoppingCartData.totalPrice <= 0} >{activeCheckout ? "Go back" : "Go to checkout"}</button>
      </FlexRow>


    </FlexCol>
  );
};

export default ShoppingCart;
