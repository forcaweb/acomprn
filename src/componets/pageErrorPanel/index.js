import * as React from 'react';
import './epp.css';

export default function ErrorPanelPage() {
  const backLogin = () => {
    const countTime = setInterval(() => {
      window.location.href = '/login';
      clearInterval(countTime);
    }, 3000);
  };
  backLogin();
  return (
    <main className="epp">
      <h1>Sua conta foi deslogada</h1>
      <p>Será direcionado em breve...</p>
      <a href="/" aria-label="back site">
        Voltar para o site
      </a>
    </main>
  );
}
