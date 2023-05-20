import * as React from 'react';
import * as IconsAi from 'react-icons/ai';
import './login.css';
import axios from 'axios';
import LoadingPages from '../loading';

export default function Login() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [showPass, setShowPass] = React.useState({ ative: false });
  document.querySelector('title').innerText =
    'Faça seu login - aschiquesdebsb.com.br';
  const [token, setToken] = !localStorage.getItem('token')
    ? React.useState(null)
    : React.useState(localStorage.getItem('token'));

  if (token !== null) window.location.href = '/panel';

  const showPassOrNo = (e) => {
    e.preventDefault();
    if (showPass.ative === false) {
      document.querySelector('#pass').setAttribute('type', 'text');
      setShowPass({ ative: true });
    }

    if (showPass.ative === true) {
      document.querySelector('#pass').setAttribute('type', 'password');
      setShowPass({ ative: false });
    }
  };

  const getToken = async (e) => {
    e.preventDefault();
    setLoadingPages(true);
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    const msg = document.getElementById('msg');
    const formd = new FormData();
    formd.append('email', email.value);
    formd.append('pass', pass.value);
    msg.innerText = 'Aguarde, carregando dados.';
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/lg`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        if (resp.data.success) {
          localStorage.setItem('token', resp.data.success);
          setToken(localStorage.getItem('token'));
          msg.innerText = 'Login realizado com sucesso.';
        } else if (resp.data.accountError) {
          msg.innerText = resp.data.accountError;
        } else {
          msg.innerText = 'Você tem uma sessão iniciada.';
          const t = setInterval(() => {
            window.location.reload();
            clearInterval(t);
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="loginContainer">
      {loadingPages === true ? <LoadingPages /> : null}
      <div className="box">
        <div className="bg">
          <h1>
            <img
              src={`${process.env.REACT_APP_URL_BASE}/imgs/bg-login.jpg`}
              alt="bg login form"
              decoding="async"
            />
          </h1>
        </div>
        <div className="form">
          <h2>Faça Seu Login</h2>
          <p id="msg">Preencha os dados corretamente.</p>
          <form method="POST">
            <label htmlFor="email">Seu Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Digite o email para o login"
            />
            <small id="errorEmail" />
            <label htmlFor="pass">Sua Senha</label>
            <div>
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Digite sua senha para o login"
              />{' '}
              <button type="button" onClick={showPassOrNo}>
                {showPass.ative === false ? (
                  <IconsAi.AiFillEye />
                ) : (
                  <IconsAi.AiFillEyeInvisible />
                )}
              </button>
            </div>
            <small id="errorPass" />
            <button type="submit" id="btnsend" onClick={getToken}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
