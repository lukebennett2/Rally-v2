import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  CalendarDays,
  Users,
  Bell,
  Settings,
  Eye,
  PenSquare,
  UserPlus
} from 'lucide-react';
import { MOCK_RALLIES } from '@/data/mockData';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ProfileView = () => {
  const navigate = useNavigate();
  const [availabilityVisible, setAvailabilityVisible] = useState(true);
  const [quietMode, setQuietMode] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id:'',
    full_name: '',
    username: '',
    avatar_url: '',
  });
  const [profile, setProfile] = useState({ full_name: '', username: '', avatar_url: '', id: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
  
      const {
        data: profileData,
        error: profileError
      } = await supabase
        .from('profiles')
        .select()
        .eq('id', user?.id)
        .single();
  
      if (profileError) {
        toast.error("Couldn't fetch profile data", { description: profileError.message });
      } else {
        setProfile({
          id: profileData.id,
          full_name: profileData.full_name || '',
          username: profileData.username || '',
          avatar_url: profileData.avatar_url || ''
        });
  
        setFormData({
          id: profileData.id,
          full_name: profileData.full_name || '',
          username: profileData.username || '',
          avatar_url: profileData.avatar_url || ''
        });
      }
    };
  
    fetchProfile();
  }, []);
  
  const handleUpdateProfile = async () => {
    const { error } = await supabase.from('profiles').update({
      full_name: formData.full_name,
      username: formData.username,
      avatar_url: formData.avatar_url,
    }).eq('id', profile.id);

    if (error) {
      toast.error("Couldn't update profile", { description: error.message });
    } else {
      toast.success("Profile updated successfully");
      setProfile(formData);
      setIsEditing(false);
    }
  };

  const userTappedInIds = localStorage.getItem('tappedInRallies');
  const tappedInIds = userTappedInIds ? JSON.parse(userTappedInIds) as string[] : [];
  const userRallies = MOCK_RALLIES.filter(rally => tappedInIds.includes(rally.id));

  const upcomingRallies = userRallies.slice(0, 2);
  const pastRallies = userRallies.slice(2);

  const friendGroups = [
    { id: '1', name: 'Close Friends', count: 8 },
    { id: '2', name: 'Work Buddies', count: 12 },
    { id: '3', name: 'School Friends', count: 5 },
  ];

  const handleGoBack = () => navigate('/dashboard');
  const handleInviteFriends = () => {
    toast.success("Invitation link copied to clipboard!", {
      description: "Share this link with friends to invite them to Rally."
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar showAuth={false} />

      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <Button variant="ghost" className="mb-4 pl-0 text-rally-charcoal" onClick={handleGoBack}>
          <ArrowLeft size={18} className="mr-1" />
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-rally-red">
              <AvatarImage src={formData.avatar_url || "/placeholder.svg"} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex-1">
            {isEditing ? (
  <>
    <Input
      value={formData.full_name}
      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
      className="mb-2"
    />
    <Input
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
    <div className="flex gap-2 mt-3">
      <Button
        size="sm"
        className="bg-rally-red text-white"
        onClick={handleUpdateProfile}
      >
        Save
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          // Reset form to original profile
          setFormData({
            id: profile.id,
            full_name: profile.full_name,
            username: profile.username,
            avatar_url: profile.avatar_url,
          });
          setIsEditing(false);
        }}
      >
        Cancel
      </Button>
    </div>
  </>
) : (
  <>
    <h1 className="text-2xl font-bold text-rally-charcoal">
      {profile.full_name || "Your Name"}
    </h1>
    <p className="text-rally-mediumGray">@{profile.username || "yourusername"}</p>
  </>
)}
</div>
            <Button variant="ghost" size="icon" onClick={isEditing ? handleUpdateProfile : () => setIsEditing(true)}>
              {isEditing ? 'Save' : <PenSquare size={18} />}
            </Button>
          </div>
        </div>

        {/* ...rest of settings, groups, and rally display stays unchanged... */}

      </main>
    </div>
  );
};

export default ProfileView;