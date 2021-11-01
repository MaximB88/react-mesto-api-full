import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onRegister(email, password)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    } 

    return(
        <div className="auth">
            <h1 className="auth__title">Регистрация</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" type="email" name="email" minLength="5" placeholder="Email" required value={email} onChange={handleChangeEmail} />
                <input className="auth__input" type="password" name="password" minLength="5" placeholder="Пароль" required value={password} onChange={handleChangePassword} />
                <button className="auth__button" >Зарегистрироваться</button>
                <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;