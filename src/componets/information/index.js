import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as IconsIm from 'react-icons/im';
import * as IconsIo from 'react-icons/io';
import * as IconsGi from 'react-icons/gi';
import * as IconsRi from 'react-icons/ri';
import * as IconsFa from 'react-icons/fa';
import './information.css';

export default function Information() {
  const { id } = useParams();
  const [userData, setUserData] = React.useState([]);
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

  const userPost = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/user/${id}`,
        method: 'GET',
        headers
      }).then((resp) => {
        if (!resp.data.user) {
          window.location.href = '/';
          return;
        }
        setUserData(resp.data.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (partners.length <= 0) getPartners();
  });

  if (userData.length <= 0) {
    userPost();
  } else {
    const num = userData[0].phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
    document.querySelector(
      'title'
    ).innerHTML = `${userData[0].name}, ${userData[0].age} anos, Contato: ${num}, ${process.env.REACT_APP_URL_DOMINIO}.`;
  }
  return (
    <div>
      {userData.length > 0 ? (
        <section className="infoContainer fadeEffect">
          {Number(userData[0].active) === 0 ? (
            <p>Conta temporariamente inativa.</p>
          ) : (
            <article>
              <h1>{userData[0].name}</h1>
              <p>
                {userData[0].biography}
                <small>
                  <span>
                    <IconsIm.ImWoman /> Idade: {userData[0].age} |
                  </span>
                  <span>
                    <IconsGi.GiBodyHeight /> Altura: {userData[0].height} cm |{' '}
                  </span>
                  <span>
                    <IconsFa.FaBalanceScale /> Peso: {userData[0].weight} kg |
                  </span>
                  {userData[0].schedules === userData[0].endofday ? (
                    <span>
                      <IconsIo.IoIosTime /> Horário: 24 Hr
                    </span>
                  ) : (
                    <span>
                      <IconsIo.IoIosTime /> Horários: {userData[0].schedules} Hr
                      - {userData[0].endofday} Hr
                    </span>
                  )}
                </small>
              </p>
              <h2>Fotos</h2>
              <div className="imgs">
                {userData[0].photos.map((itens) => (
                  <img
                    key={itens.id}
                    crossOrigin="anonymous"
                    src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.name}`}
                    alt={`Acompanhante ${userData[0].name}`}
                    title={`Acompanhante ${userData[0].name}`}
                  />
                ))}
              </div>
              {userData[0].videos.length > 0 ? (
                <>
                  <h2>Videos</h2>
                  <div className="video">
                    {userData[0].videos.map((itens) => (
                      <video
                        key={itens.id}
                        crossOrigin="anonymous"
                        alt={`Acompanhante ${userData[0].name}`}
                        title={`Acompanhante ${userData[0].name}`}
                        poster="/imgs/p.jpg"
                        controls>
                        <source
                          src={`${process.env.REACT_APP_API_URL}/public/uploads/${itens.name}`}
                          type="video/mp4"
                        />
                        <track
                          src="captions_en.vtt"
                          kind="captions"
                          srcLang="en"
                          label="english_captions"
                        />
                      </video>
                    ))}
                  </div>
                </>
              ) : null}
              <p>
                Categoria:{' '}
                <strong>{`${userData[0].callTypesrelations[0].typecall.name}`}</strong>
              </p>
              <p>
                Atendo:{' '}
                <strong>{`${userData[0].tOCRelations[0].typesOfCustomers.typesOfCustomers}`}</strong>
              </p>
              <p>
                Locais de atendimentos:{' '}
                <strong>{`${userData[0].servicelocations}`}</strong>
              </p>
              <p>
                Endereço:{' '}
                {userData[0].andressrelations.map((itens) => (
                  <strong key={itens}>
                    {`${itens.andress.city_and_state}`}
                  </strong>
                ))}
              </p>
              <h2>Contatos</h2>
              <div className="contact">
                <nav>
                  <label htmlFor="wtslink">
                    <IconsRi.RiWhatsappFill />
                  </label>
                  <a
                    id="wtslink"
                    aria-label="Chat on Whatsapp"
                    title="Chat on Whatsapp"
                    target="blank"
                    href={`https://wa.me/55${userData[0].phone.replace(
                      /\D/gim,
                      ''
                    )}?text=Ol%C3%A1%2C+vi+seu+an%C3%BAncio+no+site+aschiquesdebsb.com.br.+Quero+bater+um+papo+com+voc%C3%AA.`}>
                    Whatsapp <IconsRi.RiArrowRightSLine />
                  </a>
                </nav>
                <nav>
                  <label htmlFor="telllink">
                    <IconsRi.RiPhoneFill />
                  </label>
                  <a
                    id="telllink"
                    aria-label="Call on tell"
                    title="Call on tell"
                    href={`tel:+55${userData[0].phone.replace(/\D/gim, '')}`}>
                    Telefone <IconsRi.RiArrowRightSLine />
                  </a>
                </nav>
              </div>
              <section className="content">
                <div className="divisor">
                  <h2>Parcerias & Publicidades</h2>
                </div>
                {partners.error === null ? (
                  <p>Postaremos em breve...</p>
                ) : (
                  <div className="cardContainer partners">
                    {partners.map((itens) => (
                      <article className="card">
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
                {/* <div className="divisor">
                  <h2>Publicidades</h2>
                </div>
                <div id="sp_7992546_node">&nbsp;</div> */}
              </section>
            </article>
          )}
        </section>
      ) : null}
    </div>
  );
}
