import * as React from 'react';
import './payments.css';
import axios from 'axios';
import LoadingPages from '../loading';

export default function TokenPayment() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  document.querySelector(
    'title'
  ).innerText = `Token Pagamento - ${process.env.REACT_APP_URL_DOMINIO}`;
  document.getElementsByTagName(
    'head'
  )[0].innerHTML += `<meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />`;
  const email = localStorage.getItem('tokenpay');
  const tokenpaymentstatment = localStorage.getItem('tokenpayment')
    ? localStorage.getItem('tokenpayment')
    : null;
  const [tokenPayment, setTokenpayment] = React.useState(tokenpaymentstatment);

  if (email === null) window.location.href = '/payment-login';
  if (tokenPayment !== null) window.location.href = '/payment-painel';

  const getToken = async (e) => {
    e.preventDefault();
    setLoadingPages(true);
    const msg = document.getElementById('msg');
    const camptoken = document.getElementById('token_camp');
    if (camptoken.value === '') {
      msg.innerText = 'Campo Vázio!';
      setLoadingPages(false);
      return;
    }
    msg.innerText = 'Aguarde, carregando dados.';
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/getusertoken/${camptoken.value}/${email}`,
        method: 'GET',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        if (resp.data.token) {
          msg.innerText = 'Token realizado com sucesso.';
          localStorage.removeItem('tokenpay');
          localStorage.setItem('tokenpayment', resp.data.token);
          setTokenpayment(localStorage.getItem('tokenpayment'));
        } else {
          msg.innerText = 'Token não existe.';
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
          <h2>Token de Login</h2>
          <p id="msg">Seu token foi enviado para seu email.</p>
          <form method="POST">
            <label htmlFor="token_camp">Seu Token</label>
            <input
              type="text"
              name="token_camp"
              id="token_camp"
              placeholder="Digite o Token."
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
