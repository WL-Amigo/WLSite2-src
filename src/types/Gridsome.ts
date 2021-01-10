interface ImageSize {
  width: number;
  height: number;
}

export interface GridsomeImage {
  type: 'image';
  mimeType: string;
  src: string;
  size: ImageSize;
  sizes: string;
  srcset: string[];
  dataUri: string;
}
