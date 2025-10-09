import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, Play } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface DashboardOverviewProps {
  employeeId: string;
  onNavigate: (tab: string) => void;
}

export function DashboardOverview({ employeeId, onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      title: "Today's Appointments",
      value: '3',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Tasks',
      value: '5',
      icon: Play,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Hours Logged Today',
      value: '6.5h',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Completed This Week',
      value: '12',
      icon: CheckCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
  ];

  const todaySchedule = [
    {
      id: '1',
      time: '9:00 AM',
      service: 'Kitchen Renovation - Installation',
      customer: 'Jane Smith',
      location: '789 Elm St',
      status: 'completed',
    },
    {
      id: '2',
      time: '2:00 PM',
      service: 'HVAC Maintenance',
      customer: 'John Doe',
      location: '123 Main St',
      status: 'in-progress',
    },
    {
      id: '3',
      time: '4:00 PM',
      service: 'Plumbing Repair',
      customer: 'Alice Johnson',
      location: '321 Pine Rd',
      status: 'upcoming',
    },
  ];

  const activeProjects = [
    {
      id: '1',
      title: 'Kitchen Renovation',
      customer: 'Jane Smith',
      progress: 45,
      dueDate: 'Oct 30',
    },
    {
      id: '2',
      title: 'Office Remodel',
      customer: 'Bob Wilson',
      progress: 75,
      dueDate: 'Oct 15',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Good Morning!</h2>
        <p className="text-gray-600 mt-1">Here's your schedule for today</p>
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('appointments')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardDescription>Your appointments for Oct 3, 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex gap-3">
                  <div className="text-sm text-gray-600 min-w-[60px]">
                    {appointment.time}
                  </div>
                  <div>
                    <p className="text-sm">{appointment.service}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {appointment.customer} • {appointment.location}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.replace('-', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Projects</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('service-progress')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardDescription>Ongoing modification projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeProjects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm">{project.title}</p>
                    <p className="text-xs text-gray-500">{project.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{project.progress}%</p>
                    <p className="text-xs text-gray-500">Due {project.dueDate}</p>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('service-progress')}
            >
              <Play className="h-6 w-6" />
              <span>Start Timer</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('service-progress')}
            >
              <Clock className="h-6 w-6" />
              <span>Log Time</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('service-progress')}
            >
              <CheckCircle className="h-6 w-6" />
              <span>Update Status</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => onNavigate('appointments')}
            >
              <Calendar className="h-6 w-6" />
              <span>View Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Notices */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-900">Important Notices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-orange-800">
            <li>• Remember to log your time for all completed tasks</li>
            <li>• Office Remodel project deadline is approaching (Oct 15)</li>
            <li>• New safety protocols effective from next week</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
