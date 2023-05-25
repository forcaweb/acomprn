import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import * as IconsRi from 'react-icons/ri';
import './about.css';

export default function About() {
  document.querySelector(
    'title'
  ).innerText = `Sobre nós - ${process.env.REACT_APP_URL_DOMINIO}`;
  return (
    <main className="aboutContainer">
      <div className="top">
        <IconsMd.MdQuickreply />
        <h2>Sobre</h2>
      </div>
      <article>
        <h1>Sobre nossos trabalhos</h1>
        <small>Abaixo veja nossas normas e tire suas dúvidas.</small>
        <h2>Nossos Planos:</h2>
        <p>
          <IconsMd.MdOutlinePerson /> Padrão: R$ 100,00.
        </p>
        <p>
          <IconsRi.RiVipFill /> Vip: R$ 190,00.
        </p>
        <p>
          <IconsRi.RiVipCrown2Fill /> Premium: R$ 470,00.
        </p>

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

        <h2>O que encontrará aqui?</h2>
        <p>Olá!</p>

        <p>
          Você está em busca de momentos incríveis, envolventes e cheios de
          paixão? Então, tenho uma novidade para você! Apresento-lhe o nosso
          exclusivo site, onde encontrará um universo de experiências
          emocionantes e companhia excepcional.
        </p>

        <p>
          Se você valoriza a elegância, a inteligência e a sensualidade, o nosso
          site de acompanhantes é o lugar perfeito para você explorar. Nossas
          acompanhantes são verdadeiras musas, capazes de cativar sua atenção e
          tornar cada encontro uma lembrança inesquecível.
        </p>

        <p>
          Cada mulher em nosso site é cuidadosamente selecionada, garantindo
          beleza, charme e um alto nível de discrição. Elas são companheiras
          perfeitas para eventos sociais, jantares românticos, viagens exóticas
          ou momentos íntimos a dois.
        </p>

        <p>
          Nossa prioridade é proporcionar a você uma experiência única, baseada
          na confiança, respeito e prazer mútuo. Nosso site é um ambiente seguro
          e discreto, onde você pode explorar suas fantasias mais secretas e
          compartilhar momentos de intimidade com uma acompanhante sofisticada e
          encantadora.
        </p>

        <p>
          Então, permita-se vivenciar uma jornada fascinante com uma de nossas
          acompanhantes. Explore o nosso site e descubra um mundo de
          possibilidades e prazeres inimagináveis.
        </p>

        <p>
          Não espere mais! Dê o primeiro passo em direção a uma experiência
          verdadeiramente excepcional.
        </p>

        <p>
          Bem-vindo ao nosso site de acompanhantes - onde seus desejos se tornam
          realidade.
        </p>
      </article>
    </main>
  );
}
