import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { cn } from '@/lib/utils';
import { LayoutDashboard, BarChart3, ShoppingBag, Users, Settings } from 'lucide-react'; // Example icons

// Define navigation items
const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/sales', label: 'Sales Reports', icon: BarChart3 },
  { href: '/dashboard/products', label: 'Products', icon: ShoppingBag },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

  return (
    <nav className="bg-background border-b print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 font-bold text-xl text-primary">
              AdminPanel
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button - can be implemented with a Sheet component */}
            {/* <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;