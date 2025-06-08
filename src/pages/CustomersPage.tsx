import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import AdvancedDateRangePicker from '@/components/AdvancedDateRangePicker';
import DataSummaryCard from '@/components/DataSummaryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Search, UserPlus, Users2 } from 'lucide-react';
import { DateRange } from 'react-day-picker';

const customerData = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", joinDate: "2023-01-15", totalSpent: 1250.75, orders: 5 },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", joinDate: "2023-02-20", totalSpent: 850.00, orders: 3 },
  { id: "CUST003", name: "Charlie Brown", email: "charlie@example.com", joinDate: "2023-03-10", totalSpent: 2500.50, orders: 10 },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", joinDate: "2023-04-05", totalSpent: 500.25, orders: 2 },
  { id: "CUST005", name: "Edward Scissorhands", email: "edward@example.com", joinDate: "2023-05-01", totalSpent: 180.00, orders: 1 },
];

const summaryItems = [
    { label: "Total Customers", value: customerData.length },
    { label: "New This Month", value: customerData.filter(c => new Date(c.joinDate) > new Date(new Date().setDate(1))).length },
    { label: "Average LTV", value: (customerData.reduce((sum, c) => sum + c.totalSpent, 0) / customerData.length).toFixed(2), unit: "$" },
];

const CustomersPage = () => {
  console.log('CustomersPage loaded');
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log("Selected date range for customer analytics:", newRange);
  };

  const filteredCustomers = customerData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64">
        <NavigationMenu />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6">
             <DataSummaryCard title="Customer Insights" items={summaryItems} icon={Users2} />
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>View and manage your customer data.</CardDescription>
              </div>
               <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                 <AdvancedDateRangePicker onDateChange={handleDateChange} className="w-full sm:w-auto" />
                 <Button className="w-full sm:w-auto">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{customer.orders}</TableCell>
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

export default CustomersPage;