import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import './about.css';

export default function About() {
  document.querySelector('title').innerText =
    'Sobre nós - aschiquesdebsb.com.br';
  return (
    <main className="aboutContainer">
      <div className="top">
        <IconsMd.MdQuickreply />
        <h2>Sobre</h2>
      </div>
      <article>
        <h1>Sobre nossos trabalhos</h1>
        <small>Abaixo veja nossas normas e tire suas dúvidas.</small>

        <h2>Antes de anúnciar, o que não pode ser anuniado:</h2>
        <p>
          <IconsMd.MdNotInterested /> Proibido anúncios que fale sobre politica.
        </p>
        <p>
          <IconsMd.MdNotInterested /> Proibido anúncios que relate abuso
          infantil.
        </p>
        <p>
          <IconsMd.MdNotInterested /> Proibido anúncios que relate estrupo.
        </p>
        <p>
          <IconsMd.MdNotInterested /> Proibido anúncios que relate zoofilia.
        </p>
        <p>
          <IconsMd.MdNotInterested /> Fotos com roupas sem marcas famosas.
        </p>

        <p>
          <IconsMd.MdOutlineInfo /> Informações sujeitas a alterações.
        </p>

        <h2>Quem somos:</h2>
        <p>
          Nosso site foi criado no intuito de da espaço para os anunciantes,
          crie seu perfil profissional e consiga clientes. Não somos uma agência
          de modelos ou de garotas de programas ou demais assuntos dos mesmos.
          Somos um site de anúncios adultos. Falar conosco,{' '}
          <a href="/contact">Clique aqui</a>
        </p>
      </article>
    </main>
  );
}
