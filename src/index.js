import './css/styles.css';
import {fetchCountries, refs} from './js/fetchCountries.js';
import debounce from "lodash.debounce";



const DEBOUNCE_DELAY = 300;


refs.searchBox.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
