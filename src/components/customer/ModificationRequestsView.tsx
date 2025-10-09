import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Calendar, Clock } from 'lucide-react';
import { ModificationRequestDialog } from './ModificationRequestDialog';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface ModificationRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  progress: number;
  createdAt: Date;
  estimatedCompletion?: Date;
  assignedTo?: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

interface ModificationRequestsViewProps {
  userId: string;
}

export function ModificationRequestsView({ userId }: ModificationRequestsViewProps) {
  const [requests, setRequests] = useState<ModificationRequest[]>([
    {
      id: '1',
      title: 'Kitchen Renovation',
      description: 'Replace countertops and install new cabinets',
      status: 'in-progress',
      progress: 45,
      createdAt: new Date('2025-09-15'),
      estimatedCompletion: new Date('2025-10-30'),
      assignedTo: 'Sarah Smith',
      timeline: [
        {
          id: '1',
          title: 'Initial Assessment',
          description: 'Site visit and measurements completed',
          date: new Date('2025-09-15'),
          completed: true,
        },
        {
          id: '2',
          title: 'Design Approval',
          description: 'Kitchen design approved by customer',
          date: new Date('2025-09-20'),
          completed: true,
        },
        {
          id: '3',
          title: 'Material Procurement',
          description: 'Ordering cabinets and countertops',
          date: new Date('2025-09-25'),
          completed: true,
        },
        {
          id: '4',
          title: 'Installation Phase',
          description: 'Installing new cabinets',
          date: new Date('2025-10-05'),
          completed: false,
        },
        {
          id: '5',
          title: 'Final Inspection',
          description: 'Quality check and customer approval',
          date: new Date('2025-10-30'),
          completed: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Bathroom Upgrade',
      description: 'Update fixtures and retile shower',
      status: 'pending',
      progress: 0,
      createdAt: new Date('2025-10-01'),
      timeline: [],
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateRequest = (data: any) => {
    const newRequest: ModificationRequest = {
      id: Date.now().toString(),
      ...data,
      status: 'pending' as const,
      progress: 0,
      createdAt: new Date(),
      timeline: [],
    };
    setRequests((prev) => [newRequest, ...prev]);
    setDialogOpen(false);
    toast.success('Modification request submitted successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Modification Requests</h2>
          <p className="text-gray-600 mt-1">Track your service modification projects</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{request.title}</CardTitle>
                  <CardDescription className="mt-2">{request.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created: {request.createdAt.toLocaleDateString()}
                  </span>
                </div>
                {request.estimatedCompletion && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      Due: {request.estimatedCompletion.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {request.assignedTo && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm text-blue-600">
                      {request.assignedTo.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">Assigned to {request.assignedTo}</span>
                </div>
              )}

              {request.status !== 'pending' && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span>{request.progress}%</span>
                  </div>
                  <Progress value={request.progress} className="h-2" />
                </div>
              )}

              {request.timeline.length > 0 && (
                <div>
                  <h4 className="text-sm mb-4">Project Timeline</h4>
                  <div className="space-y-4">
                    {request.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              event.completed
                                ? 'bg-green-500 border-green-500'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                          {index < request.timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-200 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.description}</p>
                            </div>
                            <span className="text-xs text-gray-400">
                              {event.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <ModificationRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateRequest}
      />
    </div>
  );
}
