
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Clock, MapPin, ArrowLeft, Share2, MessageCircle, UserPlus, LogOut, X, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import RallyChat from '@/components/RallyChat';
import { toast } from 'sonner';
import { MOCK_RALLIES } from '@/data/mockData';
import { RallyCardProps } from '@/components/RallyCard';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const RallyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [rally, setRally] = useState<RallyCardProps | null>(null);
  const [isTappedIn, setIsTappedIn] = useState(false);
  const [tapOutDialogOpen, setTapOutDialogOpen] = useState(false);
  const [tapOutReason, setTapOutReason] = useState<string>('busy');
  
  // Get the tab from URL query params
  const params = new URLSearchParams(location.search);
  const initialTab = params.get('tab') === 'chat' ? 'chat' : 'details';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    // In a real app, this would fetch from Supabase
    const fetchRallyDetails = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const foundRally = MOCK_RALLIES.find(r => r.id === id);
      if (foundRally) {
        // Check if user is already tapped in
        const userTappedInIds = localStorage.getItem('tappedInRallies');
        const isTappedInAlready = userTappedInIds 
          ? JSON.parse(userTappedInIds).includes(foundRally.id)
          : false;
          
        setRally(foundRally);
        setIsTappedIn(isTappedInAlready || foundRally.isTappedIn || false);
      } else {
        // Rally not found
        toast.error("Rally not found");
        navigate('/dashboard');
      }
    };
    
    fetchRallyDetails();
  }, [id, navigate]);

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab === 'chat') {
      navigate(`/rally/${id}?tab=chat`, { replace: true });
    } else {
      navigate(`/rally/${id}`, { replace: true });
    }
  }, [activeTab, id, navigate]);
  
  const handleTapIn = () => {
    if (!rally) return;
    
    // Update the rally with increased attendee count and tapped in status
    setIsTappedIn(true);
    setRally({
      ...rally,
      attendeeCount: rally.attendeeCount + 1,
      isTappedIn: true
    });
    
    // Save to localStorage
    const existingIds = localStorage.getItem('tappedInRallies');
    const idsArray = existingIds ? JSON.parse(existingIds) as string[] : [];
    localStorage.setItem('tappedInRallies', JSON.stringify([...idsArray, rally.id]));
    
    // Show success message
    toast.success("You're in. Rally up! 🎉", {
      description: "Rally added to your plans. You can now chat with other attendees.",
    });
    
    // Switch to chat tab after tapping in
    setTimeout(() => {
      setActiveTab('chat');
    }, 1000);
  };
  
  const handleTapOut = () => {
    setTapOutDialogOpen(true);
  };
  
  const confirmTapOut = () => {
    if (!rally) return;
    
    // Update the rally with decreased attendee count and tapped out status
    setIsTappedIn(false);
    setRally({
      ...rally,
      attendeeCount: Math.max(rally.attendeeCount - 1, 0),
      isTappedIn: false
    });
    
    // Remove from localStorage
    const existingIds = localStorage.getItem('tappedInRallies');
    if (existingIds) {
      const idsArray = JSON.parse(existingIds) as string[];
      const updatedIds = idsArray.filter(item => item !== rally.id);
      localStorage.setItem('tappedInRallies', JSON.stringify(updatedIds));
    }
    
    // Close dialog
    setTapOutDialogOpen(false);
    
    // Show success message
    toast.success(`You've tapped out of ${rally.title}`, {
      description: `Reason: ${getTapOutReasonText(tapOutReason)}`,
    });
    
    // Switch to details tab
    setActiveTab('details');
  };
  
  const getTapOutReasonText = (reason: string): string => {
    switch(reason) {
      case 'busy': return 'Busy';
      case 'notFeeling': return 'Not feeling it';
      case 'noReason': return 'No reason provided';
      default: return 'Other reasons';
    }
  };
  
  const handleGoBack = () => {
    // Check if we should navigate back to chat view
    if (location.search.includes('tab=chat')) {
      navigate('/chats');
    } else {
      navigate('/dashboard');
    }
  };
  
  if (!rally) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar showAuth={false} />
        <div className="pt-20 px-4 flex justify-center items-center h-[80vh]">
          <div className="animate-pulse">Loading rally details...</div>
        </div>
      </div>
    );
  }
  
  // Generate list of attendees for display
  const attendees = [
    { id: 'host', name: rally.host.name, avatar: rally.host.avatar || '/placeholder.svg' },
    ...(rally.coHost ? [{ id: 'cohost', name: rally.coHost.name, avatar: rally.coHost.avatar || '/placeholder.svg' }] : []),
    ...(rally.attendees || []).filter(a => a.id !== rally.host.name && (!rally.coHost || a.id !== rally.coHost.name))
  ];

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
          Back
        </Button>
        
        <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-rally-charcoal">{rally.title}</h1>
              <div className="flex items-center mt-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={rally.host.avatar || '/placeholder.svg'} alt={rally.host.name} />
                  <AvatarFallback>{rally.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-rally-darkGray">{rally.host.name}</span>
                
                {rally.coHost && (
                  <>
                    <span className="mx-2 text-rally-mediumGray">•</span>
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={rally.coHost.avatar || '/placeholder.svg'} alt={rally.coHost.name} />
                      <AvatarFallback>{rally.coHost.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-rally-darkGray">{rally.coHost.name}</span>
                  </>
                )}
              </div>
            </div>
            
            {rally.vibe && (
              <div className="px-3 py-1 rounded-full bg-rally-lightGray text-rally-darkGray text-sm font-medium">
                {rally.vibe}
              </div>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="w-full bg-rally-lightGray p-1 rounded-lg">
              <TabsTrigger 
                value="details" 
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                disabled={!isTappedIn}
              >
                <MessageCircle size={16} className="mr-1" />
                Chat
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-rally-darkGray">
                  <CalendarDays size={18} className="mr-3 text-rally-mediumGray" />
                  <span>{rally.date}</span>
                </div>
                
                <div className="flex items-center text-rally-darkGray">
                  <Clock size={18} className="mr-3 text-rally-mediumGray" />
                  <span>{rally.time}</span>
                </div>
                
                {rally.location && (
                  <div className="flex items-center text-rally-darkGray">
                    <MapPin size={18} className="mr-3 text-rally-mediumGray" />
                    <span>{rally.location}</span>
                  </div>
                )}
              </div>

              {rally.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-rally-mediumGray mb-2">Description</h3>
                  <p className="text-rally-charcoal">{rally.description}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-rally-mediumGray mb-3">Who's in ({rally.attendeeCount})</h3>
                <div className="flex flex-wrap -space-x-2">
                  {attendees.map((attendee, index) => (
                    <Avatar key={attendee.id} className="border-2 border-white h-10 w-10">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  
                  {rally.attendeeCount < rally.maxAttendees && (
                    <div className="h-10 w-10 rounded-full bg-rally-lightGray flex items-center justify-center text-rally-mediumGray text-xs ml-1">
                      +{rally.maxAttendees - rally.attendeeCount}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="border-rally-lightGray text-rally-darkGray bg-white"
                  onClick={() => {
                    toast.success("Rally shared!");
                  }}
                >
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
                
                {!isTappedIn ? (
                  <Button
                    onClick={handleTapIn}
                    className="bg-rally-red hover:bg-rally-red/90 text-white px-6 py-2 rounded-full font-medium transition-all"
                  >
                    <UserPlus size={18} className="mr-2" />
                    Tap In
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      className="bg-green-500 hover:bg-green-500 cursor-default text-white px-6 py-2 rounded-full font-medium transition-all"
                    >
                      You're In
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-500 hover:bg-red-50"
                      onClick={handleTapOut}
                    >
                      <LogOut size={18} className="mr-2" />
                      Tap Out
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="mt-6">
              {isTappedIn ? (
                <div className="h-[400px]">
                  <RallyChat rally={rally} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle size={48} className="mx-auto mb-4 text-rally-mediumGray" />
                  <h3 className="text-lg font-medium text-rally-charcoal mb-2">Join to access chat</h3>
                  <p className="text-rally-mediumGray mb-4">Tap in to join the conversation with other attendees</p>
                  <Button
                    onClick={handleTapIn}
                    className="bg-rally-red hover:bg-rally-red/90 text-white px-6 py-2 rounded-full font-medium transition-all"
                  >
                    Tap In
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Tap Out Dialog */}
      <Dialog open={tapOutDialogOpen} onOpenChange={setTapOutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Why are you tapping out?</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={tapOutReason} onValueChange={setTapOutReason} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="busy" id="option-busy" />
                <Label htmlFor="option-busy">Busy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="notFeeling" id="option-not-feeling" />
                <Label htmlFor="option-not-feeling">Not feeling it</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noReason" id="option-no-reason" />
                <Label htmlFor="option-no-reason">No reason</Label>
              </div>
            </RadioGroup>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setTapOutDialogOpen(false)}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button onClick={confirmTapOut} className="bg-rally-red hover:bg-rally-red/90">
              <Check size={16} className="mr-2" />
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RallyDetail;
