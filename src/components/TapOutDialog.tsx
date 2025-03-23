
import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface TapOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const TapOutDialog = ({ isOpen, onClose, onConfirm }: TapOutDialogProps) => {
  const [reason, setReason] = useState<string>('busy');
  
  const handleConfirm = () => {
    onConfirm(reason);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Why are you tapping out?</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={reason} onValueChange={setReason} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="busy" id="option-busy" />
              <Label htmlFor="option-busy">Busy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notFeeling" id="option-not-feeling" />
              <Label htmlFor="option-not-feeling">Not feeling it</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="noReason" id="option-no-reason" />
              <Label htmlFor="option-no-reason">No reason</Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-rally-red hover:bg-rally-red/90">
            <Check size={16} className="mr-2" />
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TapOutDialog;
