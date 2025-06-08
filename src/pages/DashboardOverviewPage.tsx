import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import KPIWidget from '@/components/KPIWidget';
import DataSummaryCard from '@/components/DataSummaryCard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartLegend, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, ShoppingBag, Activity, TrendingUp } from 'lucide-react';

const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month", icon: DollarSign, trend: "up", trendValue: "+20.1%" },
  { title: "Active Users", value: "+2350", description: "+180.1% from last month", icon: Users, trend: "up", trendValue: "+180.1%" },
  { title: "Total Sales", value: "+12,234", description: "+19% from last month", icon: ShoppingBag, trend: "up", trendValue: "+19%" },
  { title: "New Signups", value: "573", description: "+201 since last hour", icon: Activity, trend: "neutral" },
];

const salesChartData = [
  { month: "Jan", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Feb", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Mar", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Apr", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "May", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Jun", sales: Math.floor(Math.random() * 5000) + 1000 },
];

const salesChartConfig = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const recentActivityItems = [
    { label: "New Order #12345", value: "$250.00" },
    { label: "Customer 'John Doe' signed up", value: "" },
    { label: "Product 'SuperWidget' stock low", value: "5 units left" },
];

const DashboardOverviewPage = () => {
  console.log('DashboardOverviewPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64"> {/* Adjusted for fixed Sidebar width */}
        <NavigationMenu />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {kpiData.map((kpi) => (
              <KPIWidget
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                description={kpi.description}
                icon={kpi.icon}
                trend={kpi.trend as "up" | "down" | "neutral"}
                trendValue={kpi.trendValue}
              />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance for the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                      <RechartsTooltip
                        cursor={false}
                        contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
                 <DataSummaryCard
                    title="Recent Activity"
                    description="Latest updates and notifications."
                    items={recentActivityItems}
                    icon={Activity}
                    actionText="View All Activity"
                    onActionClick={() => console.log('View all activity clicked')}
                />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;