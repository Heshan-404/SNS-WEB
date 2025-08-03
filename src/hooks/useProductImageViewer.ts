import { useState } from 'react';
import { UploadedImageDto } from '@/types/image';

interface UseProductImageViewerProps {
  images: UploadedImageDto[];
}

export const useProductImageViewer = ({ images }: UseProductImageViewerProps) => {
  const mainImage = images.find((img) => img.isMain) || images[0];
  const subImages = images.filter((img) => img.url !== mainImage?.url).slice(0, 3);

  const [selectedMainImage, setSelectedMainImage] = useState<UploadedImageDto | undefined>(
    mainImage,
  );

  return {
    selectedMainImage,
    setSelectedMainImage,
    subImages,
  };
};
