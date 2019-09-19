/* eslint-disable */

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// Dom Element for
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const updateDataForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-password');
const logOutBtn = document.querySelector('.nav__el--logout');

// Values

// Delegations
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    login(email.value, password.value);
  });
}

if (updateDataForm) {
  updateDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    console.log(form);

    updateSettings(form, 'data');
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
