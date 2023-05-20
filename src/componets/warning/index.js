import * as React from 'react';
import './warning.css';

export default function WarningSite() {
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('WarningResp', true);
    document.getElementById('WarningResp').classList.add('hide');
  };
  return (
    <main className="warningContainer" id="WarningResp">
      <div className="box">
        <div className="text">
          <h2>Aviso: Este site é 18+</h2>
          <p>
            O uso deste site são para maiores de 18 anos. Em caso de menores de
            idade sem supervisão dos pais acessar, não sera de nossa
            responsabilidade.
          </p>
        </div>
        <div className="text">
          <h2>Aviso: Políticas de Privacidade</h2>
          <p>
            Ao clicar em concordo, você está de acordo que o site
            aschiquesdebsb.com.br, pode salvar seus dados em cookies e sessões.
          </p>
        </div>
        <div className="question">
          <button type="button" onClick={handleClick}>
            Eu Concordo
          </button>
        </div>
      </div>
    </main>
  );
}
