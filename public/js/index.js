import { BaseN } from '../js-combinatorics/combinatorics.js';

const sendRootRequest = async function (formData) {
  return await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
};

const getFormData = function () {
  return Object.fromEntries(
    new FormData(document.querySelector('.js-password-form')),
  );
};

const sendAction = async function () {
  const formData = getFormData();
  const response = await sendRootRequest(formData);

  document.querySelector('.js-form-result').innerHTML =
    response.status === 200 ? `OK` : `KO`;
};

const getBaseNForUserId = (userId) => {
  const NUMBERS = '123456789';
  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
  const SPECIAL_CHARACTERS = '/*-+.<>,.?;:\\\'"|[{]}_=`~!@#$%^&()';

  if (userId === '1') {
    return new BaseN(NUMBERS, 4);
  }

  if (userId === '2') {
    return new BaseN(NUMBERS, 5);
  }

  if (userId === '3') {
    return new BaseN(CHARACTERS, 4);
  }

  if (userId === '4') {
    return new BaseN(NUMBERS + CHARACTERS, 4);
  }

  if (userId === '5') {
    return new BaseN(NUMBERS + CHARACTERS + SPECIAL_CHARACTERS, 4);
  }
};

const ajaxAttackAction = async function () {
  const formData = getFormData();

  const resultElement = document.querySelector('.js-form-result');

  const baseN = getBaseNForUserId(formData.id);

  const start = new Date();

  for (const permutation of baseN) {
    formData.password = permutation.join('');

    const response = await sendRootRequest(formData);

    if (response.status === 200) {
      resultElement.innerHTML = `OK - ${formData.password}`;
      break;
    }

    resultElement.innerHTML = `KO - ${formData.password}`;
  }

  const end = new Date();

  console.log((end - start) / 1000);
};

const serverAttackAction = async function () {
  const formData = getFormData();

  const resultElement = document.querySelector('.js-form-result');

  const start = new Date();

  resultElement.innerHTML = `KO - (attacking...)`;

  const response = await fetch('/server-attack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const end = new Date();

  console.log((end - start) / 1000);

  if (response.status !== 200) {
    resultElement.innerHTML = `KO`;
    return;
  }

  const responseData = JSON.parse(await response.text());
  resultElement.innerHTML = `OK - ${responseData.password}`;
};

document.querySelector('.js-send').addEventListener('click', sendAction);
document
  .querySelector('.js-ajax-attack')
  .addEventListener('click', ajaxAttackAction);
document
  .querySelector('.js-server-attack')
  .addEventListener('click', serverAttackAction);
