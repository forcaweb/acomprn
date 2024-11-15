import * as React from 'react';
import * as IconsFa from 'react-icons/fa';
import './sociais.css';

export default function Sociais() {
  return (
    <div className="sociais">
      <div className="title">Siga-nos</div>
      <div className="twitter">
        <a
          href={process.env.REACT_APP_URL_TWITTER}
          target="blank"
          aria-label="Seguir no Twitter"
          title="Seguir no Twitter">
          <IconsFa.FaTwitter />
        </a>
      </div>
      <div className="inst">
        <a
          href={process.env.REACT_APP_URL_INSTAGRAM}
          target="blank"
          aria-label="Seguir no Instagram"
          title="Seguir no Instagram">
          <IconsFa.FaInstagram />
        </a>
      </div>
    </div>
  );
}
