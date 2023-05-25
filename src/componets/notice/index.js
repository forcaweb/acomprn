import * as React from 'react';
import * as IconsAi from 'react-icons/ai';
import './notice.css';

export default function Notice() {
  const saveClick = () => {
    const notice = document.querySelector('#notice');
    const dateExpired = '2023-08-01 23:00';
    const formatDateExpired = new Date(dateExpired);
    const compareDates = formatDateExpired.getTime() - Number(Date.now());
    localStorage.setItem('XCLK', true);
    if (compareDates <= 0) {
      notice.style.display = 'none';
    }
  };

  const handleClick = () => {
    const close = document.querySelector('#close');
    const closeIcon = document.querySelector('#close-icon');
    const notice = document.querySelector('#notice');
    const itemStoregy = localStorage.getItem('XCLK');
    if (itemStoregy) notice.style.display = 'none';
    document.addEventListener('click', (e) => {
      if (e.target === close) {
        notice.style.display = 'none';
        saveClick();
      }
      if (e.target === closeIcon) {
        notice.style.display = 'none';
        saveClick();
      }
      if (e.target === notice) {
        notice.style.display = 'none';
        saveClick();
      }
    });
  };
  React.useEffect(() => {
    document.onload = handleClick();
  });
  return (
    <div className="notice" id="notice">
      <div className="content">
        <button type="button" id="close" title="Fechar">
          <IconsAi.AiOutlineClose id="close-icon" />
        </button>
        <a
          href="https://wa.me/5584996338660?text=Ol%C3%A1%2C+tudo+bem%3F+quero+falar+com+um+atendente."
          aria-label="Promoção Acompanhantes do RN"
          title="Promoção Acompanhantes do RN">
          <img src="./imgs/notice.jpg" alt="Promoção Acompanhantes do RN" />
        </a>
      </div>
    </div>
  );
}
