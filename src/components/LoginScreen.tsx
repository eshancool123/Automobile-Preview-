import React from 'react';
import { useState } from 'react';
import { User, UserRole } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onBack?: () => void;
}

// Mock user database
const MOCK_USERS = {
  // Customers
  'john@example.com': {
    password: 'customer123',
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer' as UserRole,
    },
  },
  'jane@example.com': {
    password: 'customer123',
    user: {
      id: '4',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer' as UserRole,
    },
  },
  // Employees
  'sarah@example.com': {
    password: 'employee123',
    user: {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'employee' as UserRole,
    },
  },
  'mike@example.com': {
    password: 'employee123',
    user: {
      id: '5',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'employee' as UserRole,
    },
  },
  // Admins
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as UserRole,
    },
  },
};

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userRecord = MOCK_USERS[email as keyof typeof MOCK_USERS];

    if (!userRecord) {
      setError('Invalid email or password');
      setIsLoading(false);
      return;
    }

    if (userRecord.password !== password) {
      setError('Invalid email or password');
      setIsLoading(false);
      return;
    }

    // Store session in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userRecord.user));
    
    onLogin(userRecord.user);
    setIsLoading(false);
  };

  const handleQuickLogin = (role: UserRole) => {
    const mockUsers: Record<string, User> = {
      customer: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'customer',
      },
      employee: {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        role: 'employee',
      },
      admin: {
        id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      },
    };

    if (role) {
      const user = mockUsers[role];
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {onBack && (
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <CardTitle>ServiceHub</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="quick">Quick Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => alert('Password reset feature - In production, this would send a reset email')}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  className="w-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground">Customer:</span> john@example.com / customer123
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Employee:</span> sarah@example.com / employee123
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Admin:</span> admin@example.com / admin123
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="quick" className="space-y-3 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Quick access for testing different user roles
              </p>
              <Button
                className="w-full justify-start h-auto py-4"
                variant="outline"
                onClick={() => handleQuickLogin('customer')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Login as Customer</div>
                    <div className="text-xs text-muted-foreground">View appointments, payments & chat</div>
                  </div>
                </div>
              </Button>
              <Button
                className="w-full justify-start h-auto py-4"
                variant="outline"
                onClick={() => handleQuickLogin('employee')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Login as Employee</div>
                    <div className="text-xs text-muted-foreground">Manage work & track time</div>
                  </div>
                </div>
              </Button>
              <Button
                className="w-full justify-start h-auto py-4"
                variant="outline"
                onClick={() => handleQuickLogin('admin')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Login as Admin</div>
                    <div className="text-xs text-muted-foreground">Manage users, services & analytics</div>
                  </div>
                </div>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
