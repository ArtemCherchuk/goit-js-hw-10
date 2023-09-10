import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Ry36IJlc4KjhBd33SOpJhy4XhEGmJ21FETlCDxEyVDNjYiM4Y8tiJB4naNZg7nbx';

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(r => {
      return r;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(r => {
      return r;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};
