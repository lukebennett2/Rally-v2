import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        toast.error("Not logged in");
        navigate('/login');
      } else {
        setUserId(data.user.id);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name, username })
      .eq('id', userId);

    if (error) {
      toast.error("Couldn’t save your profile", { description: error.message });
    } else {
      toast.success("You're all set!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-rally-charcoal mb-4">Tell us about you</h2>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <Button type="submit" className="w-full bg-rally-red text-white">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Onboarding;
