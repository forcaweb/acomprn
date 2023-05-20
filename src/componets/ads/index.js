import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import * as IconFa from 'react-icons/fa';
import './ads.css';

export default function AdsClient() {
  document.querySelector('title').innerText =
    'Anuncie agora! - aschiquesdebsb.com.br';
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
          href="https://wa.me/5561981936266?text=Ol%C3%A1%2C+tudo+bem%3F+quero+falar+com+um+atendente."
          aria-label="Chat on Whatsapp"
          title="Chat on Whatsapp">
          <IconFa.FaWhatsapp />
        </a>
      </div>
    </main>
  );
}
