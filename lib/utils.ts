import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlSepoliaBasescan(address?: string) {
  return `https://www.sepolia.basescan.org/address/${address}`;
}