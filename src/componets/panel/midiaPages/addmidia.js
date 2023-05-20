import * as React from 'react';
import validator from 'validator';
import * as IconsHi from 'react-icons/hi';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function AddMidiasUser() {
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
    formd.append('photos', images.files[0]);
    formd.append('user', user[0].id);
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/photos/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msgft.innerHTML = '';
        msgft.style.display = 'block';
        msgft.innerHTML = resp.data.msg;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveVideos = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const videos = document.getElementById('videos');
    const msgv = document.querySelector('#formvideos output');

    if (confirm.checked === false) {
      if (msgv) {
        msgv.style.display = 'block';
        msgv.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterções.';
      }
      setLoadingPages(false);
      return;
    }

    const formd = new FormData();
    formd.append('videos', videos.files[0]);
    formd.append('user', user[0].id);
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/videos/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msgv.innerHTML = '';
        msgv.style.display = 'block';
        msgv.innerHTML = resp.data.msg;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
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
            <h2>Adicionar Fotos</h2>
            <p className="warning">
              <strong>Imagens</strong> deve conter no máximo de{' '}
              <strong>1MB</strong> e deve ser em <strong>png</strong> ou{' '}
              <strong>jpeg</strong>. Caso tenha dúvida como diminuir o tamanho
              da imagem clique neste{' '}
              <a
                href="https://support.microsoft.com/pt-br/office/reduzir-o-tamanho-do-arquivo-de-uma-imagem-no-microsoft-office-8db7211c-d958-457c-babd-194109eb9535"
                target="blank">
                link
              </a>
              .
            </p>
            <form
              method="POST"
              encType="multipart/form-data"
              id="formphotos"
              className="effectFade">
              <output />
              <input
                name="photos"
                id="photos"
                type="file"
                placeholder="Selecione uma foto..."
                accept="image/png, image/jpeg"
                required
              />

              <button type="submit" onClick={savePhotos}>
                Enviar Fotos
              </button>
            </form>
            <h2>Adicionar Video</h2>
            <p className="warning">
              <strong>Videos</strong> deve conter no máximo de{' '}
              <strong>6MB</strong> e deve ser em <strong>mp4</strong> ou{' '}
              <strong>avi</strong>. Caso tenha dúvida como diminuir o tamanho do
              video clique neste{' '}
              <a
                href="https://www.techtudo.com.br/listas/2020/09/como-diminuir-tamanho-de-video-para-enviar-no-celular-veja-5-dicas.ghtml"
                target="blank">
                link
              </a>
              .
            </p>
            <form
              method="POST"
              encType="multipart/form-data"
              className="effectFade"
              id="formvideos">
              <output />
              <input
                name="videos"
                id="videos"
                type="file"
                placeholder="Selecione os videos..."
                accept="video/mp4, video/avi"
                required
              />

              <button type="submit" onClick={saveVideos}>
                Enviar Video
              </button>
            </form>

            <nav className="finaleRegister">
              <a
                href={`${
                  process.env.REACT_APP_URL_BASE
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
