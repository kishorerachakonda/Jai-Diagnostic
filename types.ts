
export enum AppointmentStatus {
  PENDING = 'Pending',
  COLLECTED = 'Sample Collected',
  IN_LAB = 'In Lab',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  manager: string;
  status: 'Active' | 'Inactive';
}

export interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  referenceRange: string;
  unit: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  testId: string;
  branchId: string;
  date: string;
  status: AppointmentStatus;
  type: 'Walk-in' | 'Home Collection';
}

export interface DiagnosticReport {
  id: string;
  appointmentId: string;
  patientId: string;
  results: Record<string, number>;
  aiInsight?: string;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
}
