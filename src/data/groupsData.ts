
export interface Group {
  id: string;
  name: string;
  emoji: string;
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

// Mock groups data
export const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Friday Night Crew',
    emoji: '🍻',
    members: [
      { id: 'f1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=100&auto=format' },
      { id: 'f2', name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format' },
      { id: 'f4', name: 'Casey Wong', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format' },
    ]
  },
  {
    id: 'g2',
    name: 'Runners',
    emoji: '🏃',
    members: [
      { id: 'f3', name: 'Morgan Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format' },
      { id: 'f5', name: 'Robin Patel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format' },
    ]
  },
  {
    id: 'g3',
    name: 'Brunch Squad',
    emoji: '🥂',
    members: [
      { id: 'f1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=100&auto=format' },
      { id: 'f2', name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format' },
      { id: 'f5', name: 'Robin Patel', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format' },
    ]
  }
];
