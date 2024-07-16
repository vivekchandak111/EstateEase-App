export const arrPriceRanges = [
    "0-1000000",
    "1000000-2000000",
    "2000000-3000000",
    "3000000-4000000",
    "4000000-5000000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}