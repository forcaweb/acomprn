import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteLogins() {
  const msg = document.querySelector('#formmsg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [loginData, setLoginData] = React.useState([]);
  const token = localStorage.getItem('token');

  const getLogins = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/login/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setLoginData(resp.data.accounts);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTc = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);

    const confirm = document.getElementById('confirm');
    if (confirm.checked === false) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }
    const id = ev.target.dataset.idlg;
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/login/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        console.log(resp.data.msg);
        setLoadingPages(false);
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
        getLogins();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (loginData.length <= 0) getLogins();
  });

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Delete Usuários</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>DELETAR</strong>, você esta de acordo com a alteração.{' '}
        </p>
        <nav className="deleteContainer">
          <output id="formmsg" className="msgs" />
          {loginData.map((itens) => (
            <li key={itens.id}>
              <p>
                <IconsMd.MdDelete /> {`${itens.name} (${itens.typeuser})`}
              </p>

              <a
                href="/"
                aria-label={`${itens.name}`}
                data-idlg={itens.id}
                onClick={deleteTc}>
                Deletar
              </a>
            </li>
          ))}
        </nav>
      </div>
    </>
  );
}
