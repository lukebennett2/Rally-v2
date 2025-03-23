
import { CalendarDays, Clock, MapPin, Users, LogOut, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CatAvatar from './CatAvatar';

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
}

export interface RallyCardProps {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
  };
  coHost?: {
    name: string;
    avatar: string;
  };
  time: string;
  date: string;
  location?: string;
  vibe?: string;
  attendeeCount: number;
  maxAttendees: number;
  description?: string;
  isTappedIn?: boolean;
  attendees?: Attendee[];
  onTapIn?: (id: string) => void;
  onTapOut?: (id: string) => void;
  image?: string;
  gradient?: string;
  isFeatured?: boolean;
}

const RallyCard = ({
  id,
  title,
  host,
  coHost,
  time,
  date,
  location,
  vibe,
  attendeeCount,
  maxAttendees,
  attendees = [],
  isTappedIn = false,
  onTapIn,
  onTapOut,
  image,
  isFeatured = false
}: RallyCardProps) => {
  const navigate = useNavigate();
  
  const handleTapIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTapIn) {
      onTapIn(id);
    }
  };
  
  const handleTapOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTapOut) {
      onTapOut(id);
    }
  };
  
  const handleCardClick = () => {
    navigate(`/rally/${id}`);
  };

  // If no attendees list is provided, create one with host and cohosts
  const displayAttendees = attendees.length > 0 
    ? attendees 
    : [
        { id: 'host', name: host.name, avatar: host.avatar },
        ...(coHost ? [{ id: 'cohost', name: coHost.name, avatar: coHost.avatar }] : []),
      ];

  // Limit to show only first few attendees
  const MAX_AVATARS_TO_SHOW = 3;
  const visibleAttendees = displayAttendees.slice(0, MAX_AVATARS_TO_SHOW);
  const remainingCount = attendeeCount - visibleAttendees.length;

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer border border-gray-100"
      onClick={handleCardClick}
    >
      {image && (
        <div className="w-full h-36">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {isFeatured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium mr-1">
                  <Star size={12} className="mr-1" />
                  Featured
                </span>
              )}
              {vibe && (
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {vibe}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-rally-charcoal">{title}</h3>
            <div className="flex items-center mt-2">
              <CatAvatar 
                src={host.avatar} 
                name={host.name} 
                size="sm" 
                className="mr-2" 
              />
              <span className="text-sm text-gray-600">{host.name}</span>
              
              {coHost && (
                <>
                  <span className="mx-1 text-gray-400">·</span>
                  <CatAvatar 
                    src={coHost.avatar} 
                    name={coHost.name} 
                    size="sm"
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-600">{coHost.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays size={16} className="mr-1 text-gray-500" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1 text-gray-500" />
            <span>{time}</span>
          </div>
          
          {location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1 text-gray-500" />
              <span>{location}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {visibleAttendees.map((attendee) => (
                <CatAvatar 
                  key={attendee.id} 
                  src={attendee.avatar} 
                  name={attendee.name}
                  size="sm"
                  className="border-2 border-white" 
                />
              ))}
              
              {remainingCount > 0 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs ml-1 border-2 border-white">
                  +{remainingCount}
                </div>
              )}
            </div>
          </div>
          
          {!isTappedIn ? (
            <Button
              onClick={handleTapIn}
              className="bg-rally-red hover:bg-rally-red/90 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              Tap In
            </Button>
          ) : (
            <div className="flex flex-col items-end space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                className="bg-green-500 hover:bg-green-500 cursor-default text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                You're In
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-full py-1 px-3"
                onClick={handleTapOut}
              >
                <LogOut size={14} className="mr-1" />
                Tap Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RallyCard;
