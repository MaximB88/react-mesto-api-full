import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.data.owner._id === currentUser._id;
    const isLiked = props.data.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `button post__like-button ${isLiked ? 'post__like-button_active' : ''}`;
    const cardDeleteButtonClassName = `button post__delete-button ${isOwn ? 'post__delete-button_active' : ''}`;

    function handleClick() {
        props.onCardClick(props.data);
    }

    function handleLikeClick() {
        props.onCardLike(props.data);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.data);
    }
    
    return(
        <div className="post">
            <div className="post__photo-area">    
                <img className="post__photo" src={props.data.link} alt={props.data.name} onClick={handleClick} />
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            </div>  
            <div className="post__description">
                <h2 className="post__title">{props.data.name}</h2>
                <div className="post__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="post__likes-count">{props.data.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;