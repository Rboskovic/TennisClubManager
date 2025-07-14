export interface Club {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  courts: Court[];
}

export interface Court {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor';
  surface: 'clay' | 'hard' | 'grass';
  hourlyRate: number;
  status: 'active' | 'maintenance' | 'closed';
}

export interface TimeSlot {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
  bookedBy?: string;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface DashboardStats {
  todayBookings: number;
  todayRevenue: number;
  weeklyRevenue: number;
  courtUtilization: number;
  popularCourts: { courtName: string; bookings: number }[];
}
