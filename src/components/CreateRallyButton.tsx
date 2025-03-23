
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateRallyButton = () => {
  const navigate = useNavigate();

  const handleStartRally = () => {
    navigate('/start-rally');
  };

  return (
    <Button
      onClick={handleStartRally}
      className="bg-rally-red hover:bg-rally-red/90 text-white"
      aria-label="Start a Rally"
    >
      <Plus size={20} className="mr-2" />
      Start a Rally
    </Button>
  );
};

export default CreateRallyButton;
