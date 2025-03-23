import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CatAvatar from '@/components/CatAvatar';
import { 
  CalendarDays, Clock, MapPin, ArrowLeft, 
  Coffee, Beer, Footprints, Sofa, PartyPopper,
  Users, Search, Plus, Check, X 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { MOCK_FRIENDS } from '@/data/mockData';
import { MOCK_GROUPS, Group } from '@/data/groupsData';
import { supabase } from '@/lib/supabaseClient';

const StartRally = () => {
  const [justHanging, setJustHanging] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [customVibe, setCustomVibe] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('Now');
  const [timeMode, setTimeMode] = useState<'now' | 'later'>('now');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleCreateRally = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You're not logged in");
      return;
    }

    const { error } = await supabase.from('rallies').insert([
      {
        title: title || 'Untitled Rally',
        description: customNote || selectedStatus || '',
        date: timeMode === 'later' ? date : 'Today',
        time: timeMode === 'later' ? time : 'Now',
        location,
        vibe: customVibe || selectedVibe || '',
        host_id: user.id,
      },
    ]);

    if (error) {
      toast.error("Couldn't create rally", { description: error.message });
    } else {
      toast.success("You've dropped a Rally! 🦇");
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return <div>Start Rally Form</div>;
};

export default StartRally;
