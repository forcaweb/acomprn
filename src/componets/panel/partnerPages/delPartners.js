import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeletePartners() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const confirm = document.getElementById('confirm');
  const token = localStorage.getItem('token');
  const [user, setUser] = React.useState([]);
  const msg = document.querySelector('#formmsg');

  const savePartners = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const email = document.getElementById('email');

    if (confirm.checked === false) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();

    formd.append('email', email.value);

    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/partner/`,
        method: 'DELETE',
        data: formd,
        headers
      }).then((resp) => {
        msg.innerHTML = resp.data.msg;
        setUser([]);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Adicionar Publicidade</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>Cadastrar</strong>, você esta de acordo com a em anunciar.{' '}
        </p>
        <form
          method="POST"
          className="effectFade"
          encType="multipart/form-data">
          <output id="formmsg" className="msgs" />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Digite o email."
            maxLength="50"
            minLength="3"
            required
          />
          {user.map((itens) =>
            itens.emailError ? (
              <p className="showmsg" key={itens}>
                {itens.emailError}
              </p>
            ) : null
          )}

          <button type="submit" onClick={savePartners}>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}
