
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Pin } from 'lucide-react';
import { RallyCardProps } from './RallyCard';

interface RallyChatProps {
  rally: RallyCardProps;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: Date;
}

const RallyChat = ({ rally }: RallyChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: rally.host.name,
      senderName: rally.host.name,
      senderAvatar: rally.host.avatar || '/placeholder.svg',
      text: `Hey everyone! Looking forward to ${rally.title}!`,
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: 'm2',
      senderId: rally.attendees[1]?.id || 'a2',
      senderName: rally.attendees[1]?.name || 'Attendee',
      senderAvatar: rally.attendees[1]?.avatar || '/placeholder.svg',
      text: "I'm excited! See you all there!",
      timestamp: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: `m${messages.length + 1}`,
      senderId: 'currentUser',
      senderName: 'You',
      senderAvatar: '/placeholder.svg',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full">
      <Card className="mb-4 bg-rally-lightGray/30 border-none">
        <CardContent className="p-3">
          <div className="flex items-center text-rally-charcoal">
            <Pin size={16} className="mr-2 text-rally-red" />
            <div className="text-sm">
              <span className="font-medium">{rally.title}</span>
              <span className="mx-1">•</span>
              <span>{rally.date} at {rally.time}</span>
              {rally.location && (
                <>
                  <span className="mx-1">•</span>
                  <span>{rally.location}</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.senderName === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            {message.senderName !== 'You' && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            
            <div>
              {message.senderName !== 'You' && (
                <div className="text-xs text-rally-mediumGray mb-1">{message.senderName}</div>
              )}
              
              <div className="flex items-end">
                <div 
                  className={`rounded-2xl px-4 py-2 max-w-[75%] break-words ${
                    message.senderName === 'You' 
                      ? 'bg-rally-red text-white rounded-tr-none'
                      : 'bg-rally-lightGray text-rally-charcoal rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-rally-mediumGray mx-2">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="relative">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-12 py-6 rally-input"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-rally-red text-white"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default RallyChat;
