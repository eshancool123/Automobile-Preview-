import React from 'react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const services = [
  { id: '1', name: 'House Cleaning', duration: '2 hours', price: '$100' },
  { id: '2', name: 'HVAC Maintenance', duration: '1 hour', price: '$150' },
  { id: '3', name: 'Plumbing Repair', duration: '1.5 hours', price: '$120' },
  { id: '4', name: 'Electrical Work', duration: '2 hours', price: '$180' },
  { id: '5', name: 'Landscaping', duration: '3 hours', price: '$200' },
];

const timeSlots = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export function BookAppointmentDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: BookAppointmentDialogProps) {
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setServiceType(initialData.serviceType);
      setDate(new Date(initialData.date));
      setTime(initialData.time);
      setLocation(initialData.location);
    } else {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      setServiceType('');
      setDate(tomorrow);
      setTime('');
      setLocation('123 Main St, Apt 4B');
    }
    setErrors({});
  }, [initialData, open]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateLong = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!serviceType) {
      newErrors.service = true;
      toast.error('Please select a service type');
    }
    if (!date) {
      newErrors.date = true;
      toast.error('Please select a date');
    }
    if (!time) {
      newErrors.time = true;
      toast.error('Please select a time slot');
    }
    if (!location || location.trim() === '') {
      newErrors.location = true;
      toast.error('Please enter a service location');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      serviceType,
      date: formatDate(date!),
      time,
      location,
    });

    // Reset form with default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    setServiceType('');
    setDate(tomorrow);
    setTime('');
    setLocation('123 Main St, Apt 4B');
    setErrors({});
  };

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (checkDate: Date) => {
    const compareDate = new Date(checkDate);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Reschedule Appointment' : 'Book New Appointment'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update your appointment details'
              : 'Schedule a new service appointment'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service" className="flex items-center gap-1">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select value={serviceType} onValueChange={(value) => {
              setServiceType(value);
              setErrors({ ...errors, service: false });
            }}>
              <SelectTrigger 
                id="service"
                className={errors.service ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.name}>
                    {service.name} - {service.duration} ({service.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Date <span className="text-red-500">*</span>
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left ${errors.date ? 'border-red-500' : ''}`}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDateLong(date) : <span className="text-gray-500">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setErrors({ ...errors, date: false });
                    setCalendarOpen(false);
                  }}
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-1">
              Time <span className="text-red-500">*</span>
            </Label>
            <Select value={time} onValueChange={(value) => {
              setTime(value);
              setErrors({ ...errors, time: false });
            }}>
              <SelectTrigger 
                id="time"
                className={errors.time ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              placeholder="Enter service address"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setErrors({ ...errors, location: false });
              }}
              className={errors.location ? 'border-red-500' : ''}
            />
          </div>

          {date && time && serviceType && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900">
                    <span>Appointment Summary:</span>
                  </p>
                  <p className="text-blue-700 mt-1">
                    {serviceType} on {formatDateLong(date)} at {time}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => {
              onOpenChange(false);
              setErrors({});
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Appointment' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
