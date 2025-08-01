import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { EmployeesPage } from "./components/EmployeesPage";
import { AIInsightsPage } from "./components/AIInsightsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { AlertsPage } from "./components/AlertsPage";
import { NLPQueriesPage } from "./components/NLPQueriesPage";
import { ChatbotPage } from "./components/ChatbotPage";
import { DataSourcesPage } from "./components/DataSourcesPage";
import { AccessControlPage } from "./components/AccessControlPage";
import { ThemeProvider } from "./components/ThemeProvider";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="lovable-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="insights" element={<AIInsightsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="queries" element={<NLPQueriesPage />} />
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route path="sources" element={<DataSourcesPage />} />
              <Route path="access" element={<AccessControlPage />} />
              <Route path="settings" element={<div className="p-6"><h1>Settings - Coming Soon</h1></div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
