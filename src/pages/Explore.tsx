import { useState } from 'react';
import Navbar from '@/components/Navbar';
import RallyCard, { RallyCardProps } from '@/components/RallyCard';
import CreateRallyButton from '@/components/CreateRallyButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Compass, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';

const FEATURED_EVENTS: RallyCardProps[] = [
  {
    id: 'f1',
    title: 'Sunday Farmer\'s Market',
    host: {
      name: 'Local Vendors',
      avatar: '/lovable-uploads/fd402f1f-46d3-449e-b571-f95ecc020027.png'
    },
    date: 'Sunday',
    time: '9:00 AM - 2:00 PM',
    location: 'Downtown Square',
    vibe: 'Market',
    attendeeCount: 45,
    maxAttendees: 200,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1594350474536-86d06f8a5524?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'f2',
    title: 'Live Jazz Night',
    host: {
      name: 'City Arts Collective',
      avatar: '/lovable-uploads/fd402f1f-46d3-449e-b571-f95ecc020027.png'
    },
    date: 'Friday',
    time: '8:00 PM - 11:00 PM',
    location: 'Blue Note Bar',
    vibe: 'Music',
    attendeeCount: 28,
    maxAttendees: 75,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'f3',
    title: 'Weekend Hiking Trip',
    host: {
      name: 'Outdoor Adventure Group',
      avatar: '/lovable-uploads/fd402f1f-46d3-449e-b571-f95ecc020027.png'
    },
    date: 'Saturday',
    time: '7:00 AM - 3:00 PM',
    location: 'Red Rock Trail',
    vibe: 'Outdoor',
    attendeeCount: 12,
    maxAttendees: 20,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: 'f4',
    title: 'Yoga in the Park',
    host: {
      name: 'Mindful Movement',
      avatar: '/lovable-uploads/fd402f1f-46d3-449e-b571-f95ecc020027.png'
    },
    date: 'Wednesday',
    time: '6:00 PM - 7:00 PM',
    location: 'Central Park',
    vibe: 'Fitness',
    attendeeCount: 15,
    maxAttendees: 30,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3'
  }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<RallyCardProps[]>(FEATURED_EVENTS);
  
  const handleTapIn = (id: string) => {
    const event = events.find(e => e.id === id);
    if (!event) return;
    
    toast.success("You're in! This event has been added to your plans.", {
      description: "Check the Chat tab to connect with other attendees.",
    });
    
    // Update event locally
    setEvents(events.map(e => 
      e.id === id ? { ...e, attendeeCount: e.attendeeCount + 1, isTappedIn: true } : e
    ));
    
    // Save to localStorage for persistence
    const existingIds = localStorage.getItem('tappedInRallies');
    const idsArray = existingIds ? JSON.parse(existingIds) as string[] : [];
    localStorage.setItem('tappedInRallies', JSON.stringify([...idsArray, id]));
  };
  
  // Filter events by search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.vibe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-4 px-4 pb-2">
        <h1 className="text-2xl font-bold text-rally-charcoal mb-4">Explore</h1>
        <p className="text-gray-600 mb-6">Discover featured events and activities in your area</p>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <RallyCard
                key={event.id}
                {...event}
                onTapIn={handleTapIn}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Compass size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-rally-charcoal mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or check back later</p>
          </div>
        )}
      </div>
      
      <Navbar showAuth={false} />
      <CreateRallyButton />
    </div>
  );
};

export default Explore;
