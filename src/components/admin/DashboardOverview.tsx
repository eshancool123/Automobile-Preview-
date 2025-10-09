import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      title: 'Total Users',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'up',
    },
    {
      title: 'Active Bookings',
      value: '48',
      change: '+8%',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: 'up',
    },
    {
      title: 'Monthly Revenue',
      value: '$15.4k',
      change: '-3%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: 'down',
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: 'up',
    },
  ];

  const revenueData = [
    { day: 'Mon', revenue: 2400 },
    { day: 'Tue', revenue: 2800 },
    { day: 'Wed', revenue: 2200 },
    { day: 'Thu', revenue: 3100 },
    { day: 'Fri', revenue: 2900 },
    { day: 'Sat', revenue: 3400 },
    { day: 'Sun', revenue: 2600 },
  ];

  const appointmentsData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 15 },
    { day: 'Wed', count: 10 },
    { day: 'Thu', count: 18 },
    { day: 'Fri', count: 14 },
    { day: 'Sat', count: 22 },
    { day: 'Sun', count: 16 },
  ];

  const recentUsers = [
    {
      id: '1',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      role: 'customer',
      joined: '2 hours ago',
    },
    {
      id: '2',
      name: 'Robert Chen',
      email: 'robert@example.com',
      role: 'employee',
      joined: '5 hours ago',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'customer',
      joined: '1 day ago',
    },
  ];

  const systemAlerts = [
    {
      id: '1',
      type: 'warning',
      message: '3 pending modification requests need review',
      action: 'services',
    },
    {
      id: '2',
      type: 'info',
      message: '2 employees need to complete safety training',
      action: 'users',
    },
    {
      id: '3',
      type: 'success',
      message: 'System backup completed successfully',
      action: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">System overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <p
                  className={`text-xs mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Revenue trends for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Appointments</CardTitle>
            <CardDescription>Booking volume for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Users</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('users')}>
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : alert.type === 'info'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.type === 'warning'
                        ? 'text-yellow-600'
                        : alert.type === 'info'
                        ? 'text-blue-600'
                        : 'text-green-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    {alert.action && (
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 h-auto mt-1"
                        onClick={() => onNavigate(alert.action)}
                      >
                        Take Action →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('users')}
            >
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('services')}
            >
              <Wrench className="h-6 w-6" />
              <span>Manage Services</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('analytics')}
            >
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => alert('Export report functionality')}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
