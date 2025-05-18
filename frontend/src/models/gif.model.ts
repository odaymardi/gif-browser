interface GifImageFormats {
  original?: string;
  preview?: string;
  webp?: string;
}

export interface Gif {
  id: string;
  title: string;
  image: GifImageFormats;
}
  