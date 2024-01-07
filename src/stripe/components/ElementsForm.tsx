'use client'


import type { StripeError } from '@stripe/stripe-js'

import * as React from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js'


import getStripe from '@/utils/get-stripejs'
import { createPaymentIntent } from '../actions/stripe'
import { CURRENCY, } from '../stripe-config'
import { COLORS } from '@/src/styles/theme'
import { ShoppingCartItem, useGlobalContext } from '../../context/global-context'
import { Flex, FlexCol, FlexRow } from '@/src/components/nextgen-core-ui'
import { OrderClient, OrderEmailProps } from '@/src/emails/order-success'
import { useLocalStorage } from '@/src/utils/hooks/use-local-storage'
import { sendOrderEmail } from '@/src/app/actions'



function CheckoutForm(): JSX.Element {
  const { globalData, setGlobalData } = useGlobalContext();
  const [, setCartItemsCached] = useLocalStorage<Array<ShoppingCartItem>>('cartItems', [])
  const [, setOrderSnapshots] = useLocalStorage<Array<OrderEmailProps>>('cartSnapshots', [])
  const [input, setInput] = React.useState<OrderClient>(
    {
      date: new Date(), // Date around the time of purchase
      price: globalData.shoppingCartData.totalPrice,
      firstName: globalData.orderSnapshot?.client.firstName || '',
      lastName: globalData.orderSnapshot?.client.lastName || '',
      email: globalData.orderSnapshot?.client.email || '',
      phone: globalData.orderSnapshot?.client.phone || '',
      address: globalData.orderSnapshot?.client.address || '',
      city: globalData.orderSnapshot?.client.city || '',
      postalCode: globalData.orderSnapshot?.client.postalCode || '',
      metadata: globalData.shoppingCartData.items.toString().toString(),
    })

  const [, setPaymentType] = React.useState<string>('')
  const [payment, setPayment] = React.useState<{
    status: 'initial' | 'processing' | 'error' | 'succeeded'
  }>({ status: 'initial' })
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const stripe = useStripe()
  const elements = useElements()

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>

      case 'requires_action':
        return <h2>Authenticating...</h2>

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        )

      default:
        return null
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
    elements?.update({ amount: input.price })
  }





  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {



    try {
      e.preventDefault()

      const billingDetails = {
        name: input.firstName + ' ' + input.lastName,
        email: input.email, // Add a state for email
        phone: input.phone, // Add a state for phone
        address: {
          line1: input.address, // Add a state for address
          city: input.city, // Add a state for city
          postal_code: input.postalCode, // Add a state for postal code
          // You may add other address components like state, country etc.
        },
      };




      // Abort if form isn't valid
      if (!e.currentTarget.reportValidity()) return
      if (!elements || !stripe) return

      setPayment({ status: 'processing' })



      const { error: submitError } = await elements.submit()

      if (submitError) {
        setPayment({ status: 'error' })
        setErrorMessage(submitError.message ?? 'An unknown error occurred')
        return
      }

      // Create a PaymentIntent with the specified amount.
      const { client_secret: clientSecret } = await createPaymentIntent(
        new FormData(e.target as HTMLFormElement)
      )

      // Remove items from cart
      function clearCart() {
        // Remove cart items from context
        setGlobalData(prev => {
          return {
            ...prev,
            shoppingCartData: {
              items: [],
              totalItems: 0,
              totalPrice: 0
            }
          }
        })
        // Remove cart items from local storage
        setCartItemsCached([])
      }


      // Use your card Element with other Stripe.js APIs
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        // Here we set redirect to if_required to prevent redirection by Stripe on payment success
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}`,
          payment_method_data: {
            billing_details: billingDetails,

          },
        },
      })

      if (confirmError) {
        setPayment({ status: 'error' })
        setErrorMessage(confirmError.message ?? 'An unknown error occurred')
      }
      // At this point, payment is successful payment
      setPayment({ status: 'succeeded' })

      // Here onwards, we handle the housekeeping logic like clearing user's 
      // cart and sending confirmation email for the order
      // Note that we're handling the housekeeping logic in a try block because, 
      // to differentiate between error due to unsuccessful payment and other 
      // error despite the payment being successful 
      try {
        // Remove items from cart
        clearCart()
        // Take snapshot of the address and payment data, and save it in localstorage
        const currentOrderSnapshot: OrderEmailProps = {
          client: input,
          items: globalData.shoppingCartData.items
        }
        setOrderSnapshots(prev => [...prev, currentOrderSnapshot])
        setGlobalData(prev => ({ ...prev, orderSnapshot: currentOrderSnapshot }))

        // Send email
        const emailResponse = await sendOrderEmail(currentOrderSnapshot)
        console.log('got email response', emailResponse)
        if (!emailResponse.success) {
          setPayment({ status: 'succeeded' })
          setErrorMessage(`Error sending confirmation email. ${emailResponse.message}`)
        }

      } catch (err) {
        // const { message } = err as StripeError
        console.log(err)
        setPayment({ status: 'succeeded' })
        setErrorMessage(`Error sending confirmation email. Please contact us.`)
      }

    } catch (err) {
      const { message } = err as StripeError

      setPayment({ status: 'error' })
      setErrorMessage(message ?? 'An unknown error occurred')
    }
    setPayment({ status: 'succeeded' })
  }

  return (
    <>
      <FlexCol className="w-full gap-y-4 ">

        <form className="flex flex-col gap-y-4 w-full text-sm" onSubmit={handleSubmit}>
          <FlexRow className=' w-full justify-evenly gap-x-8'>
            <FlexCol className="gap-2  max-w-md w-full">
              <FlexRow className="text-base">
                Fakturaadresse
              </FlexRow>
              <Flex className="gap-2 w-full" >

                <FlexCol className="w-full"  >
                  <input
                    placeholder="Fornavn"
                    className="p-2 text-lunnheim-darker-olive flex border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="firstName"
                    value={input.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
                <FlexCol className="w-1/3">
                  <input
                    placeholder="Etternavn"
                    className="p-2 flex text-lunnheim-darker-olive  border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="lastName"
                    value={input.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
              </Flex>
              <FlexRow className="gap-2">
                <FlexCol className="w-full">
                  <input
                    placeholder="Adresse"
                    className="p-2 flex text-lunnheim-darker-olive w-full border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="address"
                    onChange={handleInputChange}
                    value={input.address}
                    required
                  />
                </FlexCol>
              </FlexRow>
              <FlexRow className="gap-2 w-full">
                <FlexCol className="">
                  <input
                    placeholder="Postnummer"
                    className="p-2 text-lunnheim-darker-olive flex border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="postalCode"
                    value={input.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
                <FlexCol className="w-full">
                  <input
                    placeholder="By"
                    className="p-2 text-lunnheim-darker-olive flex border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="city"
                    value={input.city}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
              </FlexRow>
              <FlexRow className="gap-2  w-full">
                <FlexCol className="w-full">
                  <input
                    placeholder="E-post "
                    className="p-2 text-lunnheim-darker-olive flex border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
                <FlexCol className="w-[1/4]">
                  <input
                    placeholder="Telefon"
                    className="p-2 text-lunnheim-darker-olive  flex border-lunnheim-olive border-opacity-30 placeholder-lunnheim-olive bg-lunnheim-pale-yellow bg-opacity-20  border-2 rounded-md"
                    type="Text"
                    name="phone"
                    value={input.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FlexCol>
              </FlexRow>



              <FlexRow className="mt-6 opacity-80 mb-8" >
                <FlexCol className="border-2  border-lunnheim-dark-olive rounded-md w-full p-4 md:p-0 h-[10rem] ">
                  <FlexRow className="h-full justify-start gap-x-12 md:px-8 items-center ">
                    <FlexCol className="h-full items-center">
                      <svg className="flex my-auto" width="55" height="65" viewBox="0 0 55 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.262 64.8993C42.3247 64.955 54.5749 50.5076 54.641 32.6007C54.7072 14.6938 42.5641 0.156361 27.5015 0.100711C12.4388 0.0450614 0.188644 14.4924 0.122486 32.3993C0.0563277 50.3062 12.1994 64.8437 27.262 64.8993ZM27.2672 63.5061C13.7423 63.4561 2.85856 48.7836 2.91906 32.4096C2.97955 16.0357 13.9715 1.44395 27.4963 1.49392C41.0212 1.54388 51.9048 16.251 51.8444 32.5904C51.7841 48.9298 40.756 63.5559 27.2672 63.5061Z" fill="#474224" />
                        <path d="M34.117 42.759L34.1219 41.4336C30.5937 43.0111 27.948 42.6691 28.4021 40.3521C30.9917 30.6417 31.4375 29.1412 31.4375 29.1412C31.5215 25.4656 24.2499 28.1132 20.6036 29.8964L20.5987 31.2219C28.6249 27.717 27.106 33.6317 23.7302 41.6603C21.0441 48.0484 29.6467 45.0988 34.117 42.759Z" fill="#474224" />
                        <ellipse cx="28.4353" cy="19.4198" rx="3.27331" ry="3.19537" transform="rotate(0.211682 28.4353 19.4198)" fill="#474224" />
                      </svg>



                    </FlexCol>
                    <FlexCol className=" ">

                      Gjennomfør testbetaling ved å repetere &quot;42&quot; inntil alle betalingsfeltene er fyllt.
                    </FlexCol>
                  </FlexRow>
                </FlexCol>
              </FlexRow>


            </FlexCol>
            <FlexCol>

              <input type="hidden" name="amount" value={input.price} />
              <input type="hidden" name="metadata" value={input.metadata} />
              <fieldset className="elements-style flex flex-col gap-y-4">
                <div className="FormRow elements-style">
                  <PaymentElement
                    onChange={(e) => {
                      setPaymentType(e.value.type)
                    }}
                  />
                </div>
              </fieldset>
              <button
                className="elements-style-background bg-lunnheim-olive py-4  mt-8 rounded-lg text-lunnheim-white"
                type="submit"
                disabled={
                  !['initial', 'succeeded', 'error'].includes(payment.status) ||
                  !stripe
                }
              >
                Process payment

              </button>
            </FlexCol>
          </FlexRow>
        </form>
        <PaymentStatus status={payment.status} />
      </FlexCol>
    </>
  )
}

export default function ElementsForm(): JSX.Element {
  const { globalData } = useGlobalContext();
  return (
    <Elements
      stripe={getStripe()}

      options={{
        locale: 'no',
        appearance: {
          variables: {
            colorIcon: COLORS.LUNNHEIM_DARK_OLIVE,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',

          },
        },
        currency: CURRENCY,
        mode: 'payment',
        amount: Math.round(globalData.shoppingCartData.totalPrice),
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
