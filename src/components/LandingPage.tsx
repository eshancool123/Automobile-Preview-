import React from 'react'; // Import React
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Calendar, 
  Clock, 
  Shield, 
  CheckCircle, 
  MessageSquare, 
  CreditCard,
  ArrowRight,
  Users,
  Wrench,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Schedule appointments in seconds with our intuitive booking system',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Track your service progress and get live updates from technicians',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Pay safely with encrypted transactions and multiple payment options',
    },
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Get instant help through our integrated chat support system',
    },
  ];

  const services = [
    {
      icon: '🧹',
      name: 'House Cleaning',
      description: 'Professional cleaning services for your home',
    },
    {
      icon: '❄️',
      name: 'HVAC Maintenance',
      description: 'Keep your heating and cooling systems running smoothly',
    },
    {
      icon: '🔧',
      name: 'Plumbing Repair',
      description: 'Expert plumbing solutions for all your needs',
    },
    {
      icon: '⚡',
      name: 'Electrical Work',
      description: 'Safe and certified electrical services',
    },
    {
      icon: '🌿',
      name: 'Landscaping',
      description: 'Beautiful outdoor spaces, professionally maintained',
    },
    {
      icon: '🛠️',
      name: 'General Repairs',
      description: 'All-around handyman services for your property',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up in seconds with just your email',
    },
    {
      number: '2',
      title: 'Book Service',
      description: 'Choose your service, date, and time slot',
    },
    {
      number: '3',
      title: 'Track Progress',
      description: 'Monitor your service in real-time',
    },
    {
      number: '4',
      title: 'Pay & Review',
      description: 'Secure payment and rate your experience',
    },
  ];

  const guidelines = [
    {
      icon: CheckCircle,
      title: 'Be Available',
      description: 'Ensure someone is present during the scheduled service time',
    },
    {
      icon: CheckCircle,
      title: 'Clear Access',
      description: 'Provide clear access to the service area and any necessary equipment',
    },
    {
      icon: CheckCircle,
      title: 'Communicate',
      description: 'Share any special requirements or concerns with your technician',
    },
    {
      icon: CheckCircle,
      title: 'Inspect Work',
      description: 'Review the completed work before the technician leaves',
    },
    {
      icon: CheckCircle,
      title: 'Provide Feedback',
      description: 'Rate your experience to help us improve our services',
    },
    {
      icon: CheckCircle,
      title: 'Payment',
      description: 'Complete payment promptly through our secure platform',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
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
              <h1 className="text-foreground">ServiceHub</h1>
            </div>
            <Button onClick={onGetStarted}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl mb-6">
              Professional Home Services,
              <span className="block text-primary mt-2">Simplified</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Book trusted technicians, track service progress in real-time, and manage everything from one convenient platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>500+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <span>50+ Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose ServiceHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience hassle-free service management with our comprehensive platform
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional services for all your home maintenance needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{service.icon}</div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in four simple steps
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center relative">
                <div className="h-16 w-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Guidelines */}
      <section className="bg-white py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Customer Guidelines</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple guidelines for the best service experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guideline) => {
              const Icon = guideline.icon;
              return (
                <div key={guideline.title} className="flex gap-4">
                  <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="mb-1">{guideline.title}</h4>
                    <p className="text-sm text-muted-foreground">{guideline.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-2 border-primary">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join hundreds of satisfied customers who trust ServiceHub for their home maintenance needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
                Sign In Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Free to sign up
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
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
              <span className="text-sm text-muted-foreground">
                © 2025 ServiceHub. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Contact Us</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
