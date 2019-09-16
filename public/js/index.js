/* eslint-disable */

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';

// Dom Element for
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

// Values
const email = document.getElementById('email');
const password = document.getElementById('password');

// Delegations
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    login(email.value, password.value);
  });
}
