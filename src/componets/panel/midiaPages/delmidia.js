import * as React from 'react';

import validator from 'validator';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteMidia() {
  const msg = document.querySelector('#formmsg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const confirm = document.getElementById('confirm');
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState([
    {
      active: '',
      age: '',
      andressrelations: '',
      biography: '',
      callTypesrelations: '',
      created_at: '',
      endofday: '',
      etRelations: '',
      expired: '',
      height: '',
      id: null,
      name: '',
      phone: '',
      email: '',
      schedules: '',
      servicelocations: '',
      updated_at: '',
      weight: ''
    }
  ]);

  const getUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');

    if (
      validator.isEmpty(email.value.trim()) ||
      !validator.isEmail(email.value.trim())
    )
      return;

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    setLoadingPages(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${
          process.env.REACT_APP_API_URL
        }/userupdate/${email.value.trim()}`,
        method: 'GET',
        headers
      }).then((resp) => {
        if (resp.data.msg) {
          msg.innerHTML = '';
          msg.style.display = 'block';
          msg.innerHTML = resp.data.msg;
          setLoadingPages(false);
        } else {
          msg.style.display = 'none';
          setUser(resp.data.user);
          setLoadingPages(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRefresh = async () => {
    if (
      validator.isEmpty(String(user[0].email)) ||
      !validator.isEmail(String(user[0].email))
    )
      return;
    setLoadingPages(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/userupdate/${user[0].email}`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUser(resp.data.user);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhotos = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);

    const msgft = document.querySelector('#formmsgphotos');

    if (confirm.checked === false) {
      if (msgft) {
        msgft.style.display = 'block';
        msgft.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }

    msgft.style.display = 'block';
    msgft.innerHTML = 'Aguarde...';
    const id = ev.target.dataset.idphoto;
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/photo/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msgft.style.display = 'block';
        msgft.innerHTML = resp.data.msg;
        getUserRefresh();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideos = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);

    const msgft = document.querySelector('#formmsgvideos');

    if (confirm.checked === false) {
      if (msgft) {
        msgft.style.display = 'block';
        msgft.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterções.';
      }
      setLoadingPages(false);
      return;
    }

    msgft.style.display = 'block';
    msgft.innerHTML = 'Aguarde...';
    const id = ev.target.dataset.idphoto;
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/video/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msgft.style.display = 'block';
        msgft.innerHTML = resp.data.msg;
        getUserRefresh();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Concorda atualizar as midias deste cliente?</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>ATUALIZAR</strong>, você esta de acordo com a alteração do
          anunciante.{' '}
        </p>
        {user[0].id === null ? (
          <form method="POST" className="effectFade">
            <output id="formmsg" className="msgs" />
            <label htmlFor="email">Email do anunciante:</label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Digite o email do anunciante."
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
            <button type="submit" onClick={getUser}>
              Buscar
            </button>
          </form>
        ) : (
          <>
            <h2>Deletar Fotos</h2>
            <output id="formmsgphotos" />
            <nav className="deleteContainer">
              {user[0].photos.map((itens) => (
                <li key={itens.id}>
                  <p>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.name}`}
                      alt={itens.name}
                      decoding="async"
                      crossOrigin="anonymous"
                    />
                    {user[0].name}
                  </p>
                  <a
                    href="/"
                    aria-label={`${itens.city}-${itens.state}`}
                    data-idphoto={itens.id}
                    onClick={deletePhotos}>
                    Deletar
                  </a>
                </li>
              ))}
            </nav>

            <h2>Deletar Videos</h2>
            <output id="formmsgvideos" />
            <nav className="deleteContainer">
              {user[0].videos.map((itens) => (
                <li key={itens.id}>
                  <p>
                    <video muted crossOrigin="anonymous">
                      <source
                        src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.name}`}
                        type="video/mp4"
                      />
                    </video>
                    {user[0].name}
                  </p>
                  <a
                    href="/"
                    aria-label={`${itens.city}-${itens.state}`}
                    data-idphoto={itens.id}
                    onClick={deleteVideos}>
                    Deletar
                  </a>
                </li>
              ))}
            </nav>
          </>
        )}
      </div>
    </>
  );
}
