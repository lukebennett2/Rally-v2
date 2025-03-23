
import { RallyCardProps } from '@/components/RallyCard';

// Mock friends data
export const MOCK_FRIENDS = [
  { id: 'f1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=100&auto=format' },
  { id: 'f2', name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format' },
  { id: 'f3', name: 'Morgan Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format' },
  { id: 'f4', name: 'Casey Wong', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format' },
  { id: 'f5', name: 'Robin Patel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format' },
];

// Mock data for the dashboard
export const MOCK_RALLIES: RallyCardProps[] = [
  {
    id: '1',
    title: 'Coffee & Catch-up',
    host: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=100&auto=format',
    },
    time: '3:00 PM - 5:00 PM',
    date: 'Today',
    location: 'Ritual Coffee, Mission',
    vibe: 'Chill',
    attendeeCount: 2,
    maxAttendees: 5,
    description: 'Let\'s catch up over coffee and chat about what\'s new! Casual vibes only.',
    attendees: [
      { id: 'a1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=100&auto=format' },
      { id: 'a2', name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format' }
    ]
  },
  {
    id: '2',
    title: 'Drinks after work',
    host: {
      name: 'Jordan Lee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format',
    },
    coHost: {
      name: 'Taylor Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format',
    },
    time: '6:30 PM - 9:00 PM',
    date: 'Today',
    location: 'The Alchemist Bar',
    vibe: 'Social',
    attendeeCount: 3,
    maxAttendees: 6,
    description: 'Unwinding after a long day with some drinks and good company. Join us!',
    attendees: [
      { id: 'a3', name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format' },
      { id: 'a4', name: 'Taylor Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format' },
      { id: 'a5', name: 'Morgan Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format' }
    ]
  },
  {
    id: '3',
    title: 'Weekend hike',
    host: {
      name: 'Sam Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format',
    },
    time: '9:00 AM - 1:00 PM',
    date: 'Saturday',
    location: 'Twin Peaks Trail',
    vibe: 'Active',
    attendeeCount: 4,
    maxAttendees: 8,
    description: 'Moderate 4-mile hike with beautiful views. Bring water and comfortable shoes!',
    attendees: [
      { id: 'a6', name: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format' },
      { id: 'a7', name: 'Casey Wong', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format' },
      { id: 'a8', name: 'Robin Patel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format' },
      { id: 'a9', name: 'Charlie Diaz', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format' }
    ]
  },
  {
    id: '4',
    title: 'Board game night',
    host: {
      name: 'Riley Johnson',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format',
    },
    time: '7:00 PM - 10:00 PM',
    date: 'Tomorrow',
    location: 'Riley\'s Place',
    vibe: 'Fun',
    attendeeCount: 5,
    maxAttendees: 8,
    description: 'Bringing out the classics and some new games too. Snacks provided!',
    attendees: [
      { id: 'a10', name: 'Riley Johnson', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format' },
      { id: 'a11', name: 'Avery Khan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format' },
      { id: 'a12', name: 'Morgan Wu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format' },
      { id: 'a13', name: 'Jessie Park', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format' },
      { id: 'a14', name: 'Cameron Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format' }
    ]
  },
];
