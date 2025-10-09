import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Users, Calendar, Download } from 'lucide-react';
import { Button } from '../ui/button';

export function AnalyticsView() {
  const revenueData = [
    { month: 'Jan', revenue: 12500, appointments: 45 },
    { month: 'Feb', revenue: 15200, appointments: 52 },
    { month: 'Mar', revenue: 18900, appointments: 61 },
    { month: 'Apr', revenue: 16700, appointments: 58 },
    { month: 'May', revenue: 21300, appointments: 68 },
    { month: 'Jun', revenue: 24100, appointments: 75 },
    { month: 'Jul', revenue: 22800, appointments: 71 },
    { month: 'Aug', revenue: 26500, appointments: 82 },
    { month: 'Sep', revenue: 28200, appointments: 89 },
    { month: 'Oct', revenue: 15400, appointments: 48 },
  ];

  const serviceData = [
    { name: 'House Cleaning', value: 35, count: 142 },
    { name: 'HVAC Maintenance', value: 25, count: 98 },
    { name: 'Plumbing Repair', value: 20, count: 81 },
    { name: 'Electrical Work', value: 12, count: 47 },
    { name: 'Landscaping', value: 8, count: 31 },
  ];

  const employeePerformance = [
    { name: 'Sarah Smith', completed: 45, revenue: 6750, rating: 4.9 },
    { name: 'Mike Johnson', completed: 38, revenue: 5700, rating: 4.7 },
    { name: 'Tom Wilson', completed: 42, revenue: 6300, rating: 4.8 },
    { name: 'Lisa Brown', completed: 35, revenue: 5250, rating: 4.6 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalAppointments = revenueData.reduce((sum, item) => sum + item.appointments, 0);
  const avgRevenue = totalRevenue / revenueData.length;
  const currentMonthRevenue = revenueData[revenueData.length - 1].revenue;
  const previousMonthRevenue = revenueData[revenueData.length - 2].revenue;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Analytics & Reports</h2>
          <p className="text-gray-600 mt-1">
            Track performance and generate insights
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${(totalRevenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-gray-500 mt-1">Year to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalAppointments}</div>
            <p className="text-xs text-gray-500 mt-1">Total bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${(avgRevenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-gray-500 mt-1">Per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">+{revenueGrowth.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">Month over month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Appointments</TabsTrigger>
          <TabsTrigger value="services">Service Distribution</TabsTrigger>
          <TabsTrigger value="performance">Employee Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and appointment volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="appointments"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Appointments"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Comparison</CardTitle>
              <CardDescription>Revenue by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Percentage by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Volume</CardTitle>
                <CardDescription>Number of appointments by service</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Appointments" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance</CardTitle>
              <CardDescription>Completed appointments and revenue generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeePerformance.map((employee) => (
                  <div key={employee.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div>{employee.name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.completed} appointments • ${employee.revenue.toLocaleString()}{' '}
                          revenue • ⭐ {employee.rating}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(employee.completed / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Employee</CardTitle>
              <CardDescription>Revenue contribution comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employeePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed Jobs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
