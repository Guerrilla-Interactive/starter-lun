import 'server-only'

import Stripe from 'stripe'
import { serverEnv } from '../env/server.mjs'

export const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'nextjs-with-stripe-typescript-demo',
    url: 'https://nextjs-with-stripe-typescript-demo.vercel.app',
  },
})
