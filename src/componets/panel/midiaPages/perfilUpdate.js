import * as React from 'react';
import validator from 'validator';
import * as IconsHi from 'react-icons/hi';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function PerfilPhotosUser() {
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
      schedules: '',
      servicelocations: '',
      updated_at: '',
      weight: ''
    }
  ]);
  const msg = document.querySelector('#formmsg');

  const getUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');

    if (
      validator.isEmpty(email.value.trim()) ||
      !validator.isEmail(email.value.trim())
    )
      return;
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

  const savePhotos = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const images = document.getElementById('photos');
    const msgft = document.querySelector('#formphotos output');

    if (confirm.checked === false) {
      if (msgft) {
        msgft.style.display = 'block';
        msgft.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('id', images.value);
    formd.append('idUser', user[0].id);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/photo/`,
        method: 'PUT',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msgft.innerHTML = '';
        msgft.style.display = 'block';
        if (resp.data.error === false) msgft.innerHTML = 'Salvo com sucesso!';
        else msgft.innerHTML = 'Error ao salvar!';
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Atualizar foto de perfil</h1>
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
            <h2>Foto Perfil</h2>
            <form method="POST" id="formphotos" className="effectFade">
              <output className="msgs" />
              <div className="photosShow">
                {user[0].photos.map((itens) => (
                  <div key={itens.id}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.name}`}
                      alt={itens.name}
                      crossOrigin="anonymous"
                    />
                    <p>{itens.name}</p>
                  </div>
                ))}
              </div>
              <select name="photos" id="photos" required>
                {user[0].photos.map((itens) => (
                  <option value={itens.id} key={itens.id}>
                    {itens.name}
                  </option>
                ))}
              </select>

              <button type="submit" onClick={savePhotos}>
                Salvar
              </button>
            </form>

            <nav className="finaleRegister">
              <a
                href={`${
                  process.env.PUBLIC_URL
                }/${user[0].callTypesrelations[0].typecall.name
                  .replaceAll(' ', '-')
                  .toLowerCase()}/${user[0].id}/${user[0].name
                  .replaceAll(' ', '-')
                  .toLowerCase()}`}
                target="blank">
                <IconsHi.HiCursorClick /> Link do perfil
              </a>
            </nav>
          </>
        )}
      </main>
    </>
  );
}
