import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { EmployeesPage } from "./components/EmployeesPage";
import { AIInsightsPage } from "./components/AIInsightsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="insights" element={<AIInsightsPage />} />
            <Route path="analytics" element={<div className="p-6"><h1>Analytics - Coming Soon</h1></div>} />
            <Route path="alerts" element={<div className="p-6"><h1>Alerts & Nudges - Coming Soon</h1></div>} />
            <Route path="queries" element={<div className="p-6"><h1>NLP Queries - Coming Soon</h1></div>} />
            <Route path="sources" element={<div className="p-6"><h1>Data Sources - Coming Soon</h1></div>} />
            <Route path="access" element={<div className="p-6"><h1>Access Control - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1>Settings - Coming Soon</h1></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
