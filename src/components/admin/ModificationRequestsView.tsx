import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  User, 
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ModificationRequest {
  id: string;
  customerId: string;
  customerName: string;
  appointmentId: string;
  serviceType: string;
  appointmentDate: string;
  title: string;
  description: string;
  requestType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  estimatedCost?: number;
  adminResponse?: string;
  respondedBy?: string;
  respondedAt?: string;
  createdAt: string;
}

export function ModificationRequestsView() {
  const [requests, setRequests] = useState<ModificationRequest[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'John Doe',
      appointmentId: 'apt-001',
      serviceType: 'Kitchen Renovation',
      appointmentDate: '2025-10-15',
      title: 'Add Cabinet Installation',
      description: 'Would like to add installation of upper cabinets to the current renovation project. Need 6 additional cabinets installed.',
      requestType: 'addition',
      priority: 'high',
      status: 'pending',
      estimatedCost: 450,
      createdAt: '2025-10-08T10:30:00',
    },
    {
      id: '2',
      customerId: '4',
      customerName: 'Jane Smith',
      appointmentId: 'apt-002',
      serviceType: 'House Cleaning',
      appointmentDate: '2025-10-12',
      title: 'Change Cleaning Scope',
      description: 'Need to exclude the basement from cleaning service and add deep cleaning for the kitchen instead.',
      requestType: 'change',
      priority: 'medium',
      status: 'pending',
      estimatedCost: 0,
      createdAt: '2025-10-07T14:20:00',
    },
    {
      id: '3',
      customerId: '1',
      customerName: 'John Doe',
      appointmentId: 'apt-003',
      serviceType: 'HVAC Maintenance',
      appointmentDate: '2025-10-05',
      title: 'Replace Old Filters',
      description: 'During inspection, found filters are very old. Requesting replacement with high-efficiency filters.',
      requestType: 'addition',
      priority: 'urgent',
      status: 'approved',
      estimatedCost: 120,
      adminResponse: 'Approved. Technician will bring high-efficiency filters. Additional cost added to invoice.',
      respondedBy: 'Admin User',
      respondedAt: '2025-10-07T15:45:00',
      createdAt: '2025-10-07T09:15:00',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<ModificationRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleReview = (request: ModificationRequest) => {
    setSelectedRequest(request);
    setResponseText(request.adminResponse || '');
    setEstimatedCost(request.estimatedCost?.toString() || '');
    setDialogOpen(true);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: 'approved',
              adminResponse: responseText,
              estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined,
              respondedBy: 'Admin User',
              respondedAt: new Date().toISOString(),
            }
          : req
      )
    );

    toast.success('Modification request approved');
    setDialogOpen(false);
    setSelectedRequest(null);
    setResponseText('');
    setEstimatedCost('');
  };

  const handleReject = () => {
    if (!selectedRequest) return;

    if (!responseText.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: 'rejected',
              adminResponse: responseText,
              respondedBy: 'Admin User',
              respondedAt: new Date().toISOString(),
            }
          : req
      )
    );

    toast.success('Modification request rejected');
    setDialogOpen(false);
    setSelectedRequest(null);
    setResponseText('');
    setEstimatedCost('');
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { className: 'bg-red-100 text-red-800 hover:bg-red-100', text: 'Urgent' };
      case 'high':
        return { className: 'bg-orange-100 text-orange-800 hover:bg-orange-100', text: 'High' };
      case 'medium':
        return { className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', text: 'Medium' };
      case 'low':
        return { className: 'bg-blue-100 text-blue-800 hover:bg-blue-100', text: 'Low' };
      default:
        return { className: '', text: priority };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', 
          text: 'Pending Review',
          icon: Clock 
        };
      case 'approved':
        return { 
          className: 'bg-green-100 text-green-800 hover:bg-green-100', 
          text: 'Approved',
          icon: CheckCircle 
        };
      case 'rejected':
        return { 
          className: 'bg-red-100 text-red-800 hover:bg-red-100', 
          text: 'Rejected',
          icon: XCircle 
        };
      case 'in-progress':
        return { 
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100', 
          text: 'In Progress',
          icon: AlertCircle 
        };
      case 'completed':
        return { 
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-100', 
          text: 'Completed',
          icon: CheckCircle 
        };
      default:
        return { className: '', text: status, icon: Clock };
    }
  };

  const filteredRequests = requests.filter(req => 
    filterStatus === 'all' || req.status === filterStatus
  );

  const stats = [
    {
      title: 'Pending Review',
      value: requests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Approved',
      value: requests.filter(r => r.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Rejected',
      value: requests.filter(r => r.status === 'rejected').length,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Requests',
      value: requests.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Modification Requests</h2>
        <p className="text-muted-foreground mt-1">Review and manage customer modification requests</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
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

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Label>Filter by Status:</Label>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => {
          const statusConfig = getStatusConfig(request.status);
          const priorityConfig = getPriorityConfig(request.priority);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{request.title}</CardTitle>
                      <Badge className={priorityConfig.className}>
                        {priorityConfig.text}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {request.customerName}
                      <span className="mx-1">•</span>
                      <Calendar className="h-4 w-4" />
                      {new Date(request.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary" className={statusConfig.className}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.text}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Service Details</p>
                  <p className="text-sm">
                    <span className="font-medium">{request.serviceType}</span>
                    {' • '}
                    <span>Scheduled: {new Date(request.appointmentDate).toLocaleDateString()}</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Request Description</p>
                  <p className="text-sm">{request.description}</p>
                </div>

                {request.estimatedCost !== undefined && request.estimatedCost > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Estimated Cost: ${request.estimatedCost.toFixed(2)}</span>
                  </div>
                )}

                {request.adminResponse && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Admin Response</p>
                    <p className="text-sm">{request.adminResponse}</p>
                    {request.respondedBy && (
                      <p className="text-xs text-muted-foreground mt-2">
                        By {request.respondedBy} • {new Date(request.respondedAt!).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleReview(request)}>
                      Review Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No modification requests found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Modification Request</DialogTitle>
            <DialogDescription>
              Approve or reject the customer's modification request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4>{selectedRequest.title}</h4>
                  <Badge className={getPriorityConfig(selectedRequest.priority).className}>
                    {getPriorityConfig(selectedRequest.priority).text}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                <div className="text-sm">
                  <span className="font-medium">Customer:</span> {selectedRequest.customerName}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Service:</span> {selectedRequest.serviceType}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Estimated Additional Cost (optional)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">Admin Response *</Label>
                <Textarea
                  id="response"
                  placeholder="Provide details about your decision..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
