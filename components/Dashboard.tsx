
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Users, Building, FlaskConical, TrendingUp } from 'lucide-react';
import { BRANCHES } from '../constants';

const data = [
  { name: 'Mon', count: 45 },
  { name: 'Tue', count: 52 },
  { name: 'Wed', count: 38 },
  { name: 'Thu', count: 65 },
  { name: 'Fri', count: 48 },
  { name: 'Sat', count: 30 },
  { name: 'Sun', count: 12 },
];

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Overview</h1>
          <p className="text-slate-500">Real-time health of your diagnostic network</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Branches</option>
          {BRANCHES.map(b => (
            <option key={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Tests" value="158" icon={Activity} color="bg-blue-600" />
        <StatCard title="Active Patients" value="1,240" icon={Users} color="bg-indigo-600" />
        <StatCard title="Total Branches" value={BRANCHES.length} icon={Building} color="bg-emerald-600" />
        <StatCard title="Pending Reports" value="24" icon={FlaskConical} color="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Weekly Test Volume</h3>
            <TrendingUp size={18} className="text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="bg-blue-100 p-3 rounded-full mb-3 group-hover:bg-blue-200">
                <Users size={20} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium">New Patient</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="bg-indigo-100 p-3 rounded-full mb-3 group-hover:bg-indigo-200">
                <FlaskConical size={20} className="text-indigo-600" />
              </div>
              <span className="text-sm font-medium">Log Results</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
