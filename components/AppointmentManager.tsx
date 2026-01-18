
import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { INITIAL_APPOINTMENTS, BRANCHES, TESTS } from '../constants';
import { Calendar, Filter, Plus, Search, MapPin, ClipboardList } from 'lucide-react';

export const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [filter, setFilter] = useState<string>('All');

  const filteredAppointments = filter === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED: return 'bg-emerald-100 text-emerald-700';
      case AppointmentStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case AppointmentStatus.IN_LAB: return 'bg-blue-100 text-blue-700';
      case AppointmentStatus.COLLECTED: return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500">Manage bookings across all branches</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          New Appointment
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', ...Object.values(AppointmentStatus)].map(s => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Test</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-blue-600">{apt.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{apt.patientName}</div>
                    <div className="text-xs text-slate-500">{apt.patientId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{TESTS.find(t => t.id === apt.testId)?.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={12} className="text-slate-400" />
                      {BRANCHES.find(b => b.id === apt.branchId)?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-600">{apt.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
