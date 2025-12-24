

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  usersCount: number;
  pendingVehiclesCount: number;
  approvedVehiclesCount: number;
  totalBookingsCount: number;        // ✅ Added for "Total Bookings"
  todaysBookingsCount: number;       // ✅ For "Today's Bookings"
  pendingBookingsCount: number;
  completedBookingsCount: number;

  setUsersCount: (count: number) => void;
  setPendingVehiclesCount: (count: number) => void;
  setApprovedVehiclesCount: (count: number) => void;
  setTotalBookingsCount: (count: number) => void;        // ✅ Added
  setTodaysBookingsCount: (count: number) => void;
  setPendingBookingsCount: (count: number) => void;
  setCompletedBookingsCount: (count: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      usersCount: 0,
      pendingVehiclesCount: 0,
      approvedVehiclesCount: 0,
      totalBookingsCount: 0,        // ✅ Added
      todaysBookingsCount: 0,
      pendingBookingsCount: 0,
      completedBookingsCount: 0,

      setUsersCount: (count: number) => set({ usersCount: count }),
      setPendingVehiclesCount: (count: number) => set({ pendingVehiclesCount: count }),
      setApprovedVehiclesCount: (count: number) => set({ approvedVehiclesCount: count }),
      setTotalBookingsCount: (count: number) => set({ totalBookingsCount: count }),        // ✅ Added
      setTodaysBookingsCount: (count: number) => set({ todaysBookingsCount: count }),
      setPendingBookingsCount: (count: number) => set({ pendingBookingsCount: count }),
      setCompletedBookingsCount: (count: number) => set({ completedBookingsCount: count }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);