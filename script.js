let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupOpenAction() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function popupCloseAction() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupCloseAction();
}

editButton.addEventListener('click', popupOpenAction);
popupClose.addEventListener('click', popupCloseAction);
formElement.addEventListener('submit', formSubmitHandler);