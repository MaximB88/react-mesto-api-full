import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault()
        props.onLogin(email, password)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return(
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" type="email" placeholder="Email" minLength="5" required value={email} onChange={handleChangeEmail} />
                <input className="auth__input" type="password" minLength="5" placeholder="Пароль" required value={password} onChange={handleChangePassword} />
                <button className="auth__button">Войти</button>
            </form>
        </div>
    )
}

export default Login