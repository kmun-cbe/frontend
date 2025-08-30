export interface User {
  id: string;
  userId: string; // KMUN25xxx format
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution?: string;
  grade?: string;
  role: UserRole;
  profileImage?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 
  | 'DELEGATE' 
  | 'DEV_ADMIN' 
  | 'DELEGATE_AFFAIRS' 
  | 'FRONT_DESK_ADMIN' 
  | 'COMMITTEE_DIRECTOR' 
  | 'HOSPITALITY_ADMIN';

export interface Registration {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isKumaraguru: boolean;
  rollNumber?: string;
  institutionType?: 'SCHOOL' | 'COLLEGE' | 'COMPANY';
  institution?: string;
  grade?: string;
  totalMuns: string;
  committeePreference1: string;
  portfolioPreference1: string;
  committeePreference2: string;
  portfolioPreference2: string;
  committeePreference3: string;
  portfolioPreference3: string;
  idDocument: string;
  munResume?: string;
  status: 'PENDING' | 'SHORTLISTED' | 'CONFIRMED' | 'REJECTED';
  allocatedCommitteeId?: string;
  allocatedPortfolioId?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  submittedAt: string;
  updatedAt: string;
}

export interface Committee {
  id: string;
  name: string;
  shortName: string;
  agenda: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  description: string;
  backgroundGuide?: string;
  logo?: string;
  directorId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  portfolios?: Portfolio[];
  director?: User;
}

export interface Portfolio {
  id: string;
  committeeId: string;
  name: string;
  isAllocated: boolean;
  allocatedTo?: string;
  createdAt: string;
  updatedAt: string;
  committee?: Committee;
}

export interface Payment {
  id: string;
  userId: string;
  registrationId?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  invoiceUrl?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface CheckIn {
  id: string;
  userId: string;
  type: 'CONFERENCE' | 'ACCOMMODATION';
  status: 'CHECKED_IN' | 'CHECKED_OUT';
  kitReceived: boolean;
  markedBy: string;
  markedAt: string;
  location?: string;
  notes?: string;
  user?: User;
  marker?: User;
}

export interface Attendance {
  id: string;
  userId: string;
  eventId: string;
  committeeId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  markedBy: string;
  markedAt: string;
  notes?: string;
  user?: User;
  event?: Event;
  committee?: Committee;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  committeeId?: string;
  status: 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  committee?: Committee;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomType: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'QUAD';
  capacity: number;
  currentOccupancy: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoomAllocation {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'BOOKED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  allocatedBy: string;
  allocatedAt: string;
  user?: User;
  room?: Room;
}

export interface AccommodationBooking {
  id: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  roomPreference: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'QUAD';
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  updatedAt: string;
  user?: User;
  roomAllocation?: RoomAllocation;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  resolvedBy?: string;
  resolvedAt?: string;
  submittedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  targetAudience: 'ALL' | 'ROLE_SPECIFIC' | 'SPECIFIC_USERS';
  targetRoles?: UserRole[];
  specificUsers?: string[];
  sentBy: string;
  sentAt: string;
  expiresAt?: string;
  isRead?: boolean;
  readAt?: string;
}

export interface PricingConfig {
  id: string;
  internalDelegate: number;
  externalDelegate: number;
  accommodationCharge: number;
  currency: string;
  isActive: boolean;
  updatedBy: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  user?: User;
}

export interface Popup {
  id: string;
  title: string;
  content: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  targetAudience: 'ALL' | 'ROLE_SPECIFIC' | 'SPECIFIC_USERS';
  targetRoles?: UserRole[];
  specificUsers?: string[];
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Marks {
  id: string;
  userId: string;
  committeeId: string;
  eventId: string;
  marks: number;
  maxMarks: number;
  feedback?: string;
  uploadedBy: string;
  uploadedAt: string;
  user?: User;
  committee?: Committee;
  event?: Event;
}