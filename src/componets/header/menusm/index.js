import * as React from 'react';
import * as IconAi from 'react-icons/ai';
import '../header.css';

export default function MenuSm() {
  const clickedContainer = () => {
    document.addEventListener('click', (e) => {
      const menusm = document.querySelector('.menusm');
      if (e.target === menusm) menusm.classList.toggle('show');
    });
  };

  React.useEffect(() => {
    document.onload = clickedContainer();
  });
  return (
    <header className="menusm">
      <div className="menucontainersm">
        <nav>
          <li>
            <a href="/" id="logo">
              <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="Logo" />
            </a>
          </li>
        </nav>
        <nav id="menusm">
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
        <nav id="menuAdssm">
          <li>
            <a href="/ads">Anunciar</a>
          </li>
          <li>
            {localStorage.getItem('token') ? (
              <a href="/panel">Painel</a>
            ) : (
              <a href="/login">Entrar</a>
            )}
          </li>
        </nav>
      </div>
    </header>
  );
}
