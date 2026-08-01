import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatDateTime(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
