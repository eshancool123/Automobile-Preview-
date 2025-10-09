import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, DollarSign, Wrench, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/badge';

interface DashboardOverviewProps {
  userId: string;
  onNavigate: (tab: string) => void;
}

export function DashboardOverview({ userId, onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      title: 'Upcoming Appointments',
      value: '2',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => onNavigate('appointments'),
    },
    {
      title: 'Active Projects',
      value: '1',
      icon: Wrench,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => onNavigate('modifications'),
    },
    {
      title: 'Pending Payments',
      value: '$150',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => onNavigate('payments'),
    },
    {
      title: 'Completed Services',
      value: '8',
      icon: CheckCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      action: () => onNavigate('appointments'),
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      service: 'House Cleaning',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'HVAC Maintenance',
      date: 'Today',
      time: '2:00 PM',
      status: 'in-progress',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      message: 'Payment of $120.00 processed successfully',
      time: '2 hours ago',
    },
    {
      id: '2',
      message: 'Kitchen Renovation progress updated to 45%',
      time: '5 hours ago',
    },
    {
      id: '3',
      message: 'New appointment confirmed for Oct 5',
      time: '1 day ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2>Welcome Back!</h2>
        <p className="text-muted-foreground mt-1">Here's what's happening with your services</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={stat.action}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-muted-foreground">{stat.title}</CardTitle>
                <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription className="mt-1">Your scheduled services</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('appointments')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">{appointment.service}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={appointment.status === 'in-progress' ? 'default' : 'secondary'}
                  className={
                    appointment.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : 'bg-green-100 text-green-800 hover:bg-green-100'
                  }
                >
                  {appointment.status === 'in-progress' ? 'In Progress' : 'Confirmed'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription className="mt-1">Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
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
          <CardDescription className="mt-1">Common tasks and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 hover:bg-gray-50"
              onClick={() => onNavigate('appointments')}
            >
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm">Book Appointment</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 hover:bg-gray-50"
              onClick={() => onNavigate('payments')}
            >
              <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm">Make Payment</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 hover:bg-gray-50"
              onClick={() => onNavigate('modifications')}
            >
              <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm">Request Modification</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 hover:bg-gray-50"
              onClick={() => onNavigate('chat')}
            >
              <div className="h-12 w-12 rounded-lg bg-gray-50 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-sm">Get Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
