import React from 'react';
import { useState } from 'react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './admin/DashboardOverview';
import { UserManagementView } from './admin/UserManagementView';
import { ServiceManagementView } from './admin/ServiceManagementView';
import { PaymentsView } from './admin/PaymentsView';
import { ModificationRequestsView } from './admin/ModificationRequestsView';
import { AnalyticsView } from './admin/AnalyticsView';
import { Home, Users, Settings, BarChart3, DollarSign, FileEdit } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'services', label: 'Service Management', icon: Settings },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'modifications', label: 'Modification Requests', icon: FileEdit },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <DashboardLayout
      user={user}
      navigation={navigation}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
    >
      {activeTab === 'dashboard' && <DashboardOverview onNavigate={setActiveTab} />}
      {activeTab === 'users' && <UserManagementView />}
      {activeTab === 'services' && <ServiceManagementView />}
      {activeTab === 'payments' && <PaymentsView />}
      {activeTab === 'modifications' && <ModificationRequestsView />}
      {activeTab === 'analytics' && <AnalyticsView />}
    </DashboardLayout>
  );
}
