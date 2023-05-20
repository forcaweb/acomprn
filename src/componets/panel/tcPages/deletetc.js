import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteTypesCalls() {
  const msg = document.querySelector('#formmsg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [tc, setTc] = React.useState([]);
  const token = localStorage.getItem('token');

  const getTc = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setTc(resp.data.typesCalls);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTc = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }
    const id = ev.target.dataset.idtc;
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        console.log(resp.data.msg);
        setLoadingPages(false);
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
        getTc();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (tc.length <= 0) getTc();
  });

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Delete Tipos de Atendimentos</h1>
        <nav className="deleteContainer">
          <output id="formmsg" className="msgs" />
          {tc.map((itens) => (
            <li key={itens.id}>
              <p>
                <IconsMd.MdDelete /> {`${itens.name}`}
              </p>

              <a
                href="/"
                aria-label={`${itens.name}`}
                data-idtc={itens.id}
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
