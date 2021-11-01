import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="main">
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-block">
                        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                        <button className="profile__edit-avatar-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <div className='profile__account'>
                            <h1 className="profile__account-name">{currentUser.name}</h1>
                            <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="button profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo">
                {props.cards.map((data) => (
                    <Card 
                        data={data} 
                        key={data._id} 
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} />
                ))}
            </section>
      </main>
    )
}

export default Main