import { LucideIcon } from "lucide-react";

export interface CardStat {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  lightColor: string;
}

export interface BookingData {
  date: string;
  total: number;
  actual: number;
  pending: number;
}
