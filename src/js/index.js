import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('select.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

errorEl.classList.add('visually-hidden');
breedSelect.classList.add('hidden-select');

fetchBreeds()
  .then(r => {
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

    loaderEl.classList.add('visually-hidden');
  });

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

breedSelect.addEventListener('change', e => {
  // console.dir(e.target.value);
  const breedId = e.target.value;
  loaderEl.classList.remove('visually-hidden');

  fetchCatByBreed(breedId)
    .then(r => {
      // console.log(r);
      setTimeout(() => {
        if (r.status === 200) {
          loaderEl.classList.add('visually-hidden');
          catInfoEl.classList.remove('visually-hidden');
          renderListDataCat(r.data, catInfoEl);
        }
      }, 300);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    );
});
