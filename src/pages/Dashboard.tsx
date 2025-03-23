import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RallyCard, { RallyCardProps } from '@/components/RallyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Flame, Users, Calendar, MessageCircle, Compass } from 'lucide-react';
import { MOCK_RALLIES } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [rallies, setRallies] = useState<RallyCardProps[]>([]);
  const [tappedInRallies, setTappedInRallies] = useState<RallyCardProps[]>([]);
  const [availableRallies, setAvailableRallies] = useState<RallyCardProps[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mainTab, setMainTab] = useState('feed');
  
  useEffect(() => {
    const loadRallies = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAvailableRallies(MOCK_RALLIES);
      
      const userTappedInIds = localStorage.getItem('tappedInRallies');
      if (userTappedInIds) {
        const ids = JSON.parse(userTappedInIds) as string[];
        
        const tappedIn = MOCK_RALLIES.filter(rally => ids.includes(rally.id));
        const available = MOCK_RALLIES.filter(rally => !ids.includes(rally.id));
        
        setTappedInRallies(tappedIn);
        setAvailableRallies(available);
      }
    };
    
    loadRallies();
  }, []);
  
  const handleTapIn = (id: string) => {
    const rally = availableRallies.find(r => r.id === id);
    if (!rally) return;
    
    const updatedRally = { 
      ...rally, 
      attendeeCount: rally.attendeeCount + 1, 
      isTappedIn: true 
    };
    
    setAvailableRallies(availableRallies.filter(r => r.id !== id));
    setTappedInRallies([...tappedInRallies, updatedRally]);
    
    const existingIds = localStorage.getItem('tappedInRallies');
    const idsArray = existingIds ? JSON.parse(existingIds) as string[] : [];
    localStorage.setItem('tappedInRallies', JSON.stringify([...idsArray, id]));
    
    toast.success("You're in. Rally up! 🎉", {
      description: "Rally details added to your upcoming plans. Check the 'My Plans' tab.",
    });
    
    setTimeout(() => {
      setMainTab('upcoming');
    }, 2000);
  };
  
  const filteredRallies = availableRallies.filter(rally => {
    if (activeFilter === 'today') {
      return rally.date === 'Today';
    }
    if (activeFilter === 'upcoming') {
      return rally.date !== 'Today';
    }
    return true;
  });
  
  return (
    <div className="min-h-screen bg-white pb-20">
      <main className="pt-4 px-4">
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="feed" className="w-full" value={mainTab} onValueChange={value => setMainTab(value)}>
            <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="feed" 
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
              >
                Feed
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
              >
                My Plans
                {tappedInRallies.length > 0 && (
                  <div className="ml-2 h-5 w-5 rounded-full bg-rally-red text-white text-xs flex items-center justify-center">
                    {tappedInRallies.length}
                  </div>
                )}
              </TabsTrigger>
            </TabsList>
          
            <TabsContent value="feed" className="mt-0">
              <div className="mb-6 mt-4">
                <h1 className="text-2xl font-bold text-rally-charcoal">What's Happening</h1>
              </div>
              
              <Tabs defaultValue="all" className="mb-4">
                <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="all" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="today" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    onClick={() => setActiveFilter('today')}
                  >
                    <Flame size={16} className="mr-1" />
                    Today
                  </TabsTrigger>
                  <TabsTrigger 
                    value="upcoming" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                    onClick={() => setActiveFilter('upcoming')}
                  >
                    <Calendar size={16} className="mr-1" />
                    Later
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  {filteredRallies.length > 0 ? (
                    <div className="space-y-4 animate-fade-in">
                      {filteredRallies.map(rally => (
                        <RallyCard
                          key={rally.id}
                          {...rally}
                          isTappedIn={false}
                          onTapIn={handleTapIn}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-4 text-gray-500">
                        <Users size={48} className="mx-auto mb-2" />
                      </div>
                      <h3 className="text-lg font-medium text-rally-charcoal mb-2">No plans yet</h3>
                      <p className="text-gray-600 mb-4">Create your first Rally or wait for friends to invite you</p>
                      <Button 
                        className="bg-rally-red text-white"
                        onClick={() => document.location.href = '/create/now'}
                      >
                        Create a Rally
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="today" className="mt-6">
                  {filteredRallies.length > 0 ? (
                    <div className="space-y-4 animate-fade-in">
                      {filteredRallies.map(rally => (
                        <RallyCard
                          key={rally.id}
                          {...rally}
                          isTappedIn={false}
                          onTapIn={handleTapIn}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-4 text-gray-500">
                        <Flame size={48} className="mx-auto mb-2" />
                      </div>
                      <h3 className="text-lg font-medium text-rally-charcoal mb-2">No plans for today</h3>
                      <p className="text-gray-600 mb-4">Start a spontaneous Rally or wait for friends</p>
                      <Button 
                        className="rally-button-primary"
                        onClick={() => document.location.href = '/create/now'}
                      >
                        I'm Free Now
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="upcoming" className="mt-6">
                  {filteredRallies.length > 0 ? (
                    <div className="space-y-4 animate-fade-in">
                      {filteredRallies.map(rally => (
                        <RallyCard
                          key={rally.id}
                          {...rally}
                          isTappedIn={false}
                          onTapIn={handleTapIn}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-4 text-gray-500">
                        <Calendar size={48} className="mx-auto mb-2" />
                      </div>
                      <h3 className="text-lg font-medium text-rally-charcoal mb-2">No upcoming plans</h3>
                      <p className="text-gray-600 mb-4">Plan ahead or wait for friends to invite you</p>
                      <Button 
                        className="rally-button-primary"
                        onClick={() => document.location.href = '/create/later'}
                      >
                        Plan Ahead
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="flex justify-between items-center mb-6 mt-4">
                <h1 className="text-2xl font-bold text-rally-charcoal">My Plans</h1>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-rally-charcoal"
                  onClick={() => navigate('/chats')}
                >
                  <MessageCircle size={18} className="mr-2" />
                  Chats
                </Button>
              </div>
              
              {tappedInRallies.length > 0 ? (
                <div className="space-y-4 animate-fade-in">
                  {tappedInRallies.map(rally => (
                    <div 
                      key={rally.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer bg-white"
                      onClick={() => navigate(`/rally/${rally.id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-rally-charcoal">{rally.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <span>{rally.date}</span>
                            <span className="mx-1">•</span>
                            <span>{rally.time}</span>
                          </div>
                        </div>
                        
                        {rally.vibe && (
                          <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">
                            {rally.vibe}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex -space-x-2">
                          {rally.attendees && rally.attendees.slice(0, 4).map((attendee, index) => (
                            <Avatar key={index} className="border-2 border-white h-8 w-8">
                              <AvatarImage src={attendee.avatar} alt={attendee.name} />
                              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          
                          {rally.attendeeCount > 4 && (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs border-2 border-white">
                              +{rally.attendeeCount - 4}
                            </div>
                          )}
                        </div>
                        
                        <Button
                          className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/rally/${rally.id}?tab=chat`);
                          }}
                        >
                          <MessageCircle size={16} className="mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-2" />
                  </div>
                  <h3 className="text-lg font-medium text-rally-charcoal mb-2">No plans yet</h3>
                  <p className="text-gray-600 mb-4">Tap in to some Rallies to see them here</p>
                  <Button 
                    className="bg-rally-red text-white"
                    onClick={() => setMainTab('feed')}
                  >
                    Explore Feed
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Navbar showAuth={false} />
    </div>
  );
};

export default Dashboard;
