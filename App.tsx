
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AppointmentManager } from './components/AppointmentManager';
import { ReportGen } from './components/ReportGen';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FlaskConical, 
  Users, 
  Building2, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  Menu,
  X
} from 'lucide-react';

type View = 'dashboard' | 'appointments' | 'reports' | 'branches' | 'patients';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const NavItem = ({ id, label, icon: Icon }: { id: View, label: string, icon: any }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeView === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-2 px-2 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FlaskConical className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">JAI Diagnostics</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <NavItem id="appointments" label="Appointments" icon={CalendarCheck} />
            <NavItem id="reports" label="Diagnostics" icon={FlaskConical} />
            <NavItem id="patients" label="Patients" icon={Users} />
            <NavItem id="branches" label="Branches" icon={Building2} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-colors">
              <Settings size={20} />
              <span className="text-sm font-semibold">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 transition-colors">
              <LogOut size={20} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg text-slate-400 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Search size={18} />
              <input type="text" placeholder="Global Search..." className="bg-transparent border-none outline-none text-sm text-slate-700 w-64" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">Admin Portal</p>
                <p className="text-[11px] text-slate-500 mt-1">Global Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                <img src="https://picsum.photos/seed/admin/40/40" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'appointments' && <AppointmentManager />}
          {activeView === 'reports' && <ReportGen />}
          {activeView === 'patients' && (
            <div className="flex items-center justify-center h-full text-slate-400 italic">
              Patient database view coming soon...
            </div>
          )}
          {activeView === 'branches' && (
            <div className="flex items-center justify-center h-full text-slate-400 italic">
              Branch management view coming soon...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
