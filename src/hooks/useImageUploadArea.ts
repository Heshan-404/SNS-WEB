import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UseImageUploadAreaProps {
  onImageUpload: (files: File[]) => void;
  currentImageCount: number;
}

export const useImageUploadArea = ({
  onImageUpload,
  currentImageCount,
}: UseImageUploadAreaProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = 4 - currentImageCount;
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      setFiles((prevFiles) => [...prevFiles, ...filesToUpload]);
      onImageUpload(filesToUpload);
    },
    [onImageUpload, currentImageCount],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
    },
    disabled: currentImageCount >= 4,
  });

  const isDisabled = currentImageCount >= 4;

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDisabled,
  };
};
