import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the current year
 * @returns The current year as a number
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

