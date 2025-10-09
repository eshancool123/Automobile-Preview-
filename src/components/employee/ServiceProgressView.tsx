import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Clock, Play, Pause, CheckCircle } from 'lucide-react';
import { TimeLogDialog } from './TimeLogDialog';
import { UpdateStatusDialog } from './UpdateStatusDialog';
import { toast } from 'sonner@2.0.3';

interface WorkItem {
  id: string;
  type: 'appointment' | 'project';
  title: string;
  customer: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  estimatedHours: number;
  loggedHours: number;
  isTimerRunning: boolean;
  timerStartTime?: Date;
}

interface ServiceProgressViewProps {
  employeeId: string;
}

export function ServiceProgressView({ employeeId }: ServiceProgressViewProps) {
  const [workItems, setWorkItems] = useState<WorkItem[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'HVAC Maintenance - 123 Main St',
      customer: 'John Doe',
      status: 'in-progress',
      progress: 65,
      estimatedHours: 1,
      loggedHours: 0.65,
      isTimerRunning: true,
      timerStartTime: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: '2',
      type: 'project',
      title: 'Kitchen Renovation - Installation Phase',
      customer: 'Jane Smith',
      status: 'in-progress',
      progress: 45,
      estimatedHours: 8,
      loggedHours: 3.5,
      isTimerRunning: false,
    },
    {
      id: '3',
      type: 'appointment',
      title: 'House Cleaning - 456 Oak Ave',
      customer: 'Bob Wilson',
      status: 'pending',
      progress: 0,
      estimatedHours: 2,
      loggedHours: 0,
      isTimerRunning: false,
    },
  ]);

  const [timeLogDialogOpen, setTimeLogDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  const toggleTimer = (id: string) => {
    setWorkItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isRunning = !item.isTimerRunning;
          toast.success(isRunning ? 'Timer started' : 'Timer paused');
          return {
            ...item,
            isTimerRunning: isRunning,
            timerStartTime: isRunning ? new Date() : undefined,
            status: isRunning ? ('in-progress' as const) : item.status,
          };
        }
        return item;
      })
    );
  };

  const handleLogTime = (hours: number) => {
    if (!selectedItem) return;

    setWorkItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              loggedHours: item.loggedHours + hours,
              progress: Math.min(
                100,
                ((item.loggedHours + hours) / item.estimatedHours) * 100
              ),
            }
          : item
      )
    );
    setTimeLogDialogOpen(false);
    setSelectedItem(null);
    toast.success('Time logged successfully');
  };

  const handleUpdateStatus = (status: string, progress: number, notes: string) => {
    if (!selectedItem) return;

    setWorkItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status: status as 'pending' | 'in-progress' | 'completed',
              progress,
            }
          : item
      )
    );
    setStatusDialogOpen(false);
    setSelectedItem(null);
    toast.success('Status updated successfully');
  };

  const openTimeLog = (item: WorkItem) => {
    setSelectedItem(item);
    setTimeLogDialogOpen(true);
  };

  const openStatusUpdate = (item: WorkItem) => {
    setSelectedItem(item);
    setStatusDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Service Progress</h2>
        <p className="text-gray-600 mt-1">Track time and update work status</p>
      </div>

      <div className="grid gap-4">
        {workItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    Customer: {item.customer}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {item.loggedHours.toFixed(2)}h / {item.estimatedHours}h
                  </span>
                </div>
                {item.isTimerRunning && item.timerStartTime && (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Timer running</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant={item.isTimerRunning ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => toggleTimer(item.id)}
                >
                  {item.isTimerRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Timer
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Timer
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => openTimeLog(item)}>
                  <Clock className="h-4 w-4 mr-2" />
                  Log Time
                </Button>
                <Button variant="outline" size="sm" onClick={() => openStatusUpdate(item)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TimeLogDialog
        open={timeLogDialogOpen}
        onOpenChange={setTimeLogDialogOpen}
        onSubmit={handleLogTime}
        workItem={selectedItem}
      />

      <UpdateStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onSubmit={handleUpdateStatus}
        workItem={selectedItem}
      />
    </div>
  );
}
