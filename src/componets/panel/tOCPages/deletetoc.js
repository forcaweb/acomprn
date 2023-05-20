import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteTypesOfCustomers() {
  const msg = document.querySelector('#formmsg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [toc, setToc] = React.useState([]);
  const token = localStorage.getItem('token');

  const getToc = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tocs/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setToc(resp.data.typesOfCustomers);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToc = async (ev) => {
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
        url: `${process.env.REACT_APP_API_URL}/toc/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
        getToc();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (toc.length <= 0) getToc();
  });
  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Delete Tipos de Clientes</h1>
        <nav className="deleteContainer">
          <output id="formmsg" className="msgs" />
          {toc.map((itens) => (
            <li key={itens.id}>
              <p>
                <IconsMd.MdDelete /> {`${itens.typesOfCustomers}`}
              </p>

              <a
                href="/"
                aria-label={`${itens.typesOfCustomers}`}
                data-idtc={itens.id}
                onClick={deleteToc}>
                Deletar
              </a>
            </li>
          ))}
        </nav>
      </div>
    </>
  );
}
