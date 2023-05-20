import * as React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="content">
        <p>
          <strong>As chiques de Brasilia</strong>, as melhores acompanhantes
          estão aqui. Sinta-se em casa e escolha o melhor prato de nosso buffet.
          Mulheres lindas de todas etnias. Este site é conteúdo adulto. Qualquer
          uso de menores de idade, não será responsabilidade nossa.
        </p>
      </div>
      <div className="credit">
        <p>
          Todos os direitos reservados: As chiques de Brasilia. Site
          desenvolvido por <a href="https://forcaweb.net">Força Web</a>.
        </p>
      </div>
    </footer>
  );
}
