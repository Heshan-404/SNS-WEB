import { useState, useEffect } from 'react';
import { UploadedImageDto } from '@/types/image';

interface UseManageableImagePreviewProps {
  images: UploadedImageDto[];
}

export const useManageableImagePreview = ({ images }: UseManageableImagePreviewProps) => {
  const [selectedMainImage, setSelectedMainImage] = useState<UploadedImageDto | undefined>(
    images.find((img) => img.isMain) || images[0],
  );

  // Update selectedMainImage if the main image changes or is removed
  useEffect(() => {
    setSelectedMainImage(images.find((img) => img.isMain) || images[0]);
  }, [images]);

  const subImages = images.filter((img) => img.url !== selectedMainImage?.url);

  return {
    selectedMainImage,
    setSelectedMainImage,
    subImages,
  };
};
