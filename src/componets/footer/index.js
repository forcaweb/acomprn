import * as React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="content">
        <p>
          <strong>Acompanhantes do RN</strong>, as melhores acompanhantes do RN
          estão aqui. Sinta-se em casa e escolha o melhor prato de nosso buffet.
          Mulheres lindas de todas etnias.
        </p>
      </div>
      <div className="credit">
        <p>
          Todos os direitos reservados: Acompanhantes do RN. Site desenvolvido
          por <a href="https://forcaweb.net">Força Web</a>.
        </p>
      </div>
    </footer>
  );
}
