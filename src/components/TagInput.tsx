"use client";

import React, { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ label, placeholder, tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault(); // Prevent form submission
      setTags(prevTags => {
        const newTag = inputValue.trim();
        if (!prevTags.includes(newTag)) {
          return [...prevTags, newTag];
        }
        return prevTags;
      });
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={label.toLowerCase().replace(/\s/g, '')}>{label}</Label>
      <Input
        id={label.toLowerCase().replace(/\s/g, '')}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
            {tag}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setTags(prevTags => prevTags.filter(t => t !== tag))} />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
