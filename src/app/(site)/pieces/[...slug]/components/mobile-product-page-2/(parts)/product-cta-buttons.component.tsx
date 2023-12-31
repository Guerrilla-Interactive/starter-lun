export const ProductCtaButtons: React.FC = () => {
  return (
    <>
      <button
        data-dx="add-to-cart-btn"
        className="w-full rounded-xl bg-lunnheim-dark-olive px-6 py-3 text-xs text-lunnheim-pale-yellow  transition duration-300 hover:opacity-80"
      >
        Add to bag
      </button>
      {/* <button
                data-dx="add-to-cart-btn"
                className="w-full rounded-lg border-[1px] border-dashed border-lunnheim-dark-olive border-opacity-50  bg-lunnheim-ivory-yellow px-6 py-4 text-xs text-lunnheim-black transition duration-300 hover:opacity-70"
            >
                Design your own
            </button> */}
    </>
  )
}
