import currency from "currency.js";

export function formatIdr(price: number) {
  return currency(price || 0, { symbol: "Rp ", separator: "." })
    .format()
    .replace(/\.00$/, "");
}
