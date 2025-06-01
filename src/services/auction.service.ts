import {
  CreateAuctionInput,
  UpdateAuctionInput,
  AuctionFormInput,
  Auction,
  createAuctionSchema,
  updateAuctionSchema,
  auctionFormSchema,
} from '@/schemas';

export class AuctionService {
  /**
   * Valida y transforma datos del formulario a formato de creación
   */
  static validateAndTransformFormData(
    formData: AuctionFormInput
  ): CreateAuctionInput {
    const validatedForm = auctionFormSchema.parse(formData);

    const transformedData = {
      make: validatedForm.make.trim(),
      model: validatedForm.model.trim(),
      year: parseInt(validatedForm.year),
      color: validatedForm.color.trim(),
      mileage: parseInt(validatedForm.mileage),
      imageUrl: validatedForm.imageUrl.trim(),
      reservePrice: parseInt(validatedForm.reservePrice),
      auctionEnd: validatedForm.auctionEnd,
    };

    return createAuctionSchema.parse(transformedData);
  }

  /**
   * Valida datos de actualización
   */
  static validateUpdateData(
    updateData: Partial<UpdateAuctionInput>
  ): UpdateAuctionInput {
    return updateAuctionSchema.parse(updateData);
  }

  /**
   * Calcula el tiempo restante de una subasta
   */
  static calculateTimeRemaining(auctionEnd: Date): {
    isExpired: boolean;
    timeRemaining: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
  } {
    const now = new Date();
    const endTime = new Date(auctionEnd);
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        isExpired: true,
        timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      isExpired: false,
      timeRemaining: { days, hours, minutes, seconds },
    };
  }

  /**
   * Determina el estado de urgencia de una subasta
   */
  static getAuctionUrgencyStatus(
    auctionEnd: Date
  ): 'expired' | 'urgent' | 'normal' {
    const { isExpired, timeRemaining } =
      this.calculateTimeRemaining(auctionEnd);

    if (isExpired) return 'expired';

    const totalHours = timeRemaining.days * 24 + timeRemaining.hours;
    return totalHours < 6 ? 'urgent' : 'normal';
  }

  /**
   * Formatea el precio para mostrar
   */
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  /**
   * Formatea el kilometraje
   */
  static formatMileage(mileage: number): string {
    return `${mileage.toLocaleString()} km`;
  }

  /**
   * Obtiene la fecha mínima para el fin de subasta
   */
  static getMinAuctionEndDate(): Date {
    const now = new Date();
    const minEndDate = new Date(now);
    minEndDate.setHours(now.getHours() + 24);
    return minEndDate;
  }

  /**
   * Valida si una imagen URL es válida
   */
  static isValidImageUrl(url: string): boolean {
    const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
    return imageRegex.test(url);
  }

  /**
   * Genera un slug para SEO a partir de los datos de la subasta
   */
  static generateAuctionSlug(auction: Auction): string {
    return `${auction.year}-${auction.make}-${auction.model}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  /**
   * Filtra y ordena subastas según parámetros
   */
  static processAuctionList(
    auctions: Auction[],
    filters: {
      searchTerm?: string;
      filterBy?: string;
      orderBy?: string;
    }
  ): Auction[] {
    let filtered = [...auctions];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        auction =>
          auction.make.toLowerCase().includes(searchLower) ||
          auction.model.toLowerCase().includes(searchLower) ||
          auction.color.toLowerCase().includes(searchLower)
      );
    }

    if (filters.filterBy) {
      switch (filters.filterBy) {
        case 'live':
          filtered = filtered.filter(
            auction =>
              this.getAuctionUrgencyStatus(auction.auctionEnd) !== 'expired'
          );
          break;
        case 'endingSoon':
          filtered = filtered.filter(
            auction =>
              this.getAuctionUrgencyStatus(auction.auctionEnd) === 'urgent'
          );
          break;
        case 'finished':
          filtered = filtered.filter(
            auction =>
              this.getAuctionUrgencyStatus(auction.auctionEnd) === 'expired'
          );
          break;
      }
    }

    if (filters.orderBy) {
      switch (filters.orderBy) {
        case 'make':
          filtered.sort((a, b) => a.make.localeCompare(b.make));
          break;
        case 'endingSoon':
          filtered.sort(
            (a, b) =>
              new Date(a.auctionEnd).getTime() -
              new Date(b.auctionEnd).getTime()
          );
          break;
        case 'new':
          filtered.sort((a, b) => b.year - a.year);
          break;
        default:
          break;
      }
    }

    return filtered;
  }
}
