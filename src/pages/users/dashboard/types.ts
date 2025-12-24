// import { LucideIcon } from "lucide-react";

// export interface CardStat {
//   title: string;
//   value: string;
//   icon: LucideIcon;
//   color: string;
//   lightColor: string;
// }

// export interface BookingData {
//   date: string;
//   total: number;
//   actual: number;
//   pending: number;
// }

import React from "react";

export interface CardStat {
  title: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;  // ✅ Explicit component type
  color: string;
  lightColor: string;
  path?: string;
}

export interface DashboardCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;  // ✅ Explicit component type
  color: string;
  lightColor: string;
}


export interface BookingData {
  date: string;
  total: number;
  actual: number;
  pending: number;
}

export type ActiveTab = "7days" | "30days";

export interface BookingsOverviewProps {
  data: BookingData[];
  activeTab: ActiveTab;
  setActiveTab: (value: ActiveTab) => void;
}

export interface LineChartData {
  name: string;
  color: string;
  values: number[];
}


export interface VehicleStatus {
  approved: number;
  pending: number;
  rejected: number;
}

export interface VehicleStatusChartProps {
  status: VehicleStatus;
}

export interface DonutSegment {
  name: string;
  color: string;
  path: string;
  value: number;
}
