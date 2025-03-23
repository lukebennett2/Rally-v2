
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, X, Check, Users, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { MOCK_GROUPS, Group } from '@/data/groupsData';
import { MOCK_FRIENDS } from '@/data/mockData';

const EMOJI_LIST = ['🍻', '🏃', '🥂', '🎮', '🎬', '🎵', '🍔', '⚽️', '🧘', '🏖️', '🏔️', '🧠'];

const GroupManagement = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [selectedEmoji, setSelectedEmoji] = useState('🍻');
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };
  
  const filteredFriends = MOCK_FRIENDS.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleMemberSelection = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };
  
  const createNewGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member");
      return;
    }
    
    const newGroup: Group = {
      id: `g${groups.length + 1}`,
      name: newGroupName,
      emoji: selectedEmoji,
      members: selectedMembers.map(id => {
        const friend = MOCK_FRIENDS.find(f => f.id === id);
        return {
          id,
          name: friend?.name || '',
          avatar: friend?.avatar || ''
        };
      })
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setSelectedEmoji('🍻');
    setSelectedMembers([]);
    setShowNewGroupDialog(false);
    
    toast.success("Group created!", {
      description: `${newGroupName} has been added to your groups.`
    });
  };
  
  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast.success("Group deleted");
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar showAuth={false} />
      
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 text-rally-charcoal"
          onClick={handleGoBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </Button>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-rally-charcoal">My Groups</h1>
          
          <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
            <DialogTrigger asChild>
              <Button className="bg-rally-red hover:bg-rally-red/90 text-white rounded-full">
                <Plus size={18} className="mr-1" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rally-darkGray">Group Name</label>
                  <Input
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Friday Night Crew, Runners, etc."
                    className="rally-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rally-darkGray">Choose an Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJI_LIST.map((emoji) => (
                      <Button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`rounded-full text-xl h-10 w-10 p-0 ${
                          selectedEmoji === emoji
                            ? 'bg-rally-red text-white'
                            : 'bg-rally-lightGray text-rally-charcoal'
                        }`}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-rally-darkGray">Add Members</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rally-mediumGray" size={16} />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search friends..."
                      className="rally-input pl-10"
                    />
                  </div>
                  
                  {selectedMembers.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-3">
                      {selectedMembers.map(id => {
                        const friend = MOCK_FRIENDS.find(f => f.id === id);
                        return (
                          <div 
                            key={id} 
                            className="flex items-center bg-rally-lightGray/50 rounded-full pl-1 pr-2 py-1"
                          >
                            <Avatar className="h-6 w-6 mr-1">
                              <AvatarImage src={friend?.avatar} alt={friend?.name} />
                              <AvatarFallback>{friend?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-rally-charcoal mr-1">{friend?.name}</span>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0" 
                              onClick={() => toggleMemberSelection(id)}
                            >
                              <X size={12} className="text-rally-mediumGray" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="max-h-48 overflow-y-auto mt-2 border rounded-md border-rally-lightGray">
                    {filteredFriends.length > 0 ? (
                      filteredFriends.map(friend => (
                        <div 
                          key={friend.id}
                          className="flex items-center justify-between p-2 hover:bg-rally-lightGray/50 cursor-pointer"
                          onClick={() => toggleMemberSelection(friend.id)}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-rally-charcoal">{friend.name}</span>
                          </div>
                          
                          {selectedMembers.includes(friend.id) ? (
                            <Check size={18} className="text-rally-red" />
                          ) : (
                            <Plus size={18} className="text-rally-mediumGray" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-rally-mediumGray">
                        No friends found
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={createNewGroup} 
                  className="w-full bg-rally-red hover:bg-rally-red/90 text-white"
                >
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {groups.map(group => (
            <Card key={group.id} className="border border-rally-lightGray">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-2xl">{group.emoji}</div>
                    <div>
                      <h3 className="font-medium text-rally-charcoal">{group.name}</h3>
                      <div className="text-sm text-rally-mediumGray">{group.members.length} members</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      className="text-rally-red h-8 px-2" 
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {group.members.slice(0, 5).map(member => (
                      <Avatar key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    
                    {group.members.length > 5 && (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-rally-lightGray text-rally-charcoal text-xs ring-2 ring-white">
                        +{group.members.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {groups.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4 text-rally-mediumGray">
                <Users size={48} className="mx-auto mb-2" />
              </div>
              <h3 className="text-lg font-medium text-rally-charcoal mb-2">No groups yet</h3>
              <p className="text-rally-mediumGray mb-4">Create your first group to organize your friends</p>
              <Button 
                className="rally-button-primary"
                onClick={() => setShowNewGroupDialog(true)}
              >
                Create a Group
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupManagement;
