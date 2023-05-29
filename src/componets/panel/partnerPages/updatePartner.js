import * as React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import LoadingPages from '../../loading';

export default function UpdatePartners() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const confirm = document.getElementById('confirm');
  const token = localStorage.getItem('token');
  const [timExpired, setTimExpired] = React.useState(null);
  const [dateFormated, setDateFormated] = React.useState(null);
  const [user, setUser] = React.useState([]);
  const [resultuser, setResultUser] = React.useState([]);
  const msg = document.querySelector('#formmsg');

  const getPartners = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);

    const email = document.getElementById('email');

    const formd = new FormData();
    formd.append('email', email.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/partners/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        if (resp.data.msg) {
          msg.style.display = 'block';
          msg.innerHTML = resp.data.msg;
          setLoadingPages(false);
          return;
        }

        if (resp.data[0].partner) {
          setResultUser(resp.data);
          msg.style.display = 'none';
          setTimExpired(resp.data[0].partner.expired_in);
        }

        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePartners = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const images = document.getElementById('image');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const expired = document.getElementById('expired_in');
    const linksite = document.getElementById('sitelink');

    if (confirm.checked === false) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const exp = new Date(`${expired.value} 23:00:00`);

    const formd = new FormData();
    formd.append('image', images.files[0]);
    formd.append('name', name.value);
    formd.append('email', email.value);
    formd.append('phone', phone.value);
    formd.append('expired_in', exp);
    formd.append('linksite', linksite.value);

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/partner/`,
        method: 'PUT',
        data: formd,
        headers
      }).then((resp) => {
        if (resp.data.msg) {
          msg.innerHTML = resp.data.msg;
        } else {
          setUser(resp.data);
          msg.style.display = 'none';
        }

        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (timExpired !== null) {
    const x = new Date(Number(timExpired));

    if (dateFormated === null)
      setDateFormated(moment(x.toISOString()).format('yyyy-MM-DD'));
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Atualizar Publicidade</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>Atualizar</strong>, você esta de acordo em atualizar.{' '}
        </p>
        {resultuser.length <= 0 ? (
          <form method="POST" className="effectFade">
            <output id="formmsg" className="msgs" />
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Digite o email."
              maxLength="50"
              minLength="3"
              required
            />
            <button type="submit" onClick={getPartners}>
              Buscar
            </button>
          </form>
        ) : (
          <form
            method="POST"
            className="effectFade"
            encType="multipart/form-data">
            <output id="formmsg" className="msgs" />
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Digite o email."
              maxLength="50"
              minLength="3"
              disabled
              defaultValue={
                resultuser[0].partner ? resultuser[0].partner.email : null
              }
            />
            {user.map((itens) =>
              itens.emailError ? (
                <p className="showmsg" key={itens}>
                  {itens.emailError}
                </p>
              ) : null
            )}
            <label htmlFor="name">Titulo:</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Digite o titulo."
              maxLength="50"
              minLength="3"
              defaultValue={
                resultuser[0].partner ? resultuser[0].partner.name : null
              }
              required
            />
            {user.map((itens) =>
              itens.nameError ? (
                <p className="showmsg" key={itens}>
                  {itens.nameError}
                </p>
              ) : null
            )}
            <label htmlFor="phone">Telefone:</label>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="Digite o Telefone."
              maxLength="50"
              minLength="3"
              defaultValue={
                resultuser[0].partner ? resultuser[0].partner.phone : null
              }
              required
            />
            {user.map((itens) =>
              itens.phoneError ? (
                <p className="showmsg" key={itens}>
                  {itens.phoneError}
                </p>
              ) : null
            )}

            <label htmlFor="sitelink">Link do site:</label>
            <input
              name="sitelink"
              id="sitelink"
              type="text"
              defaultValue={
                resultuser[0].partner ? resultuser[0].partner.linksite : null
              }
              placeholder="Ex.: https://google.com.br."
              maxLength="150"
              minLength="3"
              required
            />
            {user.map((itens) =>
              itens.linkError ? (
                <p className="showmsg" key={itens}>
                  {itens.linkError}
                </p>
              ) : null
            )}

            <label htmlFor="expired_in">Data de expiração:</label>
            <input
              name="expired_in"
              id="expired_in"
              type="date"
              placeholder="Digite data de expiração."
              defaultValue={dateFormated}
              required
            />

            {user.map((itens) =>
              itens.expiredError ? (
                <p className="showmsg" key={itens}>
                  {itens.expiredError}
                </p>
              ) : null
            )}

            <label htmlFor="email">Imagem:</label>
            <img
              width={300}
              src={`${process.env.REACT_APP_API_URL}/public/uploads/${resultuser[0].partner.image}`}
              alt={resultuser[0].partner ? resultuser[0].partner.image : null}
              crossOrigin="anonymous"
              id="imagerender"
            />

            <small>A altura e a largura não devem exceder 1080px.</small>
            <input
              name="image"
              id="image"
              type="file"
              placeholder="Digite o imagem."
              accept=".png, .jpg, .jpeg"
              required
            />
            <button type="submit" onClick={updatePartners}>
              Update
            </button>
          </form>
        )}
      </main>
    </>
  );
}
