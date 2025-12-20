import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Flag,
} from "lucide-react";
import { CardStat, BookingData } from "./types";

export const statCards: CardStat[] = [
  { title: "Total Users", value: "1,248", icon: Users, color: "bg-blue-500", lightColor: "bg-blue-400" },
  { title: "Pending Vehicles", value: "32", icon: Flag, color: "bg-orange-500", lightColor: "bg-orange-400" },
  { title: "Approved Vehicles", value: "210", icon: CheckCircle, color: "bg-green-500", lightColor: "bg-green-400" },
  { title: "Total Bookings", value: "3,540", icon: Calendar, color: "bg-purple-500", lightColor: "bg-purple-400" },
];

export const bookingCards: CardStat[] = [
  { title: "Today's Bookings", value: "68", icon: Clock, color: "bg-blue-500", lightColor: "bg-blue-400" },
  { title: "Pending Bookings", value: "41", icon: AlertTriangle, color: "bg-orange-500", lightColor: "bg-orange-400" },
  { title: "Completed Bookings", value: "3,112", icon: CheckCircle, color: "bg-green-500", lightColor: "bg-green-400" },
];

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
