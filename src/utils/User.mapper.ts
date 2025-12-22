import { ApiUser, UserUI } from "../types/User.types";

export const mapApiUserToUI = (user: ApiUser): UserUI => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.mobilenumber || "-",
  joinDate: new Date(user.createdAt).toLocaleDateString(),
  status: "Active",
  initials: user.name.charAt(0).toUpperCase(),
  color: "bg-indigo-500",
  vehicles: 0, // will be replaced later
});