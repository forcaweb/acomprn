import * as React from 'react';
import '../pageErrorPanel/epp.css';

export default function LogoutPaymentPage() {
  const backLogin = () => {
    const countTime = setInterval(() => {
      window.location.href = '/payment-login';
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
