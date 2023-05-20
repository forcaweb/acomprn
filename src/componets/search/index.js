import * as React from 'react';
import axios from 'axios';
import * as IconsRi from 'react-icons/ri';
import * as IconsMd from 'react-icons/md';
import './search.css';
import { useParams } from 'react-router-dom';

export default function SearchAds() {
  document.querySelector('title').innerText =
    'Pesquisar - aschiquesdebsb.com.br';
  const [usersLastPost, setUsersLastPost] = React.useState([]);

  const { qadrs, qtc } = useParams();

  const querytc = qtc.replaceAll('-', ' ');
  let querycity = qadrs.replaceAll('-', ' ');
  querycity = `${querycity.substring(
    0,
    querycity.length - 2
  )}-${querycity.substring(querycity.length - 2)}`.replaceAll(' -', '-');

  const querytcselected = qtc.replaceAll(' ', '-').toLowerCase();
  const querycityselected = qadrs
    .replaceAll(' ', '-')
    .replaceAll('---', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const [selectedAndress, setSelectedAndress] =
    React.useState(querycityselected);
  const [andress, setAndress] = React.useState([]);
  const [TOC, setTOC] = React.useState([]);
  const [selectedCall, setSelectedCall] = React.useState(querytcselected);
  const [typeCalls, setTypeCalls] = React.useState([]);

  const handleChangeAndress = (event) => {
    setSelectedAndress(event.target.value);
  };

  const handleChangeCall = (event) => {
    setSelectedCall(event.target.value);
  };

  const listCallsPost = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setTypeCalls(resp.data.typesCalls);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const listAndressPost = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setAndress(resp.data.andress);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const listTOCPost = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tocs/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setTOC(resp.data.typesOfCustomers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const listLastPost = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/users/andress=${querycity}&tc=${querytc}`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUsersLastPost(resp.data.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goToSearch = () => {
    const tc = document.getElementById('tc').value;
    const city = document.getElementById('city').value;
    const querytccamp = tc.replaceAll(' ', '-').toLowerCase();
    const querycitycamp = city
      .replaceAll(' ', '-')
      .replaceAll('---', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (tc === '' || city === '') return;
    window.location.href = `/search/${querycitycamp}/${querytccamp}
    `;
  };

  React.useEffect(() => {
    if (usersLastPost !== null) {
      if (usersLastPost.length <= 0) listLastPost();
    }

    if (TOC.length <= 0) listTOCPost();
    if (andress.length <= 0) listAndressPost();
    if (typeCalls.length <= 0) listCallsPost();
  });

  return (
    <main className="homeContainer fadeEffect">
      <section className="headerInitialSearch">
        <form action="/" method="Post" onChange={goToSearch}>
          <div className="divisor">
            <h2>Pesquisar:</h2>
          </div>
          <div className="campsForms">
            <label htmlFor="tc">Categoria: </label>
            <select
              name="tc"
              id="tc"
              value={selectedCall}
              onChange={handleChangeCall}>
              <option value="" disabled>
                Selecione uma Categoria...
              </option>
              {typeCalls.map((option) => (
                <option
                  key={option.id}
                  value={option.name.replaceAll(' ', '-').toLowerCase()}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="campsForms">
            <label htmlFor="city">End.: </label>
            <select
              name="city"
              id="city"
              value={selectedAndress}
              onChange={handleChangeAndress}>
              <option value="" disabled>
                Selecione um Endereço...
              </option>
              {andress.map((option) => (
                <option
                  key={option.id}
                  value={option.city_and_state
                    .replaceAll(' ', '-')
                    .replaceAll('---', '-')
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()}>
                  {option.city_and_state}
                </option>
              ))}
            </select>
          </div>
        </form>
      </section>
      <section className="content">
        <div className="intro">
          <h2>Aviso</h2>
          <p>
            Este site são para maiores de 18 anos. Qualquer uso de menores sem a
            observação dos seus pais, não será de responsabilidade nossa.
          </p>
        </div>
        <div className="divisor">
          <h2>Resultados da Pesquisa</h2>
        </div>
        {usersLastPost === null ? (
          <div className="cardContainer search">
            <output className="errorSearch">
              <h3>Desculpe...</h3>
              <p>Nenhum resultado encontrado.</p>
            </output>
          </div>
        ) : (
          <div className="cardContainer">
            {usersLastPost.map((itens) =>
              Number(itens.premium) === 2 &&
              Number(itens.active) === 1 &&
              itens.photos.length > 0 ? (
                <article key={itens.id} className="card">
                  <a
                    href={`/${itens.callTypesrelations[0].typecall.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}/${itens.id}/${itens.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}`}>
                    {itens.photos.map((photoActive) =>
                      photoActive.perfil === 'active' ? (
                        <img
                          crossOrigin="anonymous"
                          src={`${process.env.REACT_APP_API_URL}/public/uploads/${photoActive.name}`}
                          alt={itens.name}
                          decoding="async"
                          key={photoActive.id}
                        />
                      ) : null
                    )}
                    <h2>{itens.name}</h2>
                  </a>
                  <div className="premium_icon">
                    <IconsRi.RiVipCrown2Fill
                      alt={`Garota Premium ${itens.name}`}
                      title={`Garota Premium ${itens.name}`}
                    />
                    Premium
                  </div>
                </article>
              ) : null
            )}

            {usersLastPost.map((itens) =>
              Number(itens.premium) === 1 &&
              Number(itens.active) === 1 &&
              itens.photos.length > 0 ? (
                <article key={itens.id} className="card">
                  <a
                    href={`/${itens.callTypesrelations[0].typecall.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}/${itens.id}/${itens.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}`}>
                    {itens.photos.map((photoActive) =>
                      photoActive.perfil === 'active' ? (
                        <img
                          crossOrigin="anonymous"
                          src={`${process.env.REACT_APP_API_URL}/public/uploads/${photoActive.name}`}
                          alt={itens.name}
                          decoding="async"
                          key={photoActive.id}
                        />
                      ) : null
                    )}
                    <h2>{itens.name}</h2>
                  </a>
                  <div className="vip_icon">
                    <IconsRi.RiVipFill
                      alt={`Garota Vip ${itens.name}`}
                      title={`Garota Vip ${itens.name}`}
                    />
                    Vip
                  </div>
                </article>
              ) : null
            )}

            {usersLastPost.map((itens) =>
              Number(itens.premium) === 0 &&
              itens.photos.length > 0 &&
              Number(itens.active) === 1 ? (
                <article key={itens.id} className="card">
                  <a
                    href={`/${itens.callTypesrelations[0].typecall.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}/${itens.id}/${itens.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}`}>
                    {itens.photos.map((photoActive) =>
                      photoActive.perfil === 'active' ? (
                        <img
                          crossOrigin="anonymous"
                          src={`${process.env.REACT_APP_API_URL}/public/uploads/${photoActive.name}`}
                          alt={itens.name}
                          decoding="async"
                          key={photoActive.id}
                        />
                      ) : null
                    )}
                    <h2>{itens.name}</h2>
                  </a>
                  <div className="normal_icons">
                    <IconsMd.MdOutlinePerson
                      alt={`Garota Padrão ${itens.name}`}
                      title={`Garota Padrão ${itens.name}`}
                    />
                    Padrão
                  </div>
                </article>
              ) : null
            )}

            {usersLastPost.map((itens) =>
              itens.photos.length <= 0 && Number(itens.active) === 1 ? (
                <article key={itens.id} className="card">
                  <a
                    href={`/${itens.callTypesrelations[0].typecall.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}/${itens.id}/${itens.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}`}>
                    {itens.photos.map((photoActive) =>
                      photoActive.perfil === 'active' ? (
                        <img
                          crossOrigin="anonymous"
                          src={`${process.env.REACT_APP_API_URL}/public/uploads/${photoActive.name}`}
                          alt={itens.name}
                          decoding="async"
                          key={photoActive.id}
                        />
                      ) : null
                    )}
                    <h2>{itens.name}</h2>
                  </a>
                </article>
              ) : null
            )}
          </div>
        )}
        <div className="divisor">
          <h2>Ajude o site clicando nas Publicidades</h2>
        </div>
        <div id="sp_7992546_node">&nbsp;</div>
      </section>
    </main>
  );
}
