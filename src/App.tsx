import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import DiscoveryCall from "./pages/DiscoveryCall";
import AutomationGuidePage from "./pages/AutomationGuide";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPortfolios from "./pages/AdminPortfolios";
import AdminConversations from "./pages/AdminConversations";
import AdminJobs from "./pages/AdminJobs";
import NotFound from "./pages/NotFound";
import React, { useState } from "react";
import { Bot } from "lucide-react";
import { ChatbotModal } from "@/components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/case-study/:id" element={<CaseStudy />} />
              {/* <Route path="/blog" element={<Blog />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/discovery-call" element={<DiscoveryCall />} />
              <Route path="/automation-guide" element={<AutomationGuidePage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={<Navigate to="/admin" replace />}
              />
              <Route
                path="/admin/portfolios"
                element={
                  <ProtectedAdminRoute>
                    <AdminPortfolios />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/conversations"
                element={
                  <ProtectedAdminRoute>
                    <AdminConversations />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <ProtectedAdminRoute>
                    <AdminJobs />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Floating Chatbot Icon */}
            <button
              className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
              onClick={() => setChatOpen(true)}
              aria-label="Open chatbot"
            >
              <Bot className="w-7 h-7" />
            </button>
            <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
