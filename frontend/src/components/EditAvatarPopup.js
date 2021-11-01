import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
          });
    }
    
    return(
        <PopupWithForm name="change-avatar" title="Обновить автар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="avatar-link-input" ref={avatarRef} type="url" name ="link" className="popup__input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error avatar-link-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;