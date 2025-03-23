
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, MessageCircle, Compass, Home, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = ({ showAuth = true }: { showAuth?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleStartRally = () => {
    navigate('/start-rally');
  };

  return (
    <>
      {/* Top Nav for Auth Pages */}
      {showAuth && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-rally-charcoal">Rally</div>
              </div>
              
              {!isMobile && (
                <div className="hidden md:flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/login')}
                  >
                    Log in
                  </Button>
                  <Button 
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </Button>
                </div>
              )}
              
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-rally-charcoal hover:text-rally-red focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rally-red"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed top-16 right-0 z-40 w-full h-screen">
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                onClick={() => setIsMenuOpen(false)}
              />
              
              <div className="relative w-64 ml-auto h-full bg-white shadow-lg animate-slide-in-right">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <div className="flex flex-col space-y-3 p-4">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Log in
                    </Button>
                    <Button 
                      className="w-full justify-center"
                      onClick={() => {
                        navigate('/signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
      
      {/* Bottom Nav for Logged-in Experience */}
      {!showAuth && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 h-16">
          <div className="flex justify-around items-center h-full px-2">
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full w-full rounded-none ${
                isActive('/dashboard') ? 'text-rally-red' : 'text-gray-500'
              }`}
              onClick={() => navigate('/dashboard')}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full w-full rounded-none ${
                isActive('/explore') ? 'text-rally-red' : 'text-gray-500'
              }`}
              onClick={() => navigate('/explore')}
            >
              <Compass size={20} />
              <span className="text-xs mt-1">Explore</span>
            </Button>
            
            <Button
              onClick={handleStartRally}
              className="h-14 w-14 -mt-5 rounded-full shadow-lg bg-rally-red hover:bg-rally-red/90 flex items-center justify-center text-white"
              aria-label="Start a Rally"
            >
              <Plus size={24} />
            </Button>
            
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full w-full rounded-none ${
                isActive('/chats') ? 'text-rally-red' : 'text-gray-500'
              }`}
              onClick={() => navigate('/chats')}
            >
              <MessageCircle size={20} />
              <span className="text-xs mt-1">Chat</span>
            </Button>
            
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full w-full rounded-none ${
                isActive('/profile') ? 'text-rally-red' : 'text-gray-500'
              }`}
              onClick={() => navigate('/profile')}
            >
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
