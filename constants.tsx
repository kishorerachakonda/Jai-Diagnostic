
import React from 'react';
import { Branch, Test, Appointment, AppointmentStatus } from './types';

export const BRANCHES: Branch[] = [
  { id: 'BR001', name: 'Downtown Main Branch', location: '123 Medical Plaza, City Center', phone: '555-0101', manager: 'Dr. Sarah Wilson', status: 'Active' },
  { id: 'BR002', name: 'Westside Diagnostics', location: '45 Health Blvd, West Hills', phone: '555-0102', manager: 'Mark Thompson', status: 'Active' },
  { id: 'BR003', name: 'East Coast Collection', location: '88 Bay Road, East Port', phone: '555-0103', manager: 'Elena Rodriguez', status: 'Active' }
];

export const TESTS: Test[] = [
  { id: 'T001', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 45, referenceRange: 'Variable', unit: 'cells/mcL' },
  { id: 'T002', name: 'Lipid Profile', category: 'Biochemistry', price: 60, referenceRange: 'LDL < 100', unit: 'mg/dL' },
  { id: 'T003', name: 'HbA1c', category: 'Diabetes', price: 35, referenceRange: '4.0 - 5.6%', unit: '%' },
  { id: 'T004', name: 'Liver Function Test (LFT)', category: 'Biochemistry', price: 80, referenceRange: 'Variable', unit: 'U/L' },
  { id: 'T005', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Hormones', price: 55, referenceRange: 'TSH: 0.4-4.0', unit: 'mIU/L' }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'APT101', patientName: 'John Doe', patientId: 'P1001', testId: 'T001', branchId: 'BR001', date: '2024-05-20', status: AppointmentStatus.COMPLETED, type: 'Walk-in' },
  { id: 'APT102', patientName: 'Jane Smith', patientId: 'P1002', testId: 'T002', branchId: 'BR002', date: '2024-05-21', status: AppointmentStatus.IN_LAB, type: 'Home Collection' },
  { id: 'APT103', patientName: 'Robert Brown', patientId: 'P1003', testId: 'T003', branchId: 'BR001', date: '2024-05-21', status: AppointmentStatus.PENDING, type: 'Walk-in' }
];
