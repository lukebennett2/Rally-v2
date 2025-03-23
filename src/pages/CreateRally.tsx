import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarDays, Clock, MapPin, ArrowLeft, UserPlus, 
  Users, Search, Plus, Check, UserCheck, X 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { MOCK_GROUPS, Group } from '@/data/groupsData';
import { MOCK_FRIENDS } from '@/data/mockData';

// Vibetags options
const VIBE_OPTIONS = ['Chill', 'Social', 'Active', 'Fun', 'Foodie', 'Culture', 'Outdoors'];

const CreateRally = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const isNowMode = mode === 'now';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(isNowMode ? 'Today' : '');
  const [time, setTime] = useState(isNowMode ? '2 hours' : '');
  const [vibe, setVibe] = useState('');
  const [maxAttendees, setMaxAttendees] = useState(5);
  const [showCoHostSelect, setShowCoHostSelect] = useState(false);
  const [selectedCoHost, setSelectedCoHost] = useState<string | null>(null);
  
  // New state for invite selection
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteTab, setInviteTab] = useState('friends');
  const [enableGroupChat, setEnableGroupChat] = useState(true);
  
  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard');
    }
  };
  
  const handleCoHostInvite = () => {
    setShowCoHostSelect(!showCoHostSelect);
  };
  
  const handleSelectCoHost = (id: string) => {
    setSelectedCoHost(id);
    setShowCoHostSelect(false);
    toast.success(`Co-host invite sent!`, {
      description: "They'll receive a notification to accept or decline.",
    });
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!title.trim()) {
        toast.error("Please add a title for your Rally");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (selectedInvitees.length === 0 && selectedGroups.length === 0) {
        toast.error("Please select at least one friend or group to invite");
        return;
      }
      handleCreateRally();
    }
  };
  
  const handleCreateRally = () => {
    // In a real app, this would send data to Supabase
    toast.success("Rally created! 🎉", {
      description: "Your friends will be notified. Tap in to see who joins!",
    });
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const toggleInvitee = (id: string) => {
    if (selectedInvitees.includes(id)) {
      setSelectedInvitees(selectedInvitees.filter(inviteeId => inviteeId !== id));
    } else {
      setSelectedInvitees([...selectedInvitees, id]);
    }
  };
  
  const toggleGroup = (id: string) => {
    if (selectedGroups.includes(id)) {
      setSelectedGroups(selectedGroups.filter(groupId => groupId !== id));
    } else {
      setSelectedGroups([...selectedGroups, id]);
    }
  };
  
  const filteredFriends = MOCK_FRIENDS.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredGroups = MOCK_GROUPS.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar showAuth={false} />
      
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 text-rally-charcoal"
          onClick={handleGoBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          {currentStep > 1 ? "Back to Details" : "Back"}
        </Button>
        
        <h1 className="text-2xl font-bold text-rally-charcoal mb-6">
          {currentStep === 1 ? (isNowMode ? "I'm Free Now" : "Plan Ahead") : "Choose Who to Invite"}
        </h1>
        
        {currentStep === 1 ? (
          // Rally Details Form
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-rally-darkGray mb-1">
                What's the plan?
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Coffee & Catch-up, Evening Drinks..."
                className="rally-input"
              />
            </div>
            
            <div className="flex gap-6">
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-rally-darkGray mb-1">
                  <CalendarDays size={16} className="inline mr-1" />
                  When?
                </label>
                <Input
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder={isNowMode ? "Today" : "e.g., Tomorrow, Saturday..."}
                  className="rally-input"
                  defaultValue={isNowMode ? "Today" : ""}
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="time" className="block text-sm font-medium text-rally-darkGray mb-1">
                  <Clock size={16} className="inline mr-1" />
                  Time
                </label>
                <Input
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder={isNowMode ? "Next 2 hours" : "e.g., 7PM - 10PM"}
                  className="rally-input"
                  defaultValue={isNowMode ? "Next 2 hours" : ""}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-rally-darkGray mb-1">
                <MapPin size={16} className="inline mr-1" />
                Where?
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Ritual Coffee, The Alchemist Bar..."
                className="rally-input"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-rally-darkGray mb-1">
                Description (optional)
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any details or notes..."
                className="rally-input min-h-[80px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-rally-darkGray mb-2">
                Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {VIBE_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    onClick={() => setVibe(option)}
                    className={`rounded-full text-sm ${
                      vibe === option
                        ? 'bg-rally-red text-white'
                        : 'bg-rally-lightGray text-rally-charcoal'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-rally-darkGray mb-1">
                <Users size={16} className="inline mr-1" />
                Max Attendees
              </label>
              <div className="flex items-center">
                <Button
                  type="button"
                  onClick={() => setMaxAttendees(Math.max(2, maxAttendees - 1))}
                  className="bg-rally-lightGray text-rally-charcoal h-10 w-10 rounded-full"
                >
                  -
                </Button>
                <span className="mx-4 text-lg font-medium text-rally-charcoal">{maxAttendees}</span>
                <Button
                  type="button"
                  onClick={() => setMaxAttendees(Math.min(20, maxAttendees + 1))}
                  className="bg-rally-lightGray text-rally-charcoal h-10 w-10 rounded-full"
                >
                  +
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-rally-darkGray">
                  Co-Host (optional)
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCoHostInvite}
                  className="text-rally-red"
                >
                  <UserPlus size={16} className="mr-1" />
                  {showCoHostSelect ? 'Cancel' : 'Invite Co-host'}
                </Button>
              </div>
              
              {selectedCoHost && (
                <div className="flex items-center p-3 bg-rally-lightGray/50 rounded-lg">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage 
                      src={MOCK_FRIENDS.find(f => f.id === selectedCoHost)?.avatar || '/placeholder.svg'} 
                      alt="Co-host" 
                    />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-rally-charcoal">
                      {MOCK_FRIENDS.find(f => f.id === selectedCoHost)?.name}
                    </div>
                    <div className="text-xs text-rally-mediumGray">
                      Invite sent
                    </div>
                  </div>
                </div>
              )}
              
              {showCoHostSelect && !selectedCoHost && (
                <Card className="mt-2 border border-rally-lightGray animate-fade-in">
                  <CardContent className="p-3">
                    <div className="text-sm font-medium text-rally-mediumGray mb-3">
                      Select a friend to co-host:
                    </div>
                    <div className="space-y-2">
                      {MOCK_FRIENDS.map(friend => (
                        <div 
                          key={friend.id}
                          className="flex items-center p-2 hover:bg-rally-lightGray/50 rounded-lg cursor-pointer transition-colors"
                          onClick={() => handleSelectCoHost(friend.id)}
                        >
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-rally-charcoal">{friend.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Invite Selection Form
          <div className="space-y-6">
            <div className="mb-4">
              <div className="text-rally-charcoal mb-3">
                Choose who can see this Rally:
              </div>
              
              <Tabs defaultValue="friends" className="w-full" onValueChange={value => setInviteTab(value)}>
                <TabsList className="w-full bg-rally-lightGray p-1 rounded-lg">
                  <TabsTrigger 
                    value="friends" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    Friends
                  </TabsTrigger>
                  <TabsTrigger 
                    value="groups" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    Groups
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rally-mediumGray" size={16} />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search ${inviteTab}...`}
                  className="rally-input pl-10"
                />
              </div>
            </div>
            
            {/* Selected summary */}
            {(selectedInvitees.length > 0 || selectedGroups.length > 0) && (
              <div className="bg-rally-lightGray/30 rounded-lg p-3">
                <h3 className="text-sm font-medium text-rally-charcoal mb-2">
                  <UserCheck size={16} className="inline mr-1" />
                  Selected ({selectedInvitees.length + selectedGroups.length})
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {selectedGroups.map(groupId => {
                    const group = MOCK_GROUPS.find(g => g.id === groupId);
                    return group ? (
                      <div 
                        key={group.id} 
                        className="flex items-center bg-white rounded-full pl-2 pr-2 py-1 border border-rally-lightGray"
                      >
                        <span className="text-sm mr-1">{group.emoji}</span>
                        <span className="text-xs text-rally-charcoal mr-1">{group.name}</span>
                        <Button 
                          variant="ghost" 
                          className="h-4 w-4 p-0" 
                          onClick={() => toggleGroup(group.id)}
                        >
                          <X size={12} className="text-rally-mediumGray" />
                        </Button>
                      </div>
                    ) : null;
                  })}
                  
                  {selectedInvitees.map(inviteeId => {
                    const friend = MOCK_FRIENDS.find(f => f.id === inviteeId);
                    return friend ? (
                      <div 
                        key={friend.id} 
                        className="flex items-center bg-white rounded-full pl-1 pr-2 py-1 border border-rally-lightGray"
                      >
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-rally-charcoal mr-1">{friend.name}</span>
                        <Button 
                          variant="ghost" 
                          className="h-4 w-4 p-0" 
                          onClick={() => toggleInvitee(friend.id)}
                        >
                          <X size={12} className="text-rally-mediumGray" />
                        </Button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto border rounded-md border-rally-lightGray">
              {inviteTab === 'friends' ? (
                filteredFriends.length > 0 ? (
                  filteredFriends.map(friend => (
                    <div 
                      key={friend.id}
                      className="flex items-center justify-between p-3 hover:bg-rally-lightGray/50 cursor-pointer border-b border-rally-lightGray last:border-b-0"
                      onClick={() => toggleInvitee(friend.id)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-rally-charcoal">{friend.name}</span>
                      </div>
                      
                      {selectedInvitees.includes(friend.id) ? (
                        <Check size={18} className="text-rally-red" />
                      ) : (
                        <Plus size={18} className="text-rally-mediumGray" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-rally-mediumGray">
                    No friends found
                  </div>
                )
              ) : (
                filteredGroups.length > 0 ? (
                  filteredGroups.map(group => (
                    <div 
                      key={group.id}
                      className="flex items-center justify-between p-3 hover:bg-rally-lightGray/50 cursor-pointer border-b border-rally-lightGray last:border-b-0"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-rally-lightGray flex items-center justify-center mr-3">
                          <span className="text-lg">{group.emoji}</span>
                        </div>
                        <div>
                          <div className="text-rally-charcoal">{group.name}</div>
                          <div className="text-xs text-rally-mediumGray">{group.members.length} members</div>
                        </div>
                      </div>
                      
                      {selectedGroups.includes(group.id) ? (
                        <Check size={18} className="text-rally-red" />
                      ) : (
                        <Plus size={18} className="text-rally-mediumGray" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-rally-mediumGray">
                    <div>No groups found</div>
                    <Button 
                      className="mt-2 text-rally-red"
                      variant="ghost"
                      onClick={() => navigate('/groups')}
                    >
                      <Plus size={16} className="mr-1" />
                      Create Group
                    </Button>
                  </div>
                )
              )}
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer">
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${enableGroupChat ? 'bg-rally-red' : 'bg-gray-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enableGroupChat ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <span className="ml-2 text-sm text-rally-darkGray" onClick={() => setEnableGroupChat(!enableGroupChat)}>
                    Create group chat when people tap in
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <Button
            onClick={handleNextStep}
            className="w-full bg-rally-red hover:bg-rally-red/90 text-white rounded-full py-3 font-medium text-base"
          >
            {currentStep === 1 ? 'Next: Choose Who to Invite' : 'Create Rally'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreateRally;
