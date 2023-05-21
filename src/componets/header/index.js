import * as React from 'react';
import * as IconRi from 'react-icons/ri';
import * as IconAi from 'react-icons/ai';
import './header.css';
import MenuSm from './menusm';

export default function Header() {
  const handleMenuMobile = (e) => {
    e.preventDefault();
    const menu = document.querySelector('.menusm');
    menu.classList.toggle('show');
  };

  return (
    <header className="headerContainer" id="headerContainer">
      <MenuSm />
      <nav>
        <li>
          <a href="/" id="logo" title="Logo oficial" alt="Logo oficial">
            <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="Logo" />
          </a>
        </li>
      </nav>
      <nav id="menu">
        <li>
          <a href="/" title="Página inicial" alt="Página inicial">
            <IconAi.AiFillHome /> Home
          </a>
        </li>
        <li>
          <a
            href="/policy"
            title="Politicas de privacidade"
            alt="Politicas de privacidade">
            Politicas de privacidade
          </a>
        </li>
        <li>
          <a href="/about" title="Sobre a empresa" alt="Sobre a empresa">
            Dúvidas e Respostas
          </a>
        </li>
        <li>
          <a href="/contact" title="Contatos" alt="Contatos">
            Contatos
          </a>
        </li>
        <li>
          <a href="/payment-login" title="Financeiro" alt="Financeiro">
            Financeiro
          </a>
        </li>
      </nav>
      <nav id="menuMobile">
        <li>
          <a href="/" onClick={handleMenuMobile}>
            <IconRi.RiMenu3Line />
          </a>
        </li>
      </nav>
      <nav id="menuAds">
        <li>
          <a href="/ads" title="Anuncie agora" alt="Anuncie agora">
            Anunciar
          </a>
        </li>
        <li>
          {localStorage.getItem('token') ? (
            <a href="/panel">Painel</a>
          ) : (
            <a href="/login">Entrar</a>
          )}
        </li>
      </nav>
    </header>
  );
}
