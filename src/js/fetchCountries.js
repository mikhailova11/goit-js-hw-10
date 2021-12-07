import Country from "/templates/country.hbs";
import FlagAndName from "/templates/flag-and-name.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const refs = {
    searchBox: document.querySelector('#search-box'), 
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list')
}

export const fetchCountries = e => {
        let search = ''
        search = e.target.value
        if (search === '') {
          onCleanFindCountries()
          return
        }

    fetch(`https://restcountries.com/v3.1/name/${search.trim()}?fields=name,capital,population,flags,languages`)

  .then(response => {
      return response.json()
    })

    .then(country => {
      
      if (country.length > 10)
      {
        onManySuitable()
        onCleanFindCountries()
        return
      }

      if (country.length === 1) {
        onCleanFindCountries()
        const markup = Country(country)
        refs.countryInfo.innerHTML = markup
        return
      }

      if (country.status === 404) {
        onCleanFindCountries()
        onError()
        return
      }

      onCleanFindCountries()
      const markup = country.map(FlagAndName).join('')
      refs.countryList.innerHTML = markup
      })

    .catch(error => {
    });

}

function onManySuitable() {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  
  function onError(){
    Notify.failure('Oops, there is no country with that name.');
  }
  
  function onCleanFindCountries(){
    refs.countryList.innerHTML=''
    refs.countryInfo.innerHTML=''
  }
  