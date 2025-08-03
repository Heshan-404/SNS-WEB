export interface UploadedImageDto {
  url: string;
  isMain: boolean;
  name: string;
  size: number;
  type: string;
  file?: File; // Optional: for newly selected files before upload
}

export interface ImageUploadResponse {
  url: string;
  pathname: string;
  contentType: string;
}
