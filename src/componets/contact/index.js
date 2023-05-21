import * as React from 'react';
import * as IconFa from 'react-icons/fa';
import * as IconMd from 'react-icons/md';
import './contact.css';

export default function Contact() {
  document.querySelector(
    'title'
  ).innerText = `Nossos Contatos - ${process.env.REACT_APP_URL_DOMINIO}`;
  return (
    <main className="contactContainer">
      <div className="top">
        <IconFa.FaPhoneAlt />
        <h1>Contato</h1>
      </div>
      <div>
        <h2>Informações:</h2>
        <p>
          Nossos contatos são para anúncios e não para tirar dúvidas sobre um
          anunciante. Qualquer dúvida sobre o anunciante entre contato em seu
          perfil de anúncio.
        </p>
        <small>
          Qualquer tentativa de contato suspeita, será denunciado e bloqueado.
          Todos os contatos são para fins de divulgação e atendimento.
        </small>
      </div>
      <div>
        <nav>
          <li>
            <a href="tel:+" aria-label="phone contact" title="phone contact">
              <IconFa.FaPhone />
              Telefone
            </a>
          </li>
          <li>
            <a
              href="mailto:acompanhantesdorn@gmail.com"
              aria-label="E-mail"
              title="E-mail">
              <IconMd.MdAlternateEmail /> E-mail
            </a>
          </li>
          <li>
            <a href="/" aria-label="Chat on Whatsapp" title="Chat on Whatsapp">
              <IconFa.FaWhatsapp />
              Whatsapp
            </a>
          </li>
          <li>
            <a href="/" aria-label="Instagram" title="Instagram">
              <IconFa.FaInstagram />
              Instagram
            </a>
          </li>
          <li>
            <a href="/" aria-label="Twitter" title="Twitter">
              <IconFa.FaTwitter />
              Twitter
            </a>
          </li>
        </nav>
      </div>
    </main>
  );
}
