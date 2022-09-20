//ДЛЯ ПОПАПА Profile-edit
const formEdit = document.querySelector('.popup__form_type_profile-edit');
const popupEdit = document.querySelector('.popup_type_profile-edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = document.querySelector('.popup__close_type_profile');
const nameInput = document.querySelector('.popup__input_type_profile-name');
const jobInput = document.querySelector('.popup__input_type_profile-job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//ДЛЯ ПОПАПА Place-add
const formAdd = document.querySelector('.popup__form_type_place-add');
const popupAdd = document.querySelector('.popup_type_place-add');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCloseBtn = document.querySelector('.popup__close_type_add');
const titleInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_place-link');
const placeTitle = document.querySelector('.place__title');
const placeLink = document.querySelector('.place__image');

//ДЛЯ ПОПАПА Image-zoom
const popupZoom = document.querySelector('.popup_type_image-zoom');
const popupZoomCloseBtn = document.querySelector('.popup__close_type_image-zoom');
const popupZoomContent = document.querySelector('.popup__content');
const popupZoomFigcaption = document.querySelector('.popup__figcaption');

//ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ Place
const containerPlaces = document.querySelector('.places');
const contentTemplate = document.querySelector('.template-card').content;
const cardTemplate = contentTemplate.querySelector('.place');

//ДЛЯ ВАЛИДАЦИИ ФОРМ
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const buttonElementSubmit = popupAdd.querySelector(config.submitButtonSelector);

//ФУНКЦИИ
function prepareCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const imagePlace = cardElement.querySelector('.place__image');

  imagePlace.src = card.link;
  imagePlace.alt = card.name;
  imagePlace.addEventListener('click', () => zoomImage(card.name, card.link));
  cardElement.querySelector('.place__title').textContent = card.name;
  cardElement.querySelector('.place__like').addEventListener('click', toggleLike);
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);

  return cardElement;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function toggleLike(evt) {
  evt.target.classList.toggle('place__like_pressed');
}

function deletePlace(evt) {
  evt.target.closest('.place').remove();
}

function openPopupImage() {
  openPopup(popupZoom);
  document.addEventListener('keydown', handleEscClosePopup);
}

function zoomImage(placeTitle, placeLink) {
  popupZoomContent.alt = placeTitle;
  popupZoomContent.src = placeLink;
  popupZoomFigcaption.textContent = placeTitle;
  openPopupImage();
}

function handleAddCardFormSubmit(evt) {
  const dataInput = {
    name: titleInput.value,
    link: linkInput.value
  }

  evt.preventDefault();
  addCard(dataInput);
  closePopup(popupAdd);
  evt.target.reset();
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

function addCard(card) {
  const cardElement = prepareCard(card);
  containerPlaces.prepend(cardElement);
}

function handleEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupZoom);
  }
}

function handleClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened') || evt.target.closest('popup__close')) {
    closePopup(evt.target.closest('.popup'));
  }
}

//СЛУШАТЕЛИ (и не только)
initialCardsReversed.forEach((cardData) => {
  addCard(cardData);
});

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  document.addEventListener('keydown', handleEscClosePopup);
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  disableButton(config, buttonElementSubmit);
  document.addEventListener('keydown', handleEscClosePopup);
});

popupEditCloseBtn.addEventListener('click', () => {
  closePopup(popupEdit);
  document.removeEventListener('keydown', handleEscClosePopup);
});

popupAddCloseBtn.addEventListener('click', () => {
  closePopup(popupAdd);
  document.removeEventListener('keydown', handleEscClosePopup);
});

popupZoomCloseBtn.addEventListener('click', () => {
  closePopup(popupZoom);
  document.removeEventListener('keydown', handleEscClosePopup);
});

formEdit.addEventListener('submit', handleEditProfileFormSubmit);
formAdd.addEventListener('submit', handleAddCardFormSubmit);
popupAdd.addEventListener('click', handleClosePopup);
popupEdit.addEventListener('click', handleClosePopup);
popupZoom.addEventListener('click', handleClosePopup);