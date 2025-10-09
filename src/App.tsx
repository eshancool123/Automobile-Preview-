import { useState, useEffect } from 'react';
import { CustomerDashboard } from './components/CustomerDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginScreen } from './components/LoginScreen';
import { LandingPage } from './components/LandingPage';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'customer' | 'employee' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Clear any other app data if needed
    localStorage.removeItem('appointmentsData');
    localStorage.removeItem('modificationsData');
    localStorage.removeItem('paymentsData');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (!showLogin) {
      return (
        <>
          <LandingPage onGetStarted={() => setShowLogin(true)} />
          <Toaster />
        </>
      );
    }
    return (
      <>
        <LoginScreen onLogin={handleLogin} onBack={() => setShowLogin(false)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentUser.role === 'customer' && (
        <CustomerDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'employee' && (
        <EmployeeDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'admin' && (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
