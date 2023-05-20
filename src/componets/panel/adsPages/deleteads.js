import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteAds() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const msg = document.querySelector('#formmsg');
  const token = localStorage.getItem('token');
  const confirm = document.getElementById('confirm');
  const deleteUser = async (ev) => {
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

    const formd = new FormData();
    formd.append('email', email.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/user/`,
        method: 'DELETE',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msg.innerHTML = '';
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Deletar usuário</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>DELETAR</strong>, você esta de acordo com a alteração.{' '}
        </p>
        <form method="POST" className="effectFade">
          <output id="formmsg" className="msgs" />
          <label htmlFor="name">Email:</label>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Digite o email do anunciante."
            maxLength="50"
            minLength="3"
            required
          />

          <button type="submit" onClick={deleteUser}>
            Deletar
          </button>
        </form>
      </main>
    </>
  );
}
