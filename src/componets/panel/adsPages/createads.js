import * as React from 'react';
import * as IconsHi from 'react-icons/hi';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function CreateAds() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [createdId, setCreatedId] = React.useState(null);
  const [createdName, setCreatedName] = React.useState(null);
  const [user, setUser] = React.useState([]);
  const [cat, setCat] = React.useState('');
  const [andress, setAndress] = React.useState('');
  const [typesOfCustomers, setTypesOfCustomers] = React.useState('');
  const [andressSelected, setAndressSelected] = React.useState([]);
  const [typeCallsSelected, settypeCallsSelected] = React.useState([]);
  const [typesOfCustomersSelected, setTypesOfCustomersSelected] =
    React.useState([]);
  const msg = document.querySelector('#formmsg');
  const token = localStorage.getItem('token');
  const changeSelectAndress = (event) => {
    setAndress(event.target.value);
  };

  const changeSelectTOC = (event) => {
    setTypesOfCustomers(event.target.value);
  };

  const changeSelectCat = (event) => {
    setCat(event.target.value);
  };

  const getTypesOfCustomers = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tocs/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setTypesOfCustomersSelected(resp.data.typesOfCustomers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTypeCalls = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/`,
        method: 'GET',
        headers
      }).then((resp) => {
        settypeCallsSelected(resp.data.typesCalls);
        getTypesOfCustomers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAndress = async () => {
    if (andressSelected.length > 0) return;
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setAndressSelected(resp.data.andress);
        if (resp.data.andress.length > 0) {
          getTypeCalls();
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
    const formd = new FormData();
    formd.append('photos', images.files[0]);
    formd.append('user', createdId);
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
    const formd = new FormData();
    formd.append('videos', videos.files[0]);
    formd.append('user', createdId);
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

  const saveUser = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const height = document.getElementById('height');
    const weight = document.getElementById('weight');
    const schedules = document.getElementById('schedules');
    const biography = document.getElementById('biography');
    const endofday = document.getElementById('endofday');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const servicelocations = document.getElementById('servicelocations');
    const andressid = document.getElementById('andress_id');
    const ctp = document.getElementById('ctp');
    const premium = document.getElementById('premium');
    const typesOfCustomersCamp = document.getElementById('typesOfCustomers');

    const date = document.getElementById('date').value;

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('name', name.value);
    formd.append('age', age.value);
    formd.append('height', height.value);
    formd.append('weight', weight.value);
    formd.append('schedules', schedules.value);
    formd.append('biography', biography.value);
    formd.append('endofday', endofday.value);
    formd.append('phone', phone.value);
    formd.append('email', email.value);
    formd.append('servicelocations', servicelocations.value);
    formd.append('andress_id', andressid.value);
    formd.append('ctp', ctp.value);
    formd.append('typesOfCustomers', typesOfCustomersCamp.value);
    formd.append('premium', premium.value);
    formd.append('expired', `${date} 23:00:00`);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/user/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        msg.style.display = 'none';
        if (resp.data[1]) {
          if (resp.data[1].id) {
            setCreatedId(resp.data[1].id[0].id);
            setCreatedName(resp.data[2].name);
          } else {
            setUser(resp.data);
          }
        }

        setUser(resp.data);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (andressSelected.length <= 0) {
    getAndress();
  }

  if (user.length > 0) {
    if (user[0].msg) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML = user[0].msg;
      }
    }
  }
  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        {!createdId ? (
          <>
            <h1>Adicionar novo usuário</h1>
            <form method="POST" className="effectFade">
              <output id="formmsg" className="msgs" />
              <label htmlFor="name">Titulo do anúncio:</label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Digite o Titulo do anúncio."
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

              <label htmlFor="age">Idade:</label>
              <input
                name="age"
                id="age"
                type="text"
                placeholder="Digite a idade do anunciante."
                maxLength="3"
                minLength="3"
                required
              />

              {user.map((itens) =>
                itens.ageError ? (
                  <p className="showmsg" key={itens}>
                    {itens.ageError}
                  </p>
                ) : null
              )}

              <label htmlFor="height">Altura:</label>
              <input
                name="height"
                id="height"
                type="text"
                placeholder="Digite a altura do anunciante."
                maxLength="50"
                minLength="3"
                required
              />

              {user.map((itens) =>
                itens.heightError ? (
                  <p className="showmsg" key={itens}>
                    {itens.heightError}
                  </p>
                ) : null
              )}

              <label htmlFor="weight">Peso:</label>
              <input
                name="weight"
                id="weight"
                type="text"
                placeholder="Digite o peso do anunciante."
                maxLength="50"
                minLength="3"
                required
              />

              {user.map((itens) =>
                itens.weightError ? (
                  <p className="showmsg" key={itens}>
                    {itens.weightError}
                  </p>
                ) : null
              )}

              <label htmlFor="biography">Biografia:</label>
              <textarea
                name="biography"
                id="biography"
                type="text"
                placeholder="Digite a biografia do anunciante."
                maxLength="2500"
                minLength="3"
                required
              />

              {user.map((itens) =>
                itens.biographyError ? (
                  <p className="showmsg" key={itens}>
                    {itens.biographyError}
                  </p>
                ) : null
              )}

              <label htmlFor="schedules">Inicio Expediente:</label>
              <input name="schedules" id="schedules" type="time" required />

              {user.map((itens) =>
                itens.schedulesError ? (
                  <p className="showmsg" key={itens}>
                    {itens.schedulesError}
                  </p>
                ) : null
              )}

              <label htmlFor="endofday">Fim Expediente:</label>
              <input name="endofday" id="endofday" type="time" required />

              {user.map((itens) =>
                itens.endofdayError ? (
                  <p className="showmsg" key={itens}>
                    {itens.endofdayError}
                  </p>
                ) : null
              )}

              <label htmlFor="phone">Contato:</label>
              <input
                name="phone"
                id="phone"
                type="text"
                placeholder="Digite o contato do anunciante."
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

              <label htmlFor="email">Email:</label>
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
                itens.emailError ? (
                  <p className="showmsg" key={itens}>
                    {itens.emailError}
                  </p>
                ) : null
              )}

              <label htmlFor="servicelocations">Locais de atendimentos:</label>
              <input
                name="servicelocations"
                id="servicelocations"
                type="text"
                placeholder="Digite os locais de atendimento. Ex.: Moteis, Possui local e etc.."
                maxLength="50"
                minLength="3"
                required
              />

              {user.map((itens) =>
                itens.servicelocationsError ? (
                  <p className="showmsg" key={itens}>
                    {itens.servicelocationsError}
                  </p>
                ) : null
              )}

              <label htmlFor="andress_id">Endereço de atendimento:</label>
              {andressSelected.length > 0 ? (
                <select
                  name="andress_id"
                  id="andress_id"
                  value={andress}
                  required
                  onChange={changeSelectAndress}>
                  <option value="" disabled>
                    Selecione um endereço
                  </option>

                  {andressSelected.map((itens) => (
                    <option
                      key={itens.id}
                      value={itens.id}>{`${itens.city_and_state}`}</option>
                  ))}
                </select>
              ) : (
                <select
                  name="andress_id"
                  id="andress_id"
                  value={andress}
                  required
                  onChange={changeSelectAndress}>
                  <option value="" disabled>
                    Sem endereço
                  </option>
                </select>
              )}

              {user.map((itens) =>
                itens.andressidError ? (
                  <p className="showmsg" key={itens}>
                    {itens.andressidError}
                  </p>
                ) : null
              )}

              <label htmlFor="ctp">Categorias:</label>
              {typeCallsSelected.length > 0 ? (
                <select
                  name="ctp"
                  id="ctp"
                  value={cat}
                  required
                  onChange={changeSelectCat}>
                  <option value="" disabled>
                    Selecione uma Categoria
                  </option>
                  {typeCallsSelected.map((itens) => (
                    <option
                      key={itens.id}
                      value={itens.id}>{`${itens.name}`}</option>
                  ))}
                </select>
              ) : (
                <select
                  name="ctp"
                  id="ctp"
                  value={cat}
                  required
                  onChange={changeSelectCat}>
                  <option value="" disabled>
                    Sem Categorias
                  </option>
                </select>
              )}

              {user.map((itens) =>
                itens.ctpError ? (
                  <p className="showmsg" key={itens}>
                    {itens.ctpError}
                  </p>
                ) : null
              )}

              <label htmlFor="typesOfCustomers">Tipo de Cliente:</label>
              {typesOfCustomersSelected.length > 0 ? (
                <select
                  name="typesOfCustomers"
                  id="typesOfCustomers"
                  value={typesOfCustomers}
                  required
                  onChange={changeSelectTOC}>
                  <option value="" disabled>
                    Selecione um tipo de cliente..
                  </option>
                  {typesOfCustomersSelected.map((itens) => (
                    <option
                      key={itens.id}
                      value={itens.id}>{`${itens.typesOfCustomers}`}</option>
                  ))}
                </select>
              ) : (
                <select
                  name="typesOfCustomers"
                  id="typesOfCustomers"
                  value={typesOfCustomers}
                  required
                  onChange={changeSelectTOC}>
                  <option value="" disabled>
                    Sem gêneros salvos
                  </option>
                </select>
              )}

              {user.map((itens) =>
                itens.etError ? (
                  <p className="showmsg" key={itens}>
                    {itens.etError}
                  </p>
                ) : null
              )}
              <label htmlFor="premium">Premium:</label>
              <select name="premium" id="premium" defaultValue="0" required>
                <option value="0">Padrão</option>
                <option value="1">Vip</option>
                <option value="2">Premium</option>
              </select>

              <label htmlFor="date">Data de expiração:</label>
              <input name="date" id="date" type="date" required />

              {user.map((itens) =>
                itens.expiredError ? (
                  <p className="showmsg" key={itens}>
                    {itens.expiredError}
                  </p>
                ) : null
              )}

              <button type="submit" onClick={saveUser}>
                Cadastrar
              </button>
            </form>
          </>
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
              <output className="msgs" />
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
              <output className="msgs" />
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
                }/meu-perfil/${createdId}/${createdName
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
