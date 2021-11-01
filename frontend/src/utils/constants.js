export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24'
}

export const headers = {
    authorization: '5e66f5ac-1df2-4094-a14c-2395e9e314f5',
    'Content-Type': 'application/json'
}

export const validationConfig = ({
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save-button', 
    inactiveButtonClass: 'popup__save-buton_inactive', 
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__input-error_active' 
  });