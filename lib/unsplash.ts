import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export async function getAttractionPhoto(searchQuery: string) {
  try {
    const result = await unsplash.search.getPhotos({
      query: searchQuery,
      perPage: 1,
      orientation: 'landscape',
    });
    
    if (result.response?.results[0]) {
      const photo = result.response.results[0];
      return {
        url: photo.urls.regular,
        photographer: photo.user.name
      };
    }
  } catch (error) {
    console.error('Error fetching Unsplash photo:', error);
  }
  
  return {
    url: '/images/placeholder.jpg',
    photographer: null
  };
}
