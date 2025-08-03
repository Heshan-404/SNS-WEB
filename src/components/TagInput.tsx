import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useTagInput } from '@/hooks/useTagInput';

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ label, placeholder, tags, setTags }) => {
  const { inputValue, handleInputChange, handleInputKeyDown, handleRemoveTag } = useTagInput({
    tags,
    setTags,
  });

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
            <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
