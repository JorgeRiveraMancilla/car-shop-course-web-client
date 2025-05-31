import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginationButtonProps } from './types';

const PaginationButton = ({
  type,
  className,
  onClick,
}: PaginationButtonProps) => {
  if (type === 'previous')
    return (
      <Button
        variant="outline"
        className={`gap-1 pl-2.5 ${className}`}
        onClick={onClick}
      >
        <ChevronLeft className="h-4 w-4" />

        <span>Anterior</span>
      </Button>
    );

  <Button
    variant="outline"
    className={`gap-1 pr-2.5 ${className}`}
    onClick={onClick}
  >
    <span>Siguiente</span>

    <ChevronRight className="h-4 w-4" />
  </Button>;
};

export default PaginationButton;
