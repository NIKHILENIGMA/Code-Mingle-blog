import axios from "axios";


const unsplashAccessKey: string = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;


const unsplashApi = axios.create({
  baseURL: `https://api.unsplash.com`,
});

/**
 api.unsplash.com/search/photos?page=1&query=office&client_id=${unsplashAccessKey}
 * 
 */

export default {
  async searchPhotos(query: string) {
    try {
      const response = await unsplashApi.get(
        `/search/photos?page=1&query=${query}&client_id=${unsplashAccessKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getCoverPhoto(search: string) {
    try {
      const response = await unsplashApi.get(
        `/search/photos?page=1&query=${search}&client_id=${unsplashAccessKey}`
      );
      return response.data.results[0];
    } catch (error) {
      console.error(error);
    }
  }
};
