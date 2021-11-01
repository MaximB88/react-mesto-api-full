import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    
    return(
        <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" type="text" value={name || ''} name ="name" className="popup__input" onChange={handleChangeName} placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__input-error name-input-error"></span>
            <input id="info-input" type="text" value={description || ''} name ="about" className="popup__input" onChange={handleChangeDescription} placeholder="О себе" required minLength="2" maxLength="200" />
            <span className="popup__input-error info-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;