const submitForm = async function (event) {
  event.preventDefault();

  const formData = JSON.stringify(Object.fromEntries(new FormData(this)));

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });

  document.querySelector('.js-form-result').innerHTML =
    response.status === 200 ? 'OK' : 'KO';
};

document
  .querySelector('.js-password-form')
  .addEventListener('submit', submitForm);
