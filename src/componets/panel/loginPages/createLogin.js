import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function CreateLogin() {
  const msg = document.querySelector('#formlg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [loginData, setLoginData] = React.useState([]);
  const token = localStorage.getItem('token');
  const saveLogin = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const nameCamp = document.getElementById('name');
    const ageCamp = document.getElementById('age');
    const cpfCamp = document.getElementById('cpf');
    const emailCamp = document.getElementById('email');
    const passCamp = document.getElementById('pass');
    const phoneCamp = document.getElementById('phone');
    const typeuserCamp = document.getElementById('typeuser');

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('name', nameCamp.value);
    formd.append('age', ageCamp.value);
    formd.append('cpf', cpfCamp.value);
    formd.append('email', emailCamp.value);
    formd.append('pass', passCamp.value);
    formd.append('phone', phoneCamp.value);
    formd.append('typeuser', typeuserCamp.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/login/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        setLoginData(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loginData.length > 0) {
    msg.innerHTML = '';
    msg.style.display = 'none';
    if (loginData[0].msg) {
      msg.style.display = 'block';
      msg.innerHTML = loginData[0].msg;
    }
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Adicionar Login</h1>
        <form method="POST">
          <output id="formlg" className="msgs" />
          <label htmlFor="name">Qual Nome?</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Nome completo."
            maxLength="150"
            minLength="3"
          />
          {loginData.map((itens) =>
            itens.nameError ? (
              <p className="showmsg" key={itens}>
                {itens.nameError}
              </p>
            ) : null
          )}

          <label htmlFor="age">Qual Idade?</label>
          <input
            name="age"
            id="age"
            type="text"
            placeholder="Idade do usuario."
            maxLength="150"
            minLength="3"
          />
          {loginData.map((itens) =>
            itens.ageError ? (
              <p className="showmsg" key={itens}>
                {itens.ageError}
              </p>
            ) : null
          )}

          <label htmlFor="cpf">Qual CPF?</label>
          <input
            name="cpf"
            id="cpf"
            type="text"
            placeholder="CPF do usuario."
            maxLength="150"
            minLength="3"
          />
          {loginData.map((itens) =>
            itens.cpfError ? (
              <p className="showmsg" key={itens}>
                {itens.cpfError}
              </p>
            ) : null
          )}

          <label htmlFor="email">Qual E-mail?</label>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="E-mail do usuario."
            maxLength="150"
            minLength="3"
          />
          {loginData.map((itens) =>
            itens.emailError ? (
              <p className="showmsg" key={itens}>
                {itens.emailError}
              </p>
            ) : null
          )}

          <label htmlFor="pass">Senha?</label>
          <input
            name="pass"
            id="pass"
            type="password"
            placeholder="Senha do usuario."
          />
          {loginData.map((itens) =>
            itens.passError ? (
              <p className="showmsg" key={itens}>
                {itens.passError}
              </p>
            ) : null
          )}

          <label htmlFor="phone">Telefone?</label>
          <input
            name="phone"
            id="phone"
            type="phone"
            placeholder="Telefone do usuario."
          />
          {loginData.map((itens) =>
            itens.phonetError ? (
              <p className="showmsg" key={itens}>
                {itens.phonetError}
              </p>
            ) : null
          )}

          <label htmlFor="typeuser">Qual tipo de usuário?</label>
          <select defaultValue="1" name="typeuser" id="typeuser">
            <option value="3">MD</option>
            <option value="2">GM</option>
            <option value="1">ADM</option>
          </select>

          <button type="submit" onClick={saveLogin}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
