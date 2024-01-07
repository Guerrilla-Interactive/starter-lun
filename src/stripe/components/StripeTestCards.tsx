export default function StripeTestCards(): JSX.Element {
  return (
    <div className="">
      Use any of the{' '}
      <a
        href="https://stripe.com/docs/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stripe test cards
      </a>{' '}
      for this demo, e.g.{' '}
      <div>
        4242<span></span>4242<span></span>4242<span></span>4242
      </div>
      .
    </div>
  )
}
