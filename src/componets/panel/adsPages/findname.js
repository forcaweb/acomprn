import * as React from 'react';

import validator from 'validator';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function FindNameUser() {
  const msg = document.querySelector('#msg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState([{ error: null }]);

  const getUser = async (e) => {
    e.preventDefault();
    const nameads = document.getElementById('nameads');

    if (validator.isEmpty(nameads.value.trim())) return;

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formData = new FormData();
    formData.append('nameads', nameads.value.trim());

    setLoadingPages(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/findnameuser/`,
        method: 'POST',
        data: formData,
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

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Procurar anunciante</h1>
        <form method="POST" className="effectFade">
          <output id="msg" className="msgs" />
          <label htmlFor="nameads">Digite o nome ou titulo do anúncio:</label>
          <input
            name="nameads"
            id="nameads"
            type="text"
            placeholder="Digite o nome do anunciante."
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
        <h2>Lista de anunciantes</h2>
        <output id="formmsgphotos" />

        <nav className="deleteContainer">
          {user[0].error === false ? (
            user[1].map((itens) => (
              <li key={itens.id}>
                <p>Nome: {itens.name}</p>
                <p>E-mail: {itens.email}</p>
              </li>
            ))
          ) : (
            <li>
              <p>Nada econtrado</p>
            </li>
          )}
        </nav>
      </div>
    </>
  );
}
