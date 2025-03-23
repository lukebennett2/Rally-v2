
import { useState, useEffect } from 'react';
import { Sofa, Sparkles, DoorOpen, Cloud } from 'lucide-react';

// Empty state messages that will rotate
const EMPTY_MESSAGES = [
  "No tap-ins yet, but vibes take time. You've put it out there.",
  "You've started something. Let's see who shows up.",
  "No pressure. Sometimes the best hangs start slow.",
  "Nothing yet 👀 but that could change fast."
];

// Different illustrations to show
const ILLUSTRATIONS = [
  { icon: Sofa, label: "A cozy sofa waiting for company" },
  { icon: Sparkles, label: "A spark waiting to ignite" },
  { icon: DoorOpen, label: "An open door with warm light" },
  { icon: Cloud, label: "A sparkling cloud of possibility" }
];

interface EmptyRallyStateProps {
  rallyTitle?: string;
}

const EmptyRallyState = ({ rallyTitle }: EmptyRallyStateProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [illustrationIndex, setIllustrationIndex] = useState(0);
  
  // Rotate messages every few seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % EMPTY_MESSAGES.length);
    }, 7000);
    
    return () => clearInterval(messageInterval);
  }, []);
  
  // Get current illustration
  const CurrentIllustration = ILLUSTRATIONS[illustrationIndex].icon;
  
  return (
    <div className="empty-state">
      <div className="h-24 w-24 bg-[#FFE6E1] rounded-full flex items-center justify-center mb-4">
        <CurrentIllustration className="h-12 w-12 text-[#FF6B6B]" />
      </div>
      
      <h3 className="text-lg font-medium text-rally-charcoal mb-2">
        {rallyTitle ? `No tap-ins for "${rallyTitle}" yet` : "No tap-ins yet"}
      </h3>
      
      <p className="text-rally-mediumGray max-w-xs mx-auto">
        {EMPTY_MESSAGES[messageIndex]}
      </p>
    </div>
  );
};

export default EmptyRallyState;
