
import { useState, useEffect } from 'react';
import { Flame, MessageCircle, Check, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Messages for Rally creator
const CREATOR_MESSAGES = [
  "Jamie just tapped in. Your hang is happening.",
  "Two friends are in. Let the planning begin.",
  "Your Rally is gaining traction 🔥",
  "It's on. Check the group chat."
];

// Messages for person who tapped in
const JOINER_MESSAGES = [
  "You're in 🔥 Rally up.",
  "Nice one. Let's see who else joins.",
  "Plan locked. Chat's open.",
  "You just joined the vibe."
];

// Auto-messages for the chat
const CHAT_MESSAGES = [
  "This Rally's live 🎉 Start chatting here.",
  "Everyone here tapped in. What's the move?",
  "Plan's locked. Let's make it happen."
];

interface TapInConfirmationProps {
  isCreator?: boolean;
  rallyId?: string;
  onClose?: () => void;
}

const TapInConfirmation = ({ isCreator = false, rallyId, onClose }: TapInConfirmationProps) => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(Math.floor(Math.random() * (isCreator ? CREATOR_MESSAGES.length : JOINER_MESSAGES.length)));
  
  const messages = isCreator ? CREATOR_MESSAGES : JOINER_MESSAGES;
  
  const handleViewChat = () => {
    if (rallyId) {
      navigate(`/rally/${rallyId}?tab=chat`);
    }
    if (onClose) onClose();
  };
  
  const handleClose = () => {
    if (onClose) onClose();
  };
  
  return (
    <div className="p-6 rounded-xl glass-morphism shadow-xl text-center max-w-sm mx-auto">
      <div className="flex justify-center mb-4">
        {isCreator ? (
          <div className="h-16 w-16 rounded-full bg-gradient-red flex items-center justify-center shadow-lg animate-glow">
            <PartyPopper className="h-8 w-8 text-white" />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full bg-gradient-red flex items-center justify-center shadow-lg animate-glow">
            <Flame className="h-8 w-8 text-white" />
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">
        {isCreator ? "Someone tapped in!" : "You're in!"}
      </h3>
      
      <p className="text-white/80 mb-6">
        {messages[messageIndex]}
      </p>
      
      <div className="flex flex-col space-y-3">
        <Button 
          onClick={handleViewChat}
          className="w-full bg-gradient-red hover:opacity-90 text-white rounded-full shadow-md"
        >
          <MessageCircle size={18} className="mr-2" />
          Open Group Chat
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClose}
          className="w-full border-white/20 hover:bg-white/10 text-white rounded-full"
        >
          <Check size={18} className="mr-2" />
          Got it
        </Button>
      </div>
    </div>
  );
};

export default TapInConfirmation;
