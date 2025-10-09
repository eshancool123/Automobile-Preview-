import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Edit2, Trash2, DollarSign, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ServiceDialog } from './ServiceDialog';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
}

interface ModificationProject {
  id: string;
  title: string;
  customer: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  progress: number;
  assignedTo?: string;
  estimatedValue: number;
  startDate: Date;
  dueDate?: Date;
}

export function ServiceManagementView() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'House Cleaning',
      description: 'Professional home cleaning service',
      price: 100,
      duration: '2 hours',
      category: 'Cleaning',
      active: true,
    },
    {
      id: '2',
      name: 'HVAC Maintenance',
      description: 'Regular HVAC system maintenance and inspection',
      price: 150,
      duration: '1 hour',
      category: 'Maintenance',
      active: true,
    },
    {
      id: '3',
      name: 'Plumbing Repair',
      description: 'General plumbing repairs and fixes',
      price: 120,
      duration: '1.5 hours',
      category: 'Repair',
      active: true,
    },
    {
      id: '4',
      name: 'Electrical Work',
      description: 'Licensed electrical services',
      price: 180,
      duration: '2 hours',
      category: 'Electrical',
      active: true,
    },
    {
      id: '5',
      name: 'Landscaping',
      description: 'Garden and lawn maintenance',
      price: 200,
      duration: '3 hours',
      category: 'Outdoor',
      active: false,
    },
  ]);

  const [projects, setProjects] = useState<ModificationProject[]>([
    {
      id: '1',
      title: 'Kitchen Renovation',
      customer: 'Jane Smith',
      status: 'in-progress',
      progress: 45,
      assignedTo: 'Sarah Smith',
      estimatedValue: 15000,
      startDate: new Date('2025-09-15'),
      dueDate: new Date('2025-10-30'),
    },
    {
      id: '2',
      title: 'Bathroom Upgrade',
      customer: 'John Doe',
      status: 'pending',
      progress: 0,
      estimatedValue: 8000,
      startDate: new Date('2025-10-01'),
    },
    {
      id: '3',
      title: 'Office Remodel',
      customer: 'Bob Wilson',
      status: 'in-progress',
      progress: 75,
      assignedTo: 'Mike Johnson',
      estimatedValue: 12000,
      startDate: new Date('2025-09-01'),
      dueDate: new Date('2025-10-15'),
    },
  ]);

  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleCreateService = (data: any) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingService.id ? { ...service, ...data } : service
        )
      );
      toast.success('Service updated successfully');
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...data,
      };
      setServices((prev) => [newService, ...prev]);
      toast.success('Service created successfully');
    }
    setServiceDialogOpen(false);
    setEditingService(null);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    toast.success('Service deleted successfully');
  };

  const handleToggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
    toast.success('Service status updated');
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
      <div>
        <h2 className="text-2xl">Service & Analytics Management</h2>
        <p className="text-gray-600 mt-1">
          Manage services, pricing, and monitor projects
        </p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList>
          <TabsTrigger value="services">Service Catalog</TabsTrigger>
          <TabsTrigger value="projects">Modification Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg">Service Catalog</h3>
              <p className="text-sm text-gray-600">Manage available services and pricing</p>
            </div>
            <Button onClick={() => setServiceDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{services.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  {services.filter((s) => s.active).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Avg. Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  $
                  {Math.round(
                    services.reduce((sum, s) => sum + s.price, 0) / services.length
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div>{service.name}</div>
                          <div className="text-sm text-gray-500">
                            {service.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {service.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          {service.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={service.active ? 'bg-green-500' : 'bg-gray-500'}
                          onClick={() => handleToggleActive(service.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {service.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditService(service)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div>
            <h3 className="text-lg">Modification Projects</h3>
            <p className="text-sm text-gray-600">Monitor ongoing modification projects</p>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{projects.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  {projects.filter((p) => p.status === 'in-progress').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  {projects.filter((p) => p.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  $
                  {(
                    projects.reduce((sum, p) => sum + p.estimatedValue, 0) / 1000
                  ).toFixed(0)}
                  k
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Customer: {project.customer}
                        {project.assignedTo && ` • Assigned to: ${project.assignedTo}`}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Estimated Value:</span>{' '}
                      <span>${project.estimatedValue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Start Date:</span>{' '}
                      <span>{project.startDate.toLocaleDateString()}</span>
                    </div>
                    {project.dueDate && (
                      <div>
                        <span className="text-gray-500">Due Date:</span>{' '}
                        <span>{project.dueDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {project.status !== 'pending' && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ServiceDialog
        open={serviceDialogOpen}
        onOpenChange={(open) => {
          setServiceDialogOpen(open);
          if (!open) setEditingService(null);
        }}
        onSubmit={handleCreateService}
        initialData={editingService}
      />
    </div>
  );
}
