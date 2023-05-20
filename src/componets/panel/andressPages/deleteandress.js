import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function DeleteAndress() {
  const msg = document.querySelector('#formandress');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [andress, setAndress] = React.useState([]);
  const token = localStorage.getItem('token');

  const getAndress = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setAndress(resp.data.andress);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAndress = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const id = ev.target.dataset.idandress;
    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
        getAndress();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (andress.length <= 0) getAndress();
  });

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Delete endereço</h1>
        <nav className="deleteContainer">
          <output id="formandress" className="msgs" />
          {andress.map((itens) => (
            <li key={itens.id}>
              <p>
                <IconsMd.MdDelete /> {`${itens.city_and_state}`}
              </p>

              <a
                href="/"
                aria-label={`${itens.city_and_state}`}
                data-idandress={itens.id}
                onClick={deleteAndress}>
                Deletar
              </a>
            </li>
          ))}
        </nav>
      </div>
    </>
  );
}
