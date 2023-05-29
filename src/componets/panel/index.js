import * as React from 'react';
import * as IconsCg from 'react-icons/cg';
import * as IconsAi from 'react-icons/ai';
import * as IconsBi from 'react-icons/bi';
import Moment from 'react-moment';
import 'moment-timezone';
import { useParams } from 'react-router-dom';
import './panel.css';
import axios from 'axios';
import CreateAds from './adsPages/createads';
import CreateAndress from './andressPages/createandress';

import CreateTypeCalls from './tcPages/createtc';
import DeleteAds from './adsPages/deleteads';
import UpdateAds from './adsPages/updateads';
import Welcome from './welcome';
import CreateTOC from './tOCPages/createtoc';
import DeleteAndress from './andressPages/deleteandress';
import AddMidiasUser from './midiaPages/addmidia';
import DeleteMidia from './midiaPages/delmidia';
import DeleteTypesCalls from './tcPages/deletetc';
import DeleteTypesOfCustomers from './tOCPages/deletetoc';
import CreateLogin from './loginPages/createLogin';
import DeleteLogins from './loginPages/delLogin';
import AddPartners from './partnerPages/createPartners';
import DeletePartners from './partnerPages/delPartners';
import UpdatePartners from './partnerPages/updatePartner';
import PerfilPhotosUser from './midiaPages/perfilUpdate';
import FindNameUser from './adsPages/findname';
import AddNotice from './noticePages/addNotices';
import DeleteNotice from './noticePages/delNotice';

export function showMenu(e) {
  e.preventDefault();
  const menuPanel = document.querySelector('.menuPanel');
  menuPanel.classList.toggle('showMenu');
}

export function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

