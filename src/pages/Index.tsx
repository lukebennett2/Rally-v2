import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AuthModal from '@/components/AuthModal';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  
  // Check if we're on the login or signup route
  const checkAuthRoute = () => {
    const path = window.location.pathname;
    if (path === '/login') {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else if (path === '/signup') {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    }
  };
  
  // Run this check when the component mounts
  React.useEffect(() => {
    checkAuthRoute();
    
    // Also listen for history changes
    const handleRouteChange = () => {
      checkAuthRoute();
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    // Go back to home if on a specific auth route
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        mode={authMode}
      />
    </div>
  );
};

export default Index;
