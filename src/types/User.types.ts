export interface ApiUser {
  _id: string;
  name: string;
  email: string;
  mobilenumber: string;
  profilePic: string;
  createdAt: string;
}

export interface UserUI {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "Active" | "Inactive";
  initials: string;
  color: string;
  vehicles: number; // 👈 COUNT
}