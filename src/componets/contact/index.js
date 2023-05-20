import * as React from 'react';
import * as IconFa from 'react-icons/fa';
import * as IconMd from 'react-icons/md';
import './contact.css';

export default function Contact() {
  document.querySelector('title').innerText =
    'Nossos Contatos - aschiquesdebsb.com.br';
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
            <a
              href="tel:+5561982706346"
              aria-label="phone contact"
              title="phone contact">
              <IconFa.FaPhone />
              Telefone
            </a>
          </li>
          <li>
            <a
              href="mailto:aschiquesdebsbanuncios@gmail.com"
              aria-label="E-mail"
              title="E-mail">
              <IconMd.MdAlternateEmail /> E-mail
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5561982706346?text=Ol%C3%A1%2C+tudo+bem%3F+quero+falar+com+um+atendente."
              aria-label="Chat on Whatsapp"
              title="Chat on Whatsapp">
              <IconFa.FaWhatsapp />
              Whatsapp
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/aschiquesdebrasilia/"
              aria-label="Instagram"
              title="Instagram">
              <IconFa.FaInstagram />
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/aschiquesdebsb"
              aria-label="Twitter"
              title="Twitter">
              <IconFa.FaTwitter />
              Twitter
            </a>
          </li>
        </nav>
      </div>
    </main>
  );
}
