function showInputError(form, input, errorMessage, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
};

function hideInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = '';
  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
};

function validateInput(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));
  form.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
}

function hasErrors(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid
  });
}

function disableButton(config, button) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

function enableButton(config, button) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

function toggleButtonState(inputs, button, config) {
  if (hasErrors(inputs)) {
    disableButton(config, button);
  } else {
    enableButton(config, button);
  }
}

enableValidation(config);