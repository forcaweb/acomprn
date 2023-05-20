import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import './policy.css';

export default function PrivacyPolicy() {
  document.querySelector('title').innerText =
    'Políticas & Privacidade - aschiquesdebsb.com.br';
  return (
    <main className="policyContainer">
      <div className="top">
        <IconsMd.MdOutlinePrivacyTip />
        <h2>Política de privacidade</h2>
      </div>
      <article>
        <h1>Quem somos</h1>
        <small>
          O endereço do nosso site é: {process.env.REACT_APP_URL_BASE}.
        </small>

        <h2>Clientes</h2>
        <p>O Site será utilizado pelas seguintes categorias de usuários:</p>
        <ul>
          <li>
            Um visitante do Site que não cria uma conta no Site e não pode
            enviar nenhum vídeo;
          </li>
          <li>
            Um usuário do Site que cria uma conta e faz upload de vídeos ou
            outro material;
          </li>
          <li>
            Um usuário do Site que cria uma conta e participa da divisão de
            receitas.
          </li>
        </ul>

        <h2>Multimédia</h2>
        <p>
          Ao carregar imagens para o site, deve evitar carregar imagens com
          dados incorporados de geolocalização (EXIF GPS). Os visitantes podem
          descarregar e extrair os dados de geolocalização das imagens do site.
        </p>

        <h2>Informações que você nos fornece.</h2>
        <ul>
          <li>
            seu nome, incluindo nome e sobrenome, sexo, data de nascimento,
            endereço de e-mail, endereço de cobrança, nome de usuário, senha,
            fotografia, nacionalidade e país de residência, etc.;
          </li>
          <li>
            informações pessoais adicionais (por exemplo, dados que reflitam ou
            digam respeito à orientação sexual de uma pessoa física).
          </li>
        </ul>

        <h2>COMO USAMOS AS INFORMAÇÕES QUE COLETAMOS</h2>
        <p>
          Os artigos neste site podem incluir conteúdo incorporado (por exemplo:
          vídeos, imagens, artigos, etc.). O conteúdo incorporado de outros
          sites comporta-se tal como se o utilizador visitasse esses sites.
        </p>

        <p>
          Este site pode recolher dados sobre si, usar cookies, incorporar
          rastreio feito por terceiros, monitorizar as suas interacções com o
          mesmo, incluindo registar as interacções com conteúdo incorporado se
          tiver uma conta e estiver com sessão iniciada nesse site.
        </p>

        <h2>Com quem são partilhados os seus dados</h2>
        <p>
          Se solicitar uma redefinição de senha, o seu endereço de IP será
          incluído no email de redefinição.
        </p>

        <h2>Que direitos tem sobre os seus dados</h2>
        <p>
          Se tiver uma conta neste site, pode pedir para receber um ficheiro de
          exportação com os dados pessoais guardados sobre si, incluindo
          qualquer dado pessoal que indicou. Também pode solicitar que os dados
          guardados sejam eliminados. Isto não inclui qualquer dado pessoal que
          seja obrigatório manter para fins administrativos, legais ou de
          segurança.
        </p>

        <p>
          Dúvidas? fale conosco:{' '}
          <a href="/contact" aria-label="Contato">
            clique aqui.
          </a>
        </p>
      </article>
    </main>
  );
}
