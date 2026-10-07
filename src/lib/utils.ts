import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "MXN";
  const locale = currency === "MXN" ? "es-MX" : currency === "USD" ? "en-US" : "es-AR";
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
}
