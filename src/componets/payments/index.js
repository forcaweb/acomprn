import * as React from 'react';
import './payments.css';
import axios from 'axios';
import LoadingPages from '../loading';

export default function LoginPayment() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const tokenpaymentstatment = localStorage.getItem('tokenpayment')
    ? localStorage.getItem('tokenpayment')
    : null;
  document.querySelector('title').innerText =
    'Login Pagamento - aschiquesdebsb.com.br';
  document.getElementsByTagName(
    'head'
  )[0].innerHTML += `<meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />`;
  const [token, setToken] = !localStorage.getItem('tokenpay')
    ? React.useState(null)
    : React.useState(localStorage.getItem('tokenpay'));

  if (token !== null) window.location.href = '/payment-token';
  if (tokenpaymentstatment !== null) window.location.href = '/payment-painel';

  const getToken = async (e) => {
    e.preventDefault();
    setLoadingPages(true);
    const email = document.getElementById('email');
    const msg = document.getElementById('msg');
    msg.innerText = 'Aguarde, carregando dados.';

    if (email.value === '') {
      msg.innerText = 'Campo vázio é proibido.';
      setLoadingPages(false);
      return;
    }
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/usertoken/${email.value}`,
        method: 'GET',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        if (resp.data.success) {
          localStorage.setItem('tokenpay', email.value);
          setToken(localStorage.getItem('tokenpay'));
          msg.innerText = 'Login realizado com sucesso.';
        } else {
          msg.innerText = 'Conta não existe.';
        }

        if (resp.data.msg) {
          msg.innerText = resp.data.msg;
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
