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

const ajaxAttackAction = async function () {
  const formData = getFormData();

  const resultElement = document.querySelector('.js-form-result');

  for (const permutation of new BaseN('123456789', 4)) {
    formData.password = permutation.join('');

    const response = await sendRootRequest(formData);

    if (response.status === 200) {
      resultElement.innerHTML = `OK - ${formData.password}`;
      break;
    }

    resultElement.innerHTML = `KO - ${formData.password}`;
  }
};

const serverAttackAction = async function () {
  const formData = getFormData();

  const resultElement = document.querySelector('.js-form-result');

  resultElement.innerHTML = `KO - (attacking...)`;

  const response = await fetch('/server-attack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

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
