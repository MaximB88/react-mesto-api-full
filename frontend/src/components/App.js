import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import React from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTolltip';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
    
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [isSuccessRegister, setIsSuccessRegister] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        checkToken()
    }, [])

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn, history])
    
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, data]) => {
                setCurrentUser(userData);
                setCards(data)
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }, []);
    
    function handleAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(data) {
        setSelectedCard(data)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function hanadleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardLike(data) {
        const isLiked = data.likes.some(i => i._id === currentUser._id);
        api.changeLikeCount(data._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardDelete(data) {
        api.deleteCard(data._id)
            .then(() => {
                const newArrCards = cards.filter(i => i !== data);
                setCards(newArrCards);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handlePlaceAddSubmit(data) {
        api.setNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    //регистрация
    function handleRegister(email, password) {
        return auth.register(email, password)
            .then(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsSuccessRegister(true);
                setUserEmail(email);
                history.push('/sign-in');
            })
            .catch(() => {
                setIsInfoTooltipPopupOpen(true);
                setIsSuccessRegister(false);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}.`);
            })
    }

    //логин
    function handleLogin(email, password) {
        return auth.authorization(email, password)
            .then(res => {
                localStorage.setItem('token', res.token);
                setLoggedIn(true);
                setUserEmail(email);
                history.push('/');
            })
            .catch(err => {
                console.log(`Ошибка: ${err}.`);
            })
    }

    //проверка токена
    function checkToken() {
        const token = localStorage.getItem('token')
        if (token) {
            auth.getToken(token)
                .then(res => {
                    setUserEmail(res.data.email);
                    setLoggedIn(true);
                })
                .catch(err => {
                    console.log(`Ошибка: ${err}.`);
                })
        } else {
            return
        }
    }

    //выход из аккаунта
    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserEmail('');
        history.push('/sign-in');
    }
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header loggedIn={loggedIn} onSignOut={handleSignOut} userEmail={userEmail}  />
            <Switch>
                <ProtectedRoute 
                    exact
                    path="/" 
                    component={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleAvatarClick} 
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Route path="/sign-in">
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                    <Register onRegister={handleRegister} />
                </Route>
                <Route exact path="/">
                    {loggedIn ? <Redirect to='/' /> : <Redirect to='sign-in' />}
                </Route>
            </Switch>
            <Footer />
            {loggedIn && 
                <>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handlePlaceAddSubmit} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={hanadleUpdateAvatar}/>
                    <ImagePopup data={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
                </>
            }
            <InfoTooltip isRegister={isSuccessRegister} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />     
            
        </CurrentUserContext.Provider>
  );
}

export default App;