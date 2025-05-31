'use client';

import Image from 'next/image';
import { useState } from 'react';

type TCarImageProps = {
  imageUrl: string;
};

export default function CarImage({ imageUrl }: TCarImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-gray-200 aspect-video relative">
      <Image
        src={imageUrl}
        alt="Car Image"
        fill
        priority
        className={`
          object-cover duration-700 ease-in-out
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
