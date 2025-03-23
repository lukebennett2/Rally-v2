
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Cat } from 'lucide-react';

interface CatAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CatAvatar = ({ src, name, size = 'md', className = '' }: CatAvatarProps) => {
  // Define sizes
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };
  
  // Get initials for fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Using a playful cat image as the placeholder
  const catPlaceholder = '/lovable-uploads/fd402f1f-46d3-449e-b571-f95ecc020027.png'; 
  
  return (
    <Avatar className={`${sizeClasses[size]} ${className} border border-gray-200 shadow-sm overflow-hidden`}>
      <AvatarImage 
        src={src || catPlaceholder} 
        alt={name} 
        className="object-cover"
      />
      <AvatarFallback className="bg-gray-100 text-rally-red">
        {src ? getInitials(name) : <Cat className="text-rally-red" />}
      </AvatarFallback>
    </Avatar>
  );
};

export default CatAvatar;
