import headerLogo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип" className="header__logo" />
            <div className="header__info">
                {props.loggedIn ? 
                    (
                        <>
                        <p className="header__user-mail">{props.userEmail}</p>
                        <Link className="header__link" to="/sign-up" onClick={props.onSignOut}>Выйти</Link>
                        </>
                    ) : (
                        <Link className="header__link" to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
                            {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
                        </Link>
                    )
                }
            </div>
            
        </header> 
    )
}

export default Header;