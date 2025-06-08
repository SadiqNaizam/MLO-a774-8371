import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import AdvancedDateRangePicker from '@/components/AdvancedDateRangePicker';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { ChartContainer, ChartTooltip, ChartLegend, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { Filter, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';

const salesReportData = [
  { date: "2023-05-01", orders: 5, revenue: 550.00, status: "Completed" },
  { date: "2023-05-01", orders: 2, revenue: 120.50, status: "Processing" },
  { date: "2023-05-02", orders: 8, revenue: 980.75, status: "Completed" },
  { date: "2023-05-03", orders: 3, revenue: 300.00, status: "Shipped" },
  { date: "2023-05-04", orders: 6, revenue: 720.20, status: "Completed" },
];

const reportChartData = [
  { name: 'Week 1', sales: 4000, orders: 24 },
  { name: 'Week 2', sales: 3000, orders: 13 },
  { name: 'Week 3', sales: 2000, orders: 58 },
  { name: 'Week 4', sales: 2780, orders: 39 },
];

const reportChartConfig = {
  sales: { label: "Sales ($)", color: "hsl(var(--chart-1))" },
  orders: { label: "Orders", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;


const SalesReportsPage = () => {
  console.log('SalesReportsPage loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log("Selected date range:", newRange);
    // Add logic to refetch data based on dateRange
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64">
        <NavigationMenu />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>Analyze sales performance over selected periods.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
              <AdvancedDateRangePicker onDateChange={handleDateChange} maxDays={365} />
              <Select onValueChange={(value) => console.log("Filter by:", value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
              <Button variant="default" className="w-full sm:w-auto ml-auto">
                <Download className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
               <ChartContainer config={reportChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-sales)" tickFormatter={(value) => `$${value / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" />
                    <RechartsTooltip cursor={false} contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                    <RechartsLegend />
                    <Bar dataKey="sales" fill="var(--color-sales)" radius={4} yAxisId="left" />
                    <Bar dataKey="orders" fill="var(--color-orders)" radius={4} yAxisId="right" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Sales Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReportData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.orders}</TableCell>
                      <TableCell>${row.revenue.toFixed(2)}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SalesReportsPage;