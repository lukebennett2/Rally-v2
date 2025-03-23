
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import { ArrowLeft, CalendarDays, Clock, MapPin, CalendarIcon, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_RALLIES } from '@/data/mockData';
import { format, isToday, isTomorrow, addDays, isSameDay } from "date-fns";
import CatAvatar from '@/components/CatAvatar';

// Helper function to group rallies by date
const groupRalliesByDate = (rallies, selectedDate) => {
  // Filter rallies by the selected date (simulated for demo)
  return {
    today: rallies.filter((_, index) => index % 3 === 0),
    tomorrow: rallies.filter((_, index) => index % 3 === 1),
    thisWeek: rallies.filter((_, index) => index % 3 === 2)
  };
};

const CalendarView = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week">("week");
  
  // Get rallies that the user has tapped into from localStorage
  const userTappedInIds = localStorage.getItem('tappedInRallies');
  const tappedInIds = userTappedInIds ? JSON.parse(userTappedInIds) as string[] : [];
  const userRallies = MOCK_RALLIES.filter(rally => tappedInIds.includes(rally.id));
  
  // Group rallies by date
  const groupedRallies = groupRalliesByDate(userRallies, date);
  
  // Format date display
  const formattedDate = format(date, 'MMMM yyyy');
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };
  
  const handleRallyClick = (id: string) => {
    navigate(`/rally/${id}`);
  };
  
  const renderRallyCard = (rally) => (
    <div 
      key={rally.id}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleRallyClick(rally.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-rally-charcoal">{rally.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Clock size={14} className="mr-1" />
            <span>{rally.time}</span>
            
            {rally.location && (
              <>
                <span className="mx-1">•</span>
                <MapPin size={14} className="mr-1" />
                <span>{rally.location}</span>
              </>
            )}
          </div>
        </div>
        
        {rally.vibe && (
          <Badge variant="outline" className="bg-gray-50">
            {rally.vibe}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center mt-3">
        <div className="flex -space-x-2">
          <CatAvatar 
            src={rally.host.avatar} 
            name={rally.host.name} 
            size="sm" 
            className="border-2 border-white" 
          />
          
          {rally.coHost && (
            <CatAvatar 
              src={rally.coHost.avatar} 
              name={rally.coHost.name} 
              size="sm" 
              className="border-2 border-white" 
            />
          )}
          
          {rally.attendeeCount > 2 && (
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs border-2 border-white">
              +{rally.attendeeCount - 2}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const DateHeading = ({ text, count }) => (
    <div className="flex items-center justify-between mb-2 sticky top-0 bg-white z-10 py-2">
      <h2 className="text-lg font-semibold text-rally-charcoal">{text}</h2>
      {count > 0 && (
        <Badge variant="outline" className="bg-gray-50">
          {count} {count === 1 ? 'event' : 'events'}
        </Badge>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="pt-4 px-4 max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 text-rally-charcoal"
          onClick={handleGoBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Dashboard
        </Button>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-rally-charcoal">Calendar</h1>
        </div>
        
        <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center mb-2">
            <h2 className="text-lg font-medium text-rally-charcoal">{formattedDate}</h2>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border-0"
            showOutsideDays={true}
          />
        </div>
        
        <div className="space-y-6">
          {/* Today's section */}
          {groupedRallies.today.length > 0 && (
            <div>
              <DateHeading text="Today" count={groupedRallies.today.length} />
              <div className="space-y-3">
                {groupedRallies.today.map(rally => renderRallyCard(rally))}
              </div>
            </div>
          )}
          
          {/* Tomorrow's section */}
          {groupedRallies.tomorrow.length > 0 && (
            <div>
              <DateHeading text="Tomorrow" count={groupedRallies.tomorrow.length} />
              <div className="space-y-3">
                {groupedRallies.tomorrow.map(rally => renderRallyCard(rally))}
              </div>
            </div>
          )}
          
          {/* This week's section */}
          {groupedRallies.thisWeek.length > 0 && (
            <div>
              <DateHeading text="This Week" count={groupedRallies.thisWeek.length} />
              <div className="space-y-3">
                {groupedRallies.thisWeek.map(rally => renderRallyCard(rally))}
              </div>
            </div>
          )}
          
          {/* No events message */}
          {Object.values(groupedRallies).every(group => group.length === 0) && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <CalendarIcon size={48} className="mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium text-rally-charcoal mb-1">No plans on this day</h3>
              <p className="text-gray-600 mb-4">Tap in to some Rallies to see them here</p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-rally-red text-white hover:bg-rally-red/90"
              >
                Explore Feed
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Coming Up</h2>
            <Button variant="ghost" size="sm" className="text-rally-red" onClick={() => navigate('/dashboard')}>
              See All <ChevronRight size={16} />
            </Button>
          </div>
          
          {userRallies.slice(0, 2).map(rally => renderRallyCard(rally))}
          
          {userRallies.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No upcoming plans</p>
            </div>
          )}
        </div>
      </div>
      
      <Navbar showAuth={false} />
    </div>
  );
};

export default CalendarView;
