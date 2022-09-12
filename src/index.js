import './css/styles.css';
import Notiflix from 'notiflix';
import axios from './js/axios';
import { renderGallery } from './js/renderGallery';
const AxiosApi = new axios();
const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
loadMoreBtn.style.display = 'none';

loadMoreBtn.addEventListener('click', loadMoreImages);
form.addEventListener('submit', searchImage);

async function searchImage(e) {
  try {
    e.preventDefault();
    resetMarkup();
    const keyword = e.currentTarget.elements.searchQuery.value.trim();
    AxiosApi.query = keyword;
    AxiosApi.page = 1;
    AxiosApi.hits = 0;

    e.currentTarget.reset();
    const data = await AxiosApi.fetchImage();

    renderGallery(data);
    loadMoreBtn.style.display = 'block';
    if (!data.hits.length) {
      loadMoreBtn.style.display = 'none';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (data.totalHits <= 41) {
      loadMoreBtn.style.display = 'none';
      return Notiflix.Notify.success(
        `Hooray! We found ${data.totalHits} images.`
      );
    } else {
      return Notiflix.Notify.success(
        `Hooray! We found ${data.totalHits} images.`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function resetMarkup() {
  gallery.innerHTML = '';
}

async function loadMoreImages(e) {
  try {
    AxiosApi.page += 1;
    const data = await AxiosApi.fetchImage();
    if (data.hits.length === 0) {
      loadMoreBtn.style.display = 'none';
      return Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    renderGallery(data);
  } catch (error) {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    console.log(error);
  }
}
