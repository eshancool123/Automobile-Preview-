import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, User } from 'lucide-react';
import { BookAppointmentDialog } from './BookAppointmentDialog';
import { toast } from 'sonner@2.0.3';
import { Progress } from '../ui/progress';

interface Appointment {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  employee: string;
  progress?: number;
}

interface AppointmentsViewProps {
  userId: string;
}

export function AppointmentsView({ userId }: AppointmentsViewProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      serviceType: 'House Cleaning',
      date: '2025-10-05',
      time: '10:00 AM',
      location: '123 Main St, Apt 4B',
      status: 'upcoming',
      employee: 'Sarah Smith',
    },
    {
      id: '2',
      serviceType: 'HVAC Maintenance',
      date: '2025-10-03',
      time: '2:00 PM',
      location: '123 Main St, Apt 4B',
      status: 'in-progress',
      employee: 'Mike Johnson',
      progress: 65,
    },
    {
      id: '3',
      serviceType: 'Plumbing Repair',
      date: '2025-09-28',
      time: '11:00 AM',
      location: '123 Main St, Apt 4B',
      status: 'completed',
      employee: 'Tom Wilson',
      progress: 100,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const handleBookAppointment = (data: any) => {
    if (editingAppointment) {
      // Reschedule existing appointment
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? { ...apt, ...data, status: 'upcoming' as const }
            : apt
        )
      );
      toast.success('Appointment rescheduled successfully');
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...data,
        status: 'upcoming' as const,
        employee: 'To be assigned',
      };
      setAppointments((prev) => [newAppointment, ...prev]);
      toast.success('Appointment booked successfully');
    }
    setDialogOpen(false);
    setEditingAppointment(null);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
    toast.success('Appointment cancelled');
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDialogOpen(true);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'upcoming':
        return {
          variant: 'secondary' as const,
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
          text: 'Upcoming',
        };
      case 'in-progress':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
          text: 'In Progress',
        };
      case 'completed':
        return {
          variant: 'secondary' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-100',
          text: 'Completed',
        };
      case 'cancelled':
        return {
          variant: 'secondary' as const,
          className: 'bg-red-100 text-red-800 hover:bg-red-100',
          text: 'Cancelled',
        };
      default:
        return {
          variant: 'secondary' as const,
          className: '',
          text: status,
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>My Appointments</h2>
          <p className="text-muted-foreground mt-1">Manage your service appointments</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const statusConfig = getStatusConfig(appointment.status);

          return (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{appointment.serviceType}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </div>
                  <Badge variant={statusConfig.variant} className={statusConfig.className}>
                    {statusConfig.text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{appointment.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Technician</p>
                    <p>{appointment.employee}</p>
                  </div>
                </div>

                {appointment.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{appointment.progress}%</span>
                    </div>
                    <Progress value={appointment.progress} />
                  </div>
                )}

                {appointment.status === 'upcoming' && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAppointment(appointment)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BookAppointmentDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingAppointment(null);
        }}
        onSubmit={handleBookAppointment}
        initialData={editingAppointment}
      />
    </div>
  );
}
