export interface Booking {
  id: string;
  user: string;
  vehicle: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  amount: number;
  status: 'Upcoming' | 'Pending' | 'Confirmed' | 'Completed';
}

export type FilterStatus =
  | 'All Bookings'
  | 'Upcoming'
  | 'Pending'
  | 'Confirmed'
  | 'Completed';
