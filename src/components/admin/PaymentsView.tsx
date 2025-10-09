import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  DollarSign, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Search,
  Filter,
  Calendar,
  User
} from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner@2.0.3';

interface Payment {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentDate?: string;
  dueDate?: string;
  createdAt: string;
}

export function PaymentsView() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'pay-001',
      appointmentId: 'apt-001',
      customerId: '1',
      customerName: 'John Doe',
      serviceType: 'Kitchen Renovation',
      amount: 1250.00,
      paymentMethod: 'credit_card',
      status: 'completed',
      transactionId: 'txn_1a2b3c4d5e6f',
      paymentDate: '2025-10-08T14:30:00',
      createdAt: '2025-10-08T14:30:00',
    },
    {
      id: 'pay-002',
      appointmentId: 'apt-002',
      customerId: '4',
      customerName: 'Jane Smith',
      serviceType: 'House Cleaning',
      amount: 120.00,
      paymentMethod: 'debit_card',
      status: 'completed',
      transactionId: 'txn_9z8y7x6w5v4u',
      paymentDate: '2025-10-07T10:15:00',
      createdAt: '2025-10-07T10:15:00',
    },
    {
      id: 'pay-003',
      appointmentId: 'apt-003',
      customerId: '1',
      customerName: 'John Doe',
      serviceType: 'HVAC Maintenance',
      amount: 150.00,
      paymentMethod: 'credit_card',
      status: 'pending',
      dueDate: '2025-10-15',
      createdAt: '2025-10-05T09:00:00',
    },
    {
      id: 'pay-004',
      appointmentId: 'apt-004',
      customerId: '4',
      customerName: 'Jane Smith',
      serviceType: 'Plumbing Repair',
      amount: 200.00,
      paymentMethod: 'paypal',
      status: 'failed',
      transactionId: 'txn_failed_123',
      createdAt: '2025-10-06T16:45:00',
    },
    {
      id: 'pay-005',
      appointmentId: 'apt-005',
      customerId: '1',
      customerName: 'John Doe',
      serviceType: 'Electrical Work',
      amount: 180.00,
      paymentMethod: 'bank_transfer',
      status: 'completed',
      transactionId: 'txn_bank_567',
      paymentDate: '2025-10-04T11:20:00',
      createdAt: '2025-10-04T11:20:00',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          className: 'bg-green-100 text-green-800 hover:bg-green-100', 
          text: 'Completed',
          icon: CheckCircle 
        };
      case 'pending':
        return { 
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100', 
          text: 'Pending',
          icon: Clock 
        };
      case 'failed':
        return { 
          className: 'bg-red-100 text-red-800 hover:bg-red-100', 
          text: 'Failed',
          icon: XCircle 
        };
      case 'refunded':
        return { 
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-100', 
          text: 'Refunded',
          icon: DollarSign 
        };
      default:
        return { className: '', text: status, icon: Clock };
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return method;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Payments',
      value: `$${pendingAmount.toFixed(2)}`,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed',
      value: payments.filter(p => p.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Failed',
      value: payments.filter(p => p.status === 'failed').length,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const handleExport = () => {
    toast.success('Payment report exported successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Payments</h2>
          <p className="text-muted-foreground mt-1">View and manage all payment transactions</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by customer, service, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger id="method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            {filteredPayments.length} {filteredPayments.length === 1 ? 'transaction' : 'transactions'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => {
                  const statusConfig = getStatusConfig(payment.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {payment.customerName}
                        </div>
                      </TableCell>
                      <TableCell>{payment.serviceType}</TableCell>
                      <TableCell className="font-medium">
                        ${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          {getPaymentMethodLabel(payment.paymentMethod)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusConfig.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.text}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {payment.paymentDate 
                            ? new Date(payment.paymentDate).toLocaleDateString()
                            : payment.dueDate
                            ? `Due: ${new Date(payment.dueDate).toLocaleDateString()}`
                            : new Date(payment.createdAt).toLocaleDateString()
                          }
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {payment.transactionId || '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="py-12 text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
