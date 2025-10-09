import React from 'react';
import { useState } from 'react';
import { User } from '../App';
import { CustomerLayout } from './customer/CustomerLayout';
import { DashboardOverview } from './customer/DashboardOverview';
import { AppointmentsView } from './customer/AppointmentsView';
import { ModificationRequestsView } from './customer/ModificationRequestsView';
import { PaymentsView } from './customer/PaymentsView';
import { ChatbotView } from './customer/ChatbotView';
import { Home, Calendar, MessageSquare, CreditCard, ClipboardList } from 'lucide-react';

interface CustomerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'modifications', label: 'Modifications', icon: ClipboardList },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'chat', label: 'Support Chat', icon: MessageSquare },
  ];

  return (
    <CustomerLayout
      user={user}
      navigation={navigation}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
    >
      {activeTab === 'dashboard' && <DashboardOverview userId={user.id} onNavigate={setActiveTab} />}
      {activeTab === 'appointments' && <AppointmentsView userId={user.id} />}
      {activeTab === 'modifications' && <ModificationRequestsView userId={user.id} />}
      {activeTab === 'payments' && <PaymentsView userId={user.id} />}
      {activeTab === 'chat' && <ChatbotView userId={user.id} userName={user.name} />}
    </CustomerLayout>
  );
}
