export const apiConfig = {
    baseUrl: 'https://api.place.nomoredomains.icu'
}

export const headers = {
    'Accept': 'application/json',
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