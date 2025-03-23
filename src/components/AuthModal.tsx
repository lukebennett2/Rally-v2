
import { useState } from 'react';
import { X, Mail, Smartphone, ArrowRight, CatIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let result;
  
      if (mode === 'signup') {
        result = await supabase.auth.signUp({ email, password });
  
        if (result.error) throw result.error;
  
        // ✅ Step: Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
  
        if (!user || userError) throw userError;
  
        // ✅ Step: Insert a new profile
        const { error: profileError } = await supabase.from('profiles').upsert([
          {
            id: user.id,
            email: user.email,
            full_name: '',
            avatar_url: ''
          }
        ]);
  
        if (profileError) throw profileError;
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
      }
  
      toast.success(mode === 'signup' ? 'Account created!' : 'Welcome back!');
      onClose();
      navigate('/onboarding');
  
    } catch (err: any) {
      toast.error('Auth error', { description: err.message });
    }
  };  

  const handleSkipForNow = () => {
    // Create a guest user
    const guestUser = {
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      name: 'Guest User',
      avatar: '/placeholder.svg', // Cat image placeholder
      isGuest: true
    };
    
    // Save the guest user to localStorage
    localStorage.setItem('guestUser', JSON.stringify(guestUser));
    
    toast.success("Entered app as a guest user", {
      description: "You can browse the app without signing in"
    });
    
    onClose();
    navigate('/dashboard');
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl w-full max-w-md mx-4 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-rally-charcoal">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <button 
              onClick={onClose}
              className="text-rally-mediumGray hover:text-rally-charcoal p-1 rounded-full hover:bg-rally-lightGray transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
    <label>Email</label>
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  {/* Password */}
  <div className="mb-4">
    <label>Password</label>
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <Button type="submit">
    {mode === 'signup' ? 'Create Account' : 'Log In'}
  </Button>
</form>
          
          <div className="mt-6 mb-4 text-center">
            <p className="text-rally-darkGray text-sm">
              {mode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <a href={mode === 'login' ? '/signup' : '/login'} className="text-rally-red font-medium story-link">
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </a>
            </p>
          </div>
          
          {/* Developer Mode Skip Button */}
          <div className="border-t border-rally-lightGray pt-4">
            <Button
              variant="outline"
              onClick={handleSkipForNow}
              className="w-full border-rally-lightGray text-rally-mediumGray hover:text-rally-charcoal"
            >
              <CatIcon size={18} className="mr-2" />
              Skip for now (Developer Mode)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
