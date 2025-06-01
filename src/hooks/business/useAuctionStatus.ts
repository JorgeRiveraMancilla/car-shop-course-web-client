import { useMemo } from 'react';
import { AuctionService } from '@/services';
import { Auction } from '@/schemas';

export const useAuctionStatus = (auction: Auction) => {
  return useMemo(() => {
    const timeRemaining = AuctionService.calculateTimeRemaining(
      auction.auctionEnd
    );
    const urgencyStatus = AuctionService.getAuctionUrgencyStatus(
      auction.auctionEnd
    );
    const formattedPrice = AuctionService.formatPrice(auction.reservePrice);
    const formattedMileage = AuctionService.formatMileage(auction.mileage);
    const slug = AuctionService.generateAuctionSlug(auction);

    return {
      timeRemaining,
      urgencyStatus,
      formattedPrice,
      formattedMileage,
      slug,
      isExpired: timeRemaining.isExpired,
      isUrgent: urgencyStatus === 'urgent',
    };
  }, [auction]);
};
