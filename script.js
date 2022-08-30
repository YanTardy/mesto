let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

document.querySelector('input[name="name"]').value = document.querySelector('.profile__name').textContent;
document.querySelector('input[name="job"]').value = document.querySelector('.profile__description').textContent;

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);