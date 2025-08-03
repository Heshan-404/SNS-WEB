export interface UploadedImageDto {
  url: string;
  isMain: boolean;
  name: string;
  size: number;
  type: string;
}

export interface ImageUploadResponse {
  url: string;
  pathname: string;
  contentType: string;
}
