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
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, PackageSearch, TrendingDown } from 'lucide-react';
import { DateRange } from 'react-day-picker';

const productData = [
  { id: "PROD001", name: "Wireless Mouse X1", category: "Electronics", price: 29.99, stock: 150, sales: 500, status: "In Stock" },
  { id: "PROD002", name: "Ergonomic Keyboard K2", category: "Electronics", price: 79.99, stock: 5, sales: 200, status: "Low Stock" },
  { id: "PROD003", name: "Organic Green Tea", category: "Groceries", price: 9.99, stock: 200, sales: 1200, status: "In Stock" },
  { id: "PROD004", name: "Yoga Mat Pro", category: "Sports", price: 45.00, stock: 0, sales: 300, status: "Out of Stock" },
  { id: "PROD005", name: "Bluetooth Speaker BZ", category: "Electronics", price: 99.50, stock: 75, sales: 150, status: "In Stock" },
];

const summaryItems = [
    { label: "Total Products", value: productData.length },
    { label: "Low Stock Alerts", value: productData.filter(p => p.status === "Low Stock").length, unit: "items" },
    { label: "Out of Stock", value: productData.filter(p => p.status === "Out of Stock").length, unit: "items" },
];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log("Selected date range for product trends:", newRange);
  };

  const filteredProducts = productData.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64">
        <NavigationMenu />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <DataSummaryCard title="Product Overview" items={summaryItems} icon={PackageSearch} />
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Best Selling Product</CardTitle>
                    <CardDescription>Based on last 30 days sales</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Organic Green Tea</div>
                    <p className="text-xs text-muted-foreground">1200 units sold</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Slowest Moving</CardTitle>
                     <CardDescription>Consider promotion</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Bluetooth Speaker BZ</div>
                    <p className="text-xs text-muted-foreground">150 units sold</p>
                </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Search, filter, and manage your product inventory.</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                 <AdvancedDateRangePicker onDateChange={handleDateChange} className="w-full sm:w-auto" />
                 <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">{product.sales}</TableCell>
                      <TableCell>
                        <Badge variant={
                          product.status === "In Stock" ? "default" :
                          product.status === "Low Stock" ? "secondary" : "destructive"
                        }>{product.status}</Badge>
                      </TableCell>
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

export default ProductsPage;