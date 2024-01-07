'use server'

import type { Stripe } from 'stripe'

import { CURRENCY } from '@/src/stripe/stripe-config'
import { formatAmountForStripe } from '@/utils/stripe-helpers'
import { stripe } from '@/lib/stripe'

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get('amount') as string),
        CURRENCY
      ),

      shipping: {
        address: {
          city: data.get('city') as string,
          country: 'Norway',
          line1: data.get('address') as string,
          postal_code: data.get('postalCode') as string,
          state: data.get('city') as string,
        },
        name: data.get('firstName') as string + " " + data.get('lastName') as string,
        phone: data.get('phone') as string,

      },
      receipt_email: data.get('email') as string,
      automatic_payment_methods: { enabled: true },

      description: "Bestilling fra Lunnheim.no",


      currency: CURRENCY,
    })


  return { client_secret: paymentIntent.client_secret as string }
}

