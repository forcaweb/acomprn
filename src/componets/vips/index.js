import * as React from 'react';
import * as IconsRi from 'react-icons/ri';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.min.css';

import './vips.css';

export default function Vips() {
  const [userPremiumData, setUserPremiumData] = React.useState([]);
  const usersVip = async () => {
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
  if (userPremiumData.length <= 0) usersVip();
  return (
    <main className="vipsContainer">
      <Swiper
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 5000
        }}
        loop
        modules={[Pagination, Autoplay]}
        className="mySwiper">
        {userPremiumData.map((itens) =>
          Number(itens.active) === 1 &&
          Number(itens.premium) === 2 &&
          itens.photos.length > 0 ? (
            <SwiperSlide key={itens.id}>
              <article>
                <div className="imgvip">
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
                  <IconsRi.RiVipCrown2Fill
                    className="star"
                    alt={`Garota Premium ${itens.name}`}
                    title={`Garota Premium ${itens.name}`}
                  />
                </div>
                <div className="descvip">
                  <small>
                    <strong>Garota Premium</strong>.
                  </small>
                  <h2>{itens.name}</h2>
                  <p className="biography">
                    <strong>Biografia:</strong>
                    {itens.biography}
                  </p>
                  <p>
                    <strong>Idade:</strong>
                    {itens.age} anos.
                  </p>
                  <p>
                    <strong>Cidade/Estado:</strong>
                    {itens.andressrelations[0].andress.city_and_state}
                  </p>
                  <p>
                    <strong>Altura:</strong>
                    {itens.height} cm.
                  </p>
                  <p>
                    <strong>Peso:</strong>
                    {itens.weight} kg.
                  </p>
                  <a
                    href={`/${itens.callTypesrelations[0].typecall.name
                      .replaceAll(' ', '-')
                      .toLowerCase()}/${itens.id}/${itens.name.replaceAll(
                      ' ',
                      '-'
                    )}`}>
                    Ver Perfil
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </main>
  );
}
