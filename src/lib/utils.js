import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateUID() {
  const curDate = new Date();
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let uid = `${curDate}`;
  for(let i=0; i<10; i++){
    uid += characters[Math.floor(Math.random() * characters.length)];
  }
  return uid;
}