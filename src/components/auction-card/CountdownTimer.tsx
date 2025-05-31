'use client';

import { cn } from '@/libs/utils';
import Countdown, { zeroPad } from 'react-countdown';

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const totalHours = days * 24 + hours;

  const getStatusColor = () => {
    switch (true) {
      case completed:
        return 'bg-red-500';
      case totalHours < 6:
        return 'bg-amber-500';
      default:
        return 'bg-green-500';
    }
  };

  const getStatusText = () => {
    if (completed) return <span>Terminado</span>;
    else
      return (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
  };

  return (
    <div
      className={cn(
        'border border-white text-white py-1 px-3 rounded-lg flex justify-center text-sm shadow-md backdrop-blur-sm',
        getStatusColor()
      )}
    >
      {getStatusText()}
    </div>
  );
};

type Props = {
  auctionEnd: string;
};

export default function CountdownTimer({ auctionEnd }: Props) {
  return <Countdown date={auctionEnd} renderer={renderer} />;
}
