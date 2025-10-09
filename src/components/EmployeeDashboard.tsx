import React from 'react';
import { useState } from 'react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './employee/DashboardOverview';
import { ServiceProgressView } from './employee/ServiceProgressView';
import { EmployeeAppointmentsView } from './employee/EmployeeAppointmentsView';
import { Home, Calendar, ClipboardCheck } from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
  onLogout: () => void;
}

export function EmployeeDashboard({ user, onLogout }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'service-progress', label: 'Service Progress', icon: ClipboardCheck },
    { id: 'appointments', label: 'Appointments & Requests', icon: Calendar },
  ];

  return (
    <DashboardLayout
      user={user}
      navigation={navigation}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
    >
      {activeTab === 'dashboard' && <DashboardOverview employeeId={user.id} onNavigate={setActiveTab} />}
      {activeTab === 'service-progress' && <ServiceProgressView employeeId={user.id} />}
      {activeTab === 'appointments' && <EmployeeAppointmentsView employeeId={user.id} />}
    </DashboardLayout>
  );
}
