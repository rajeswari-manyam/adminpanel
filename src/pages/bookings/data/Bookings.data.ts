import { Booking } from "../../../types/Bookings.types";

export const BOOKINGS: Booking[] = [
    {
        id: 'BK001',
        user: 'Ramesh Patel',
        email: 'ramesh.patel@example.com',      // ✅ ADD
        phone: '+91 98765 43210',               // ✅ ADD
        vehicle: 'Honda Activa',
        vehicleNumber: 'MH-12-AB-1234',         // ✅ ADD
        type: 'Bike',
        start: '24/04/2024',
        end: '26/04/2024',
        days: 2,
        amount: '500',
        status: 'Upcoming',
    },
    // ... add same fields to other entries

    {
        id: 'BK002',
        user: 'Priya Reddy',
        email: 'priya.reddy@example.com',      // ✅ ADD
        phone: '+91 98765 43210',               // ✅ ADD
        vehicle: 'Honda City',
        vehicleNumber: 'MH-12-AB-1234',         // ✅ ADD
        type: 'Car',
        start: '23/04/2024',
        end: '25/04/2024',
        days: 2,
        amount: '1200',
        status: 'Pending',
    },
 
];
