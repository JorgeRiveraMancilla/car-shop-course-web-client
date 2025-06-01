import { Loader2 } from 'lucide-react';
import { LoadingProps } from './types';

const Loading = ({
  size = 'md',
  text,
  className = '',
  variant = 'default',
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const variantClasses = {
    default: 'text-blue-600',
    muted: 'text-gray-400',
    white: 'text-white',
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <Loader2
        className={`${sizeClasses[size]} ${variantClasses[variant]} animate-spin`}
      />
      {text && <p className="text-gray-600 text-center">{text}</p>}
    </div>
  );
};

export default Loading;
