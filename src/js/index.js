import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Ry36IJlc4KjhBd33SOpJhy4XhEGmJ21FETlCDxEyVDNjYiM4Y8tiJB4naNZg7nbx';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('select.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

errorEl.classList.add('visually-hidden');

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(r => {
      breedSelect.classList.add('hidden-select');
      console.log(r);
      if (r.status === 200) {
        loaderEl.classList.add('visually-hidden');
        breedSelect.classList.remove('hidden-select');
        renderListOption(r.data, breedSelect);
        new SlimSelect({
          select: breedSelect,
        });
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      errorEl.classList.remove('visually-hidden');
      loaderEl.classList.add('visually-hidden');
    });
};

fetchBreeds();

const fetchCatByBreed = breedId => {
  const optionEl = document.querySelector('option');
  // console.log(optionEl.value);
  breedId = optionEl.value;
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(r => {
      console.log(r.data);
      loaderEl.classList.remove('visually-hidden');
      catInfoEl.classList.add('visually-hidden');

      setTimeout(() => {
        if (r.status === 200) {
          loaderEl.classList.add('visually-hidden');
          catInfoEl.classList.remove('visually-hidden');
          renderListDataCat(r.data, catInfoEl);
        }
      }, 1000);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      // errorEl.classList.remove('visually-hidden');
      loaderEl.classList.add('visually-hidden');
    });
};
breedSelect.addEventListener('change', fetchCatByBreed);

const renderListOption = (arr, container) => {
  const markup = arr
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
  container.innerHTML = markup;
};

const renderListDataCat = (arr, container) => {
  const markup = arr
    .map(
      item => `
  <img src="${item.url}" alt="${item.breeds[0].name}" width="300" />
<div class="cat-info-text">
  <h2>${item.breeds[0].name}</h2>
  <p>${item.breeds[0].description}</p>
  <p> <b>Temperament:</b> ${item.breeds[0].temperament}</p>
</div>
  `
    )
    .join('');
  container.innerHTML = markup;
};
