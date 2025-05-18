export function formatGif(gif: any) {
    return {
      id: gif.id,
      title: gif.title,

      image: {
        original: gif.images.original?.url,
        preview: gif.images.preview_gif?.url,
        webp: gif.images.original?.webp,
      },
    };
  }
  
  export function formatGifList(gifs: any[]) {
    return gifs.map(formatGif);
  }
  