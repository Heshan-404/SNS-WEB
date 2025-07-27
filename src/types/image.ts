export interface UploadedImageDto {
  url: string;
  isMain: boolean;
}

export interface ImageUploadResponse {
  url: string;
  pathname: string;
  contentType: string;
}
