import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import { PaymentDialog } from './PaymentDialog';
import { toast } from 'sonner@2.0.3';

interface Payment {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: Date;
  dueDate?: Date;
  paymentMethod?: string;
}

interface PaymentsViewProps {
  userId: string;
}

export function PaymentsView({ userId }: PaymentsViewProps) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      description: 'House Cleaning Service',
      amount: 100,
      status: 'paid',
      date: new Date('2025-09-28'),
      paymentMethod: 'Credit Card ****1234',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      description: 'HVAC Maintenance',
      amount: 150,
      status: 'pending',
      date: new Date('2025-10-03'),
      dueDate: new Date('2025-10-10'),
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025-003',
      description: 'Plumbing Repair',
      amount: 120,
      status: 'paid',
      date: new Date('2025-09-15'),
      paymentMethod: 'Credit Card ****5678',
    },
  ]);

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleMakePayment = (paymentData: any) => {
    if (!selectedPayment) return;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selectedPayment.id
          ? {
              ...p,
              status: 'paid' as const,
              paymentMethod: `Credit Card ****${paymentData.cardNumber.slice(-4)}`,
              date: new Date(),
            }
          : p
      )
    );
    setPaymentDialogOpen(false);
    setSelectedPayment(null);
    toast.success('Payment processed successfully');
  };

  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment);
    setPaymentDialogOpen(true);
  };

  const handleDownloadInvoice = (payment: Payment) => {
    toast.success(`Downloading invoice ${payment.invoiceNumber}`);
    // In a real app, this would generate and download a PDF
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Payments & Billing</h2>
        <p className="text-gray-600 mt-1">Manage your payments and invoices</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Due soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <CardTitle className="text-lg">{payment.invoiceNumber}</CardTitle>
                    <CardDescription className="mt-1">
                      {payment.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl">${payment.amount.toFixed(2)}</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="text-gray-500">Date:</span>{' '}
                  {payment.date.toLocaleDateString()}
                </div>
                {payment.dueDate && (
                  <div>
                    <span className="text-gray-500">Due Date:</span>{' '}
                    {payment.dueDate.toLocaleDateString()}
                  </div>
                )}
                {payment.paymentMethod && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">Payment Method:</span>{' '}
                    {payment.paymentMethod}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                {payment.status === 'pending' && (
                  <Button onClick={() => handlePayNow(payment)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleDownloadInvoice(payment)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onSubmit={handleMakePayment}
        amount={selectedPayment?.amount || 0}
        invoiceNumber={selectedPayment?.invoiceNumber || ''}
      />
    </div>
  );
}
