import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function AddPartners() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const confirm = document.getElementById('confirm');
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState([]);
  const msg = document.querySelector('#formmsg');

  const savePartners = async (ev) => {
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
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        if (resp.data.msg) {
          setUser([]);
          msg.innerHTML = resp.data.msg;
        }

        if (!resp.data.msg) {
          setUser(resp.data);
          msg.style.display = 'none';
        }
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Adicionar Publicidade</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>Cadastrar</strong>, você esta de acordo com a em anunciar.{' '}
        </p>
        <form
          method="POST"
          className="effectFade"
          encType="multipart/form-data">
          <output id="formmsg" className="msgs" />
          <label htmlFor="name">Titulo:</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Digite o titulo."
            maxLength="50"
            minLength="3"
            required
          />
          {user.map((itens) =>
            itens.nameError ? (
              <p className="showmsg" key={itens}>
                {itens.nameError}
              </p>
            ) : null
          )}
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
          {user.map((itens) =>
            itens.emailError ? (
              <p className="showmsg" key={itens}>
                {itens.emailError}
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
            placeholder="Ex.: https://aschiquesdebsb.com.br."
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
            required
          />
          {user.map((itens) =>
            itens.expiredError ? (
              <p className="showmsg" key={itens}>
                {itens.expiredError}
              </p>
            ) : null
          )}

          <label htmlFor="image">Imagem:</label>
          <input
            name="image"
            id="image"
            type="file"
            placeholder="Digite o imagem."
            accept=".png, .jpg, .jpeg"
            required
          />
          <button type="submit" onClick={savePartners}>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}
