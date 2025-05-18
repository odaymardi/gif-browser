import * as giphyService from '../../src/services/giphy.service';
import { axiosInstance } from '../../src/services/giphy.service';
import { cache } from '../../src/utils/cache';

jest.mock('../../src/utils/cache');

describe('Giphy Service', () => {
  const fakeGif = { id: '123', title: 'funny', images: { original: { url: 'x' } } };

  const axiosGetSpy = jest.spyOn(axiosInstance, 'get');

  const cacheGetSpy = jest.spyOn(cache, 'get');
  const cacheSetSpy = jest.spyOn(cache, 'set');

  beforeEach(() => {
    axiosGetSpy.mockReset();
    cacheGetSpy.mockReset();
    cacheSetSpy.mockReset();
  });

  describe('fetchTrendingGifs', () => {
    it('should return cached data if exists', async () => {
      cacheGetSpy.mockReturnValue([fakeGif]);

      const res = await giphyService.fetchTrendingGifs(5, 0);

      expect(res).toEqual([fakeGif]);
      expect(axiosGetSpy).not.toHaveBeenCalled();
    });

    it('should fetch from API and cache the result', async () => {
      cacheGetSpy.mockReturnValue(null);
      axiosGetSpy.mockResolvedValue({ data: { data: [fakeGif] } });

      const res = await giphyService.fetchTrendingGifs(5, 0);

      expect(axiosGetSpy).toHaveBeenCalledWith('/gifs/trending', {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          limit: 5,
          offset: 0,
        },
      });
      expect(cacheSetSpy).toHaveBeenCalledWith('trending-5-0', [fakeGif]);
      expect(res).toEqual([fakeGif]);
    });
  });

  describe('searchGifs', () => {
    it('should return cached result if available', async () => {
      cacheGetSpy.mockReturnValue([fakeGif]);

      const res = await giphyService.searchGifs('cat', 5, 0);

      expect(axiosGetSpy).not.toHaveBeenCalled();
      expect(res).toEqual([fakeGif]);
    });

    it('should call API and cache result if no cache', async () => {
      cacheGetSpy.mockReturnValue(null);
      axiosGetSpy.mockResolvedValue({ data: { data: [fakeGif] } });

      const res = await giphyService.searchGifs('cat', 5, 0);

      expect(axiosGetSpy).toHaveBeenCalledWith('/gifs/search', {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          q: 'cat',
          limit: 5,
          offset: 0,
        },
      });
      expect(cacheSetSpy).toHaveBeenCalledWith('search-cat-5-0', [fakeGif]);
      expect(res).toEqual([fakeGif]);
    });
  });
});
