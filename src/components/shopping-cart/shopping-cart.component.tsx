import React from "react";
import { Flex, FlexCol, FlexRow } from "../nextgen-core-ui";
import { ShoppingCartItem, useGlobalContext } from "@/src/context/global-context";
import { cn } from "@/src/utils/cn.util";
import { useLocalStorage } from "@/src/utils/hooks/use-local-storage";

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
    <FlexCol className="w-full max-w-[22rem] ease-out justify-between gap-y-3 rounded-2xl font-sans md:w-1/3 min-w-[22rem]">
      <FlexCol className={`h-1/2 ${zeroItems ? "opacity-30" : ""} gap-y-1 rounded-2xl  bg-lunnheim-olive bg-opacity-5  font-thin h-full`}>
        {globalData.shoppingCartData.items.length > 0 ? (
          globalData.shoppingCartData.items.map((item) => (
            <Flex key={item.id} className="border-rounded scale-90 first:mt-3 w-full justify-between group rounded-lg items-center bg-lunnheim-ivory-yellow bg-opacity-20 p-3">
              <Flex className="text-sm w-full gap-x-4">
                <FlexCol className="w-1/6">
                  <img src={item.imageUrl} alt="" className="w-full rounded-md" />
                </FlexCol>
                <FlexCol className="w-full">
                  <FlexCol className="text-sm w-full">{item.name}</FlexCol>
                  <FlexCol className="text-xs">NOK {item.price},00</FlexCol>
                  <FlexCol className="md:flex-row tracking-wide opacity-60 text-xs">{item.variant}</FlexCol>
                </FlexCol>
              </Flex>

              <button className="bg-lunnheim-ivory-yellow bg-opacity-30 !group-hover:scale-80 text-lunnheim-darker-olive opacity-80 active:scale-90 hover:scale-95 hover:opacity-100 text-xs p-2 px-3 rounded-full" onClick={() => handleDelete(item.id)}>x</button>
            </Flex>
          ))
        ) : (
          <Flex className={`h-full place-self-center rounded-2xl bg-slate-200 bg-opacity-10 p-6 self-center justify-self-center my-auto text-center text-xl font-thin opacity-20`}>
            <div className="my-auto">Empty cart</div>
          </Flex>
        )}
      </FlexCol>
      <FlexCol className="p-6 bg-lunnheim-olive bg-opacity-10 rounded-md text-sm">

        <p className=""> Total: {globalData.shoppingCartData.totalPrice},00kr <span className="text-xs opacity-40">(inkl. moms)</span></p>
        <p className="text-xs opacity-60">Shipping: Free</p>


      </FlexCol>
      <FlexRow className={` transition-all duration-500 h-[3rem] bg-lunnheim-olive py-2 ${zeroItems ? "opacity-30" : ""}  place-items-center rounded-md text-lunnheim-ivory-yellow ${activeCheckout ? "!bg-lunnheim-ivory-yellow !text-lunnheim-dark-olive flex" : "mb-16"}`}>
        <button onClick={!activeCheckout ? activateCheckout : deactivateCheckout} className={cn("w-full text-center", activeCheckout && "")} disabled={zeroItems || globalData.shoppingCartData.totalPrice <= 0} >{activeCheckout ? "Go back" : "Go to checkout"}</button>
      </FlexRow>


    </FlexCol>
  );
};

export default ShoppingCart;
