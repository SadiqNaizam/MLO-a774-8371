import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, BarChart3, ShoppingBag, Users, Settings, HelpCircle } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/sales', label: 'Sales Reports', icon: BarChart3 },
  { href: '/dashboard/products', label: 'Products', icon: ShoppingBag },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
];

const secondaryNavItems: NavItem[] = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/support', label: 'Support', icon: HelpCircle, disabled: true },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  const renderNavList = (items: NavItem[], title?: string) => (
    <div className="space-y-1">
      {title && <h3 className="px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">{title}</h3>}
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={cn(
            'group flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
            item.disabled ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground',
            location.pathname.startsWith(item.href) && !item.disabled
              ? 'bg-accent text-accent-foreground font-semibold'
              : 'text-muted-foreground'
          )}
          onClick={(e) => item.disabled && e.preventDefault()}
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <aside className={cn("hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 md:w-64 bg-card border-r print:hidden", className)}>
      <ScrollArea className="flex-1 py-6">
        <div className="px-4 mb-4">
          <Link to="/dashboard" className="flex items-center">
            {/* Placeholder for logo or App Name */}
            <span className="text-2xl font-bold text-primary">MyApp</span>
          </Link>
        </div>
        <nav className="space-y-6">
          {renderNavList(mainNavItems, "Main")}
          {renderNavList(secondaryNavItems, "Support")}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;