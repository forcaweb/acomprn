import * as React from 'react';
import * as IconsRi from 'react-icons/ri';
import * as IconsAi from 'react-icons/ai';
import axios from 'axios';
import './home.css';
import Vips from '../vips';
import Sociais from '../sociais/lindex';
import Notice from '../notice';

export default function Home() {
  const [usersLastPost, setUsersLastPost] = React.useState([]);
  const [userPremiumData, setUserPremiumData] = React.useState([]);
  const [userMTData, setUserMTData] = React.useState([]);
  const [userVipData, setUserVipData] = React.useState([]);

  const [selectedAndress, setSelectedAndress] = React.useState('');
  const [andress, setAndress] = React.useState([]);
  const [TOC, setTOC] = React.useState([]);
  const [selectedCall, setSelectedCall] = React.useState('');
  const [typeCalls, setTypeCalls] = React.useState([]);
  const [partners, setPartners] = React.useState([]);
  const getPartners = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/partners`,
        method: 'GET',
        headers
      }).then((resp) => {
        setPartners(resp.data[0].partner);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const usersMT = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/mt`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUserMTData(resp.data.usermt);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const usersPremium = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/premium`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUserPremiumData(resp.data.userspremium);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const usersVip = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/vip`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUserVipData(resp.data.usersvip);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        url: `${process.env.REACT_APP_API_URL}/users/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setUsersLastPost(resp.data.accounts);
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
    if (usersLastPost.length <= 0) listLastPost();
    if (TOC.length <= 0) listTOCPost();
    if (andress.length <= 0) listAndressPost();
    if (typeCalls.length <= 0) listCallsPost();
    if (userPremiumData.length <= 0) usersPremium();
    if (userVipData.length <= 0) usersVip();
    if (userMTData.length <= 0) usersMT();
    if (partners.length <= 0) getPartners();
  }, []);

  return (
    <>
      <Sociais />
      {localStorage.getItem('XCLK') ? null : <Notice />}
      <main className="homeContainer fadeEffect">
        <section className="headerInitial">
          <h1 title="Acompanhantes do Rio Grande do Norte">
            Acompanhantes do RN
          </h1>
          <p>Mulheres lindas e formosas. Encontre a ideal em sua região.</p>
        </section>
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
                  <option key={option.id} value={option.name}>
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
                  <option key={option.id} value={option.city_and_state}>
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
              Este site são para maiores de 18 anos. Qualquer uso de menores sem
              a observação dos seus pais, não será de responsabilidade nossa.
            </p>
          </div>
          <Vips />
          <div className="divisor">
            <h2>Postagens Recentes</h2>
          </div>
          {usersLastPost.length > 1 ? (
            <div className="cardContainer">
              {usersLastPost.map((itens) =>
                itens.photos.length > 0 && Number(itens.active) === 1 ? (
                  <article key={itens.id} className="card" title={itens.name}>
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
                            key={itens.id}
                          />
                        ) : null
                      )}

                      <h2>{itens.name}</h2>
                    </a>
                    <div className="new_icons">
                      <IconsAi.AiOutlineFire
                        alt={`Novidade: ${itens.name}`}
                        title={`Novidade: ${itens.name}`}
                      />
                      Novidade
                    </div>
                  </article>
                ) : null
              )}
            </div>
          ) : (
            <p>Postaremos em breve...</p>
          )}

          <div className="divisor">
            <h2>Postagens Recentes Premium</h2>
          </div>
          {userPremiumData.length > 1 ? (
            <div className="cardContainer">
              {userPremiumData.map((itens) =>
                Number(itens.active) === 1 &&
                Number(itens.premium) === 2 &&
                itens.photos.length > 0 ? (
                  <article key={itens.id} className="card" title={itens.name}>
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
                            key={itens.id}
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
            </div>
          ) : (
            <p>Postaremos em breve...</p>
          )}

          <div className="divisor">
            <h2>Postagens Recentes Vip</h2>
          </div>
          {userVipData.length > 1 ? (
            <div className="cardContainer">
              {userVipData.map((itens) =>
                Number(itens.active) === 1 &&
                Number(itens.premium) === 1 &&
                itens.photos.length > 0 ? (
                  <article key={itens.id} className="card" title={itens.name}>
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
                            key={itens.id}
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
            </div>
          ) : (
            <p>Postaremos em breve...</p>
          )}

          {userMTData.length > 0 ? (
            <>
              <div className="divisor">
                <h2>Massagistas & Terapeutas</h2>
              </div>
              {userMTData[0].error === null ? (
                <p>Postaremos em breve...</p>
              ) : (
                <div className="cardContainer">
                  {userMTData.map((itens) =>
                    itens.photos.length > 0 && Number(itens.active) === 1 ? (
                      <article
                        key={itens.id}
                        className="card"
                        title={itens.name}>
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
                                key={itens.id}
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
            </>
          ) : null}
          <div className="divisor">
            <h2>Parcerias & Publicidades</h2>
          </div>
          {partners.error === null ? (
            <p>Postaremos em breve...</p>
          ) : (
            <div className="cardContainer partners">
              {partners.map((itens) => (
                <article className="card" key={itens.id}>
                  <a href={itens.linksite} target="blank">
                    <img
                      crossOrigin="anonymous"
                      src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.image}`}
                      alt={itens.name}
                      title={itens.name}
                      decoding="async"
                    />
                  </a>
                </article>
              ))}
            </div>
          )}
          <div className="divisor">
            <h2>Publicidades</h2>
          </div>
          <div id="sp_7995050_node">&nbsp;</div>
        </section>
      </main>
    </>
  );
}
