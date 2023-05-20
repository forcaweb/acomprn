import * as React from 'react';
import * as IconsBi from 'react-icons/bi';
import './page404.css';

export default function Page404() {
  document.querySelector('title').innerText =
    'Error 404 - aschiquesdebsb.com.br';
  return (
    <main className="error404">
      <IconsBi.BiErrorAlt />
      <h2>Error 404</h2>
      <p>Page dont exist!</p>
    </main>
  );
}
