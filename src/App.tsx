import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Program from "./pages/Program";
import DevOps from "./pages/DevOps";
import DevOpsProgram from "./pages/DevOpsProgram";
import DevOpsFaq from "./pages/DevOpsFaq";
import Auth from "./pages/Auth";
import Lesson from "./pages/Lesson";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Faq from "./pages/Faq";
import BusinessAnalyst from "./pages/BusinessAnalyst";
import BusinessAnalystProgram from "./pages/BusinessAnalystProgram";
import Settings from "./pages/Settings";
import PythonCourse from "./pages/PythonCourse";
import DataScience from "./pages/DataScience";
import DataScienceProgram from "./pages/DataScienceProgram";
import ProductManagement from "./pages/ProductManagement";
import ProductManagementProgram from "./pages/ProductManagementProgram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/program" element={<Program />} />
            <Route path="/python-course" element={<PythonCourse />} />
            <Route path="/data-science" element={<DataScience />} />
            <Route path="/data-science-program" element={<DataScienceProgram />} />
            <Route path="/devops" element={<DevOps />} />
            <Route path="/devops-program" element={<DevOpsProgram />} />
            <Route path="/devops-faq" element={<DevOpsFaq />} />
            <Route path="/business-analyst" element={<BusinessAnalyst />} />
            <Route path="/business-analyst-program" element={<BusinessAnalystProgram />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/product-management-program" element={<ProductManagementProgram />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/lesson/:lessonId" element={<Lesson />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faq" element={<Faq />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;