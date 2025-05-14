import currency from "currency.js";

export function formatRupiah(value: number): string {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " Miliar";
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + " Juta";
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + " Ribu";
  }
  return value.toLocaleString("id-ID");
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
