'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useImageUploadArea } from '@/hooks/useImageUploadArea';

interface ImageUploadAreaProps {
  onImageUpload: (files: File[]) => void;
  currentImageCount: number;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ onImageUpload, currentImageCount }) => {
  const { getRootProps, getInputProps, isDragActive, isDisabled } = useImageUploadArea({
    onImageUpload,
    currentImageCount,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center ${isDisabled ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 cursor-pointer hover:border-gray-400 transition-colors'}`}
    >
      <input {...getInputProps()} />
      <h3 className="text-lg font-semibold mb-2">Upload New Image</h3>
      {isDisabled ? (
        <p className="text-gray-500">Maximum 4 images uploaded.</p>
      ) : isDragActive ? (
        <p className="text-gray-500">Drop the files here ...</p>
      ) : (
        <p className="text-gray-500">Drag and drop or click to upload</p>
      )}
      <Button type="button" className="mt-4" disabled={isDisabled}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUploadArea;
