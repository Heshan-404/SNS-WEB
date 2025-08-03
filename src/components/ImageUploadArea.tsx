"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { UploadedImageDto } from '@/types/image';

interface ImageUploadAreaProps {
  onImageUpload: (files: File[]) => void;
  currentImageCount: number;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ onImageUpload, currentImageCount }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const remainingSlots = 4 - currentImageCount;
    const filesToUpload = acceptedFiles.slice(0, remainingSlots);

    setFiles(prevFiles => [...prevFiles, ...filesToUpload]);
    onImageUpload(filesToUpload);
  }, [onImageUpload, currentImageCount]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
    },
    disabled: currentImageCount >= 4,
  });

  const isDisabled = currentImageCount >= 4;

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
      <Button type="button" className="mt-4" disabled={isDisabled}>Upload</Button>
    </div>
  );
};

export default ImageUploadArea;
