import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Assuming a generic Homepage exists or might be added later for '/'
// import Homepage from "./pages/Homepage"; 
import NotFound from "./pages/NotFound"; 

// Import new dashboard pages
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import SalesReportsPage from "./pages/SalesReportsPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect bare / to /dashboard or a specific landing page if exists */}
          {/* For now, let's assume /dashboard is the primary entry for this app section */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* <Route path="/" element={<Homepage />} /> */} {/* Example if a general homepage exists */}

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/dashboard/sales" element={<SalesReportsPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          
          {/* ADD ALL OTHER CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;