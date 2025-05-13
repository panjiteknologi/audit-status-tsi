import currency from "currency.js";

export function formatToK(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return value.toString();
}

export function formatIdr(price: number) {
  return currency(price || 0, { symbol: "Rp ", separator: "." })
    .format()
    .replace(/\.00$/, "");
}

export function formatNumber(num: number) {
  return currency(num || 0, { separator: ".", symbol: "" })
    .format()
    .replace(/\.00$/, "");
}
