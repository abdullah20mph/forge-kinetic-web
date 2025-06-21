import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import GetStarted from "./pages/GetStarted";
import DiscoveryCall from "./pages/DiscoveryCall";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPortfolios from "./pages/AdminPortfolios";
import { Analytics } from "@vercel/analytics/react"; // Use /react for React projects
import React, { useState } from "react";
import { Bot } from "lucide-react"; // Use the Bot icon from lucide-react
import { ChatbotModal } from "@/components/ChatBot";
// src/components/ChatBot.tsx
const queryClient = new QueryClient();

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
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
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/discovery-call" element={<DiscoveryCall />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/portfolios"
                  element={
                    <ProtectedAdminRoute>
                      <AdminPortfolios />
                    </ProtectedAdminRoute>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
        <Analytics />
      </QueryClientProvider>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
        onClick={() => setChatOpen(true)}
        aria-label="Open chatbot"
      >
        <Bot className="w-7 h-7" />
      </button>
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default App;
