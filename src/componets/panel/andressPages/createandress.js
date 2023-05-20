import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function CreateAndress() {
  const token = localStorage.getItem('token');
  const msg = document.querySelector('#formandress');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [andress, setAndress] = React.useState([]);
  const saveAndress = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const city = document.getElementById('city');
    const state = document.getElementById('state');

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('city', city.value);
    formd.append('state', state.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        setAndress(resp.data);
        msg.style.display = 'none';
        msg.innerHTML = '';
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (andress.length > 0) {
    if (andress[0].msg) {
      msg.style.display = 'block';
      msg.innerHTML = andress[0].msg;
    }
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Adicionar novo endereço</h1>
        <form method="POST">
          <output id="formandress" className="msgs" />
          <label htmlFor="city">Cidade:</label>
          <input
            name="city"
            id="city"
            type="text"
            placeholder="Digite a cidade do anunciante."
            maxLength="50"
            minLength="3"
          />
          {andress.map((itens) =>
            itens.cityError ? (
              <p className="showmsg" key={itens}>
                {itens.cityError}
              </p>
            ) : null
          )}

          <label htmlFor="state">Estado:</label>
          <input
            name="state"
            id="state"
            type="text"
            placeholder="Digite o estado do anunciante. Ex.: MG, RN, RS, SP..."
            maxLength="2"
            minLength="2"
          />

          {andress.map((itens) =>
            itens.stateError ? (
              <p className="showmsg" key={itens}>
                {itens.stateError}
              </p>
            ) : null
          )}

          <button type="submit" onClick={saveAndress}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
