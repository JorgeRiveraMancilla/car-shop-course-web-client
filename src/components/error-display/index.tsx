import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorDisplayProps } from './types';

const ErrorDisplay = ({
  title = 'Error',
  message,
  onRetry,
  retryText = 'Intentar nuevamente',
  variant = 'card',
  className = '',
}: ErrorDisplayProps) => {
  const content = (
    <>
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <h3 className="text-lg font-semibold text-red-600">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          {retryText}
        </Button>
      )}
    </>
  );

  if (variant === 'inline') {
    return (
      <div
        className={`p-4 border border-red-200 rounded-lg bg-red-50 ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="text-red-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {retryText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
