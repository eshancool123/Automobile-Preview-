import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Appointment {
  id: string;
  type: 'appointment' | 'modification';
  serviceType: string;
  customer: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: string;
}

interface EmployeeAppointmentsViewProps {
  employeeId: string;
}

export function EmployeeAppointmentsView({ employeeId }: EmployeeAppointmentsViewProps) {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'appointment',
      serviceType: 'HVAC Maintenance',
      customer: 'John Doe',
      date: '2025-10-03',
      time: '2:00 PM',
      location: '123 Main St, Apt 4B',
      status: 'in-progress',
      priority: 'high',
      estimatedDuration: '1 hour',
    },
    {
      id: '2',
      type: 'appointment',
      serviceType: 'House Cleaning',
      customer: 'Bob Wilson',
      date: '2025-10-05',
      time: '10:00 AM',
      location: '456 Oak Ave',
      status: 'upcoming',
      priority: 'medium',
      estimatedDuration: '2 hours',
    },
    {
      id: '3',
      type: 'modification',
      serviceType: 'Kitchen Renovation - Installation',
      customer: 'Jane Smith',
      date: '2025-10-04',
      time: '9:00 AM',
      location: '789 Elm St',
      status: 'upcoming',
      priority: 'high',
      estimatedDuration: '8 hours',
    },
    {
      id: '4',
      type: 'appointment',
      serviceType: 'Plumbing Repair',
      customer: 'Alice Johnson',
      date: '2025-10-06',
      time: '1:00 PM',
      location: '321 Pine Rd',
      status: 'upcoming',
      priority: 'low',
      estimatedDuration: '1.5 hours',
    },
  ]);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'upcoming'
  );
  const inProgressAppointments = appointments.filter(
    (apt) => apt.status === 'in-progress'
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === 'completed'
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderAppointmentCard = (appointment: Appointment) => (
    <Card key={appointment.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{appointment.serviceType}</CardTitle>
              <Badge variant="outline" className="capitalize">
                {appointment.type}
              </Badge>
            </div>
            <CardDescription>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {appointment.customer}
              </div>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status.replace('-', ' ')}
            </Badge>
            <Badge className={getPriorityColor(appointment.priority)}>
              {appointment.priority} priority
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(appointment.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span>
            {appointment.time} ({appointment.estimatedDuration})
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
          <MapPin className="h-4 w-4" />
          <span>{appointment.location}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Appointments & Requests</h2>
        <p className="text-gray-600 mt-1">Manage your workload and schedule</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{inProgressAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{completedAppointments.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {appointments.map(renderAppointmentCard)}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming appointments
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4 mt-6">
          {inProgressAppointments.length > 0 ? (
            inProgressAppointments.map(renderAppointmentCard)
          ) : (
            <div className="text-center py-8 text-gray-500">
              No appointments in progress
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
