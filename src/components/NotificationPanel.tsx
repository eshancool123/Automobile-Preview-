import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Calendar, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'modification' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationPanelProps {
  onClose: () => void;
  userId: string;
}

export function NotificationPanel({ onClose, userId }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate WebSocket connection for real-time notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'Your appointment is scheduled for tomorrow at 10:00 AM',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment Received',
        message: 'Your payment of $150.00 has been processed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
      },
      {
        id: '3',
        type: 'modification',
        title: 'Modification Request Updated',
        message: 'Your request #1234 is now in progress',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true,
      },
    ];
    setNotifications(mockNotifications);

    // Simulate real-time update
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'alert',
        title: 'New Update',
        message: 'System notification received',
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }, 30000); // Add notification every 30 seconds

    return () => clearInterval(interval);
  }, [userId]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'modification':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card className="absolute right-0 top-12 w-96 max-h-[600px] shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Notifications</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-y-auto max-h-[500px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
