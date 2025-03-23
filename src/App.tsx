
import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RallyDetail from "./pages/RallyDetail";
import CreateRally from "./pages/CreateRally";
import StartRally from "./pages/StartRally";
import GroupManagement from "./pages/GroupManagement";
import CalendarView from "./pages/CalendarView";
import ProfileView from "./pages/ProfileView";
import Explore from "./pages/Explore";
import ChatView from "./pages/ChatView";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rally/:id" element={<RallyDetail />} />
          <Route path="/create/:mode" element={<CreateRally />} />
          <Route path="/start-rally" element={<StartRally />} />
          <Route path="/groups" element={<GroupManagement />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chats" element={<ChatView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
