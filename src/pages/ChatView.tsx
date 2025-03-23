
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, Users } from 'lucide-react';
import { RallyCardProps } from '@/components/RallyCard';
import { MOCK_RALLIES } from '@/data/mockData';

interface ChatPreviewProps {
  rally: RallyCardProps;
  onSelect: (id: string) => void;
}

const ChatPreview = ({ rally, onSelect }: ChatPreviewProps) => {
  const handleClick = () => {
    onSelect(rally.id);
  };
  
  return (
    <div 
      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
      onClick={handleClick}
    >
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={rally.host.avatar} alt={rally.title} />
        <AvatarFallback>{rally.title.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-rally-charcoal truncate">{rally.title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="truncate">{rally.date} at {rally.time}</span>
        </div>
      </div>
      
      <div className="flex -space-x-2 ml-4">
        {rally.attendees?.slice(0, 3).map((attendee, index) => (
          <Avatar key={index} className="border-2 border-white h-6 w-6">
            <AvatarImage src={attendee.avatar} alt={attendee.name} />
            <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
        
        {(rally.attendeeCount > 3) && (
          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs border-2 border-white">
            +{rally.attendeeCount - 3}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [rallies, setRallies] = useState<RallyCardProps[]>([]);
  
  useEffect(() => {
    // Get the user's tapped-in rallies from localStorage
    const userTappedInIds = localStorage.getItem('tappedInRallies');
    if (userTappedInIds) {
      const ids = JSON.parse(userTappedInIds) as string[];
      // Filter to only include rallies the user is tapped into
      const userRallies = MOCK_RALLIES.filter(rally => ids.includes(rally.id));
      setRallies(userRallies);
    }
  }, []);
  
  const handleSelectChat = (id: string) => {
    // Navigate directly to chat tab instead of the rally details
    navigate(`/rally/${id}?tab=chat`);
  };
  
  // Filter rallies by search query
  const filteredRallies = rallies.filter(rally => 
    rally.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rally.host.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-4 px-4">
        <h1 className="text-2xl font-bold text-rally-charcoal mb-4">Chats</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search chats..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {filteredRallies.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            {filteredRallies.map(rally => (
              <ChatPreview 
                key={rally.id} 
                rally={rally}
                onSelect={handleSelectChat}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-rally-charcoal mb-2">No chats yet</h3>
            <p className="text-gray-500 mb-4">Tap into some Rallies to start chatting</p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-rally-red text-white"
            >
              <Users size={18} className="mr-2" />
              Find Rallies
            </Button>
          </div>
        )}
      </div>
      
      <Navbar showAuth={false} />
    </div>
  );
};

export default ChatView;
