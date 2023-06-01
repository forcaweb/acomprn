import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import * as IconFa from 'react-icons/fa';
import './ads.css';

export default function AdsClient() {
  document.querySelector(
    'title'
  ).innerText = `Anuncie agora! - ${process.env.REACT_APP_URL_DOMINIO}`;
  return (
    <main className="adsContainer">
      <div className="top">
        <IconsMd.MdOutlineAdsClick />
        <h2>Anuncie agora</h2>
      </div>
      <div>
        <h2>Informações:</h2>
        <p>Leia o que não pode ser postado:</p>
        <a href="/about">Dúvidas e Respostas</a>
        <p>Leia a política de nosso site:</p>
        <a href="/policy">Política e Privacidade</a>
        <h2>Contatos:</h2>

        <a
          id="wts"
          href={process.env.REACT_APP_URL_WHATSAPP}
          aria-label="Chat on Whatsapp"
          title="Chat on Whatsapp">
          <IconFa.FaWhatsapp />
        </a>
      </div>
    </main>
  );
}
