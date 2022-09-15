//ПОПАП
const popup = document.querySelector('.popup');

//ДАННЫЕ ДЛЯ КАРТОЧЕК ИЗ КОРОБКИ
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//ДЛЯ ПОПАПА Profile-edit
const formEdit = document.querySelector('.popup__form_type_profile-edit');
const popupEdit = document.querySelector('.popup_type_profile-edit');
const editButton = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = document.querySelector('.popup__close_type_profile');
let nameInput = document.querySelector('.popup__input_type_profile-name');
let jobInput = document.querySelector('.popup__input_type_profile-job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//ДЛЯ ПОПАПА Place-add
const formAdd = document.querySelector('.popup__form_type_place-add');
const popupAdd = document.querySelector('.popup_type_place-add');
const addButton = document.querySelector('.profile__add-button');
const popupAddCloseBtn = document.querySelector('.popup__close_type_add');
let titleInput = document.querySelector('.popup__input_type_place-name');
let linkInput = document.querySelector('.popup__input_type_place-link');
let placeTitle = document.querySelector('.place__title');
let placeLink = document.querySelector('.place__image');

//ДЛЯ ПОПАПА Image-zoom
const popupZoom = document.querySelector('.popup_type_image-zoom');
const popupZoomCloseBtn = document.querySelector('.popup__close_type_image-zoom');
let popupZoomContent = document.querySelector('.popup__content');
let popupZoomFigcaption = document.querySelector('.popup__figcaption');

//ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ Place
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('.template-card').content;


//ФУНКЦИИ
function initCard(placeTitle, placeLink) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__image').src = placeLink;
  cardElement.querySelector('.place__title').textContent = placeTitle;
  cardElement.querySelector('.place__image').addEventListener('click', () => zoomImage(placeTitle, placeLink));
  cardElement.querySelector('.place__like').addEventListener('click', toggleLike);
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);

  places.append(cardElement);
}

function addCard() {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__image').src = linkInput.value;
  cardElement.querySelector('.place__title').textContent = titleInput.value;
  cardElement.querySelector('.place__image').addEventListener('click', () => zoomImage(titleInput.value, linkInput.value));
  cardElement.querySelector('.place__like').addEventListener('click', toggleLike);
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);

  places.prepend(cardElement);
}

function toggleLike(evt) {
  evt.target.classList.toggle('place__like_pressed');
}

function deletePlace(evt) {
  evt.target.closest('.place').remove();
}

function openPopupImage() {
  popupZoom.classList.add('popup_opened');
}

function zoomImage(placeTitle, placeLink) {
  popupZoomContent.alt = placeTitle;
  popupZoomContent.src = placeLink;
  popupZoomFigcaption.textContent = placeTitle;
  openPopupImage();
}

function formSubmitForFormAdd(evt) {
  evt.preventDefault();
  addCard();
  popupAdd.classList.remove('popup_opened');
}

function formSubmitForFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupEdit.classList.remove('popup_opened');
}


//СЛУШАТЕЛИ (и не только)
initialCards.forEach((createCard) => {
  initCard(createCard.name, createCard.link);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupEdit.classList.add('popup_opened');
});

addButton.addEventListener('click', () => {
  popupAdd.classList.add('popup_opened');
});

popupEditCloseBtn.addEventListener('click', () => {
  popupEdit.classList.remove('popup_opened');
});

popupAddCloseBtn.addEventListener('click', () => {
  popupAdd.classList.remove('popup_opened');
});

popupZoomCloseBtn.addEventListener('click', () => {
  popupZoom.classList.remove('popup_opened');
});

formEdit.addEventListener('submit', formSubmitForFormEdit);
formAdd.addEventListener('submit', formSubmitForFormAdd);
