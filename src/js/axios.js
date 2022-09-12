import axios from 'axios';
const API_KEY = '29835718-26922d24f630fa7bc28f878c3';
const URL = 'https://pixabay.com/api/';

export default class Axios {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
    this.totalHits = 0;
  }

  async fetchImage() {
    try {
      const config = {
        params: {
          key: API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      };
      const url = `${URL}`;
      const response = await axios.get(url, config);
      const data = await response.data;

      this.page += 1;
      this.totalHits = response.data.totalHits;

      return data;
    } catch (error) {
      console.log('~ error', error);
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