export default function Panel() {
  const token = localStorage.getItem('token');
  if (!token) window.location.href = '/login';
  const getParams = () => {
    const { p } = useParams();
    return p;
  };
  const [userData, setUserData] = React.useState([]);
  document.querySelector(
    'title'
  ).innerText = `Painel de controle - ${process.env.REACT_APP_URL_DOMINIO}`;
  document.querySelector('head').innerHTML +=
    '<style> .headerContainer{display: none !important;} </style>';
  document.getElementsByTagName(
    'head'
  )[0].innerHTML += `<meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />`;
  const PageSelected = getParams();

  const getTokenData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/lg`,
        method: 'POST',
        headers
      }).then((r) => {
        if (r.data.accountError) {
          logout();
        }
        if (userData.length <= 0) setUserData(r.data.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const expandMenu = (ev) => {
    const id = ev.target.getAttribute('id');
    const dropdown = document.querySelector(`.dropdown_list_${id}`);
    dropdown.classList.toggle('expand');
  };
  getTokenData();
  return (
    <main className="panelConatiner">
      <header className="panelHeader">
        <button onClick={showMenu} type="button" className="menu">
          <IconsCg.CgMenuGridR />
        </button>
        <h1 aria-label="Titlle Page">
          <a href="/panel" aria-label="pagina inicial painel">
            <img
              src={`${process.env.PUBLIC_URL}/imgs/logo.png`}
              alt="Logo website"
            />
          </a>
        </h1>
      </header>
      <nav className="menuPanel" aria-label="Menu">
        <h2>Menu</h2>
        <button type="button" id="close" onClick={showMenu}>
          <IconsAi.AiOutlineClose />
        </button>
        <div className="infoUser">
          <ul>
            <li>Tipo de usuário: {userData.typeuser}</li>
            <li>Email: {userData.email}</li>
            <li>
              Último login:{' '}
              <Moment interval={0} format="DD/MM/YYYY">
                {userData.logged_at}
              </Moment>
            </li>
            <li>
              Última atualização:{' '}
              <Moment interval={0} format="DD/MM/YYYY">
                {userData.updated_at}
              </Moment>
            </li>
          </ul>
        </div>
        <a href="/">
          {' '}
          <IconsBi.BiArrowBack /> Voltar para site
        </a>
        {userData.typeuser === 'Admin' || userData.typeuser === 'GM' ? (
          <li className="dropdown dropdown_list_0">
            <button type="button" onClick={expandMenu} id="0">
              Anúncios
            </button>
            <ul>
              <li>
                <a href="/panel/searchads">Procurar Anunciante</a>
              </li>
              <li>
                <a href="/panel/createads">Adicionar Anunciante</a>
              </li>
              <li>
                <a href="/panel/updateads">Atualizar Anunciante</a>
              </li>
              <li>
                <a href="/panel/deleteads">Deletar Anunciante</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' ? (
          <li className="dropdown dropdown_list_1">
            <button type="button" onClick={expandMenu} id="1">
              Endereços
            </button>
            <ul>
              <li>
                <a href="/panel/createandress">Adicionar Endereços</a>
              </li>
              <li>
                <a href="/panel/deleteandress">Deletar Endereços</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' ? (
          <li className="dropdown dropdown_list_2">
            <button type="button" onClick={expandMenu} id="2">
              Tipos de Clientes
            </button>
            <ul>
              <li>
                <a href="/panel/toc">Adicionar Tipo de Cliente</a>
              </li>
              <li>
                <a href="/panel/deltoc">Deletar Tipo de Cliente</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' ? (
          <li className="dropdown dropdown_list_3">
            <button type="button" onClick={expandMenu} id="3">
              Tipos de Atendimentos
            </button>
            <ul>
              <li>
                <a href="/panel/tc">Adicionar Tipos de atendimentos</a>
              </li>

              <li>
                <a href="/panel/deltc">Deletar Tipos de atendimentos</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' || userData.typeuser === 'GM' ? (
          <li className="dropdown dropdown_list_4">
            <button type="button" onClick={expandMenu} id="4">
              Videos/Fotos
            </button>
            <ul>
              <li>
                <a href="/panel/perfilphoto">Foto de Perfil</a>
              </li>
              <li>
                <a href="/panel/addmidias">Adicionar fotos/videos</a>
              </li>
              <li>
                <a href="/panel/delmidias">Delete fotos/videos</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' ? (
          <li className="dropdown dropdown_list_5">
            <button type="button" onClick={expandMenu} id="5">
              Usuários com privilégios
            </button>
            <ul>
              <li>
                <a href="/panel/addlogin">Adicionar Usuário</a>
              </li>
              <li>
                <a href="/panel/dellogin">Delete Usuário</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' || userData.typeuser === 'GM' ? (
          <li className="dropdown dropdown_list_6">
            <button type="button" onClick={expandMenu} id="6">
              Publicidades
            </button>
            <ul>
              <li>
                <a href="/panel/addpartner">Adicionar publicidade</a>
              </li>
              <li>
                <a href="/panel/delpartner">Deletar publicidade</a>
              </li>
              <li>
                <a href="/panel/updatepartner">Atualizar publicidade</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        {userData.typeuser === 'Admin' || userData.typeuser === 'GM' ? (
          <li className="dropdown dropdown_list_7">
            <button type="button" onClick={expandMenu} id="7">
              Avisos
            </button>
            <ul>
              <li>
                <a href="/panel/addnotice">Adicionar Aviso</a>
              </li>
              <li>
                <a href="/panel/delnotice">Deletar Aviso</a>
              </li>
            </ul>
          </li>
        ) : (
          ''
        )}

        <button type="button" id="logout" onClick={logout}>
          <IconsAi.AiOutlineLogout /> Sair
        </button>
      </nav>
      {PageSelected === 'addnotice' ? <AddNotice /> : null}
      {PageSelected === 'delnotice' ? <DeleteNotice /> : null}
      {PageSelected === 'createads' ? <CreateAds /> : null}
      {PageSelected === 'deleteads' ? <DeleteAds /> : null}
      {PageSelected === 'searchads' ? <FindNameUser /> : null}
      {PageSelected === 'createandress' ? <CreateAndress /> : null}
      {PageSelected === 'deleteandress' ? <DeleteAndress /> : null}
      {PageSelected === 'updateads' ? <UpdateAds /> : null}
      {PageSelected === 'toc' ? <CreateTOC /> : null}
      {PageSelected === 'deltoc' ? <DeleteTypesOfCustomers /> : null}
      {PageSelected === 'tc' ? <CreateTypeCalls /> : null}
      {PageSelected === 'deltc' ? <DeleteTypesCalls /> : null}
      {PageSelected === 'addmidias' ? <AddMidiasUser /> : null}
      {PageSelected === 'delmidias' ? <DeleteMidia /> : null}
      {PageSelected === 'addlogin' ? <CreateLogin /> : null}
      {PageSelected === 'dellogin' ? <DeleteLogins /> : null}
      {PageSelected === 'addpartner' ? <AddPartners /> : null}
      {PageSelected === 'delpartner' ? <DeletePartners /> : null}
      {PageSelected === 'updatepartner' ? <UpdatePartners /> : null}
      {PageSelected === 'perfilphoto' ? <PerfilPhotosUser /> : null}
      {!PageSelected ? <Welcome /> : null}
    </main>
  );
}
