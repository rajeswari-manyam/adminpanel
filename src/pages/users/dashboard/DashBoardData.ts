import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Car,
} from "lucide-react";
import { CardStat, BookingData } from "./types";
import { useUserStore } from "../../../store/UserStore";

// ✅ Hook to get dynamic stat cards
export const useStatCards = (): CardStat[] => {
  const usersCount = useUserStore((state) => state.usersCount);
  const pendingVehiclesCount = useUserStore((state) => state.pendingVehiclesCount);
  const approvedVehiclesCount = useUserStore((state) => state.approvedVehiclesCount);
  const totalBookingsCount = useUserStore((state) => state.totalBookingsCount);

  return [
    {
      title: "Total Users",
      value: usersCount > 0 ? usersCount.toString() : "0",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-400",
      path: "/users"
    },
    {
      title: "Pending Vehicles",
      value: pendingVehiclesCount.toString(),
      icon: Car,
      color: "bg-orange-500",
      lightColor: "bg-orange-400",
      path: "/vehicles"
    },
    {
       title: "Approved Vehicles",
      value: approvedVehiclesCount.toString(),
      icon: Car,
      color: "bg-green-500",
      lightColor: "bg-green-400",
      path: "/vehicles"
    },
    {
      title: "Total Bookings",
      value: totalBookingsCount.toString(),
      icon: Calendar,
      color: "bg-purple-500",
      lightColor: "bg-purple-400",
      path: "/bookings"
    },
  ];
};

// ✅ Hook to get dynamic booking cards - FIXED
export const useBookingCards = (): CardStat[] => {
  const todaysBookingsCount = useUserStore((state) => state.todaysBookingsCount); // ✅ CORRECT
  const pendingBookingsCount = useUserStore((state) => state.pendingBookingsCount);
  const completedBookingsCount = useUserStore((state) => state.completedBookingsCount);

  return [
    {
      title: "Today's Bookings",
      value: todaysBookingsCount.toString(), // ✅ FIXED: Now uses todaysBookingsCount
      icon: Clock,
      color: "bg-blue-500",
      lightColor: "bg-blue-400",
      path: "/bookings"
    },
    {
      title: "Pending Bookings",
      value: pendingBookingsCount.toString(),
      icon: AlertTriangle,
      color: "bg-orange-500",
      lightColor: "bg-orange-400",
      path: "/bookings"
    },
    {
      title: "Completed Bookings",
      value: completedBookingsCount.toString(),
      icon: CheckCircle,
      color: "bg-green-500",
      lightColor: "bg-green-400",
      path: "/bookings"
    },
  ];
};

export const bookings7Days: BookingData[] = [
  { date: "Apr 16", total: 100, actual: 85, pending: 90 },
  { date: "Apr 22", total: 150, actual: 130, pending: 140 },
  { date: "Apr 23", total: 180, actual: 165, pending: 170 },
  { date: "Apr 24", total: 200, actual: 190, pending: 195 },
];

export const bookings30Days: BookingData[] = [
  { date: "Mar 25", total: 80, actual: 70, pending: 75 },
  { date: "Apr 1", total: 120, actual: 100, pending: 110 },
  { date: "Apr 8", total: 140, actual: 125, pending: 130 },
  { date: "Apr 15", total: 160, actual: 145, pending: 150 },
  { date: "Apr 22", total: 180, actual: 165, pending: 170 },
  { date: "Apr 29", total: 210, actual: 195, pending: 200 },
];

export const newUsersData = [
  { label: "Today", value: 35, color: "bg-blue-500" },
  { label: "Pending", value: 25, color: "bg-orange-500" },
  { label: "Completed", value: 45, color: "bg-green-500" },
];

export const vehicleStatus = {
  approved: 65,
  pending: 20,
  rejected: 15,
};






