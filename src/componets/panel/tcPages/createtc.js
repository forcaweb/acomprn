import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function CreateTypeCalls() {
  const msg = document.querySelector('#formtc');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [tc, setTc] = React.useState([]);
  const token = localStorage.getItem('token');
  const saveTc = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const tcCamp = document.getElementById('tc');

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('tc', tcCamp.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        setTc(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (tc.length > 0) {
    msg.innerHTML = '';
    msg.style.display = 'none';
    if (tc[0].msg) {
      msg.style.display = 'block';
      msg.innerHTML = tc[0].msg;
    }
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Adicionar tipos de atendimentos</h1>
        <form method="POST">
          <output id="formtc" className="msgs" />
          <label htmlFor="city">Qual Atendimento?</label>
          <input
            name="tc"
            id="tc"
            type="text"
            placeholder="Digite tipo de atendimento do anunciante atende. Ex.: Acompanhantes, atendimento virtual..."
            maxLength="50"
            minLength="3"
          />
          {tc.map((itens) =>
            itens.tcError ? (
              <p className="showmsg" key={itens}>
                {itens.tcError}
              </p>
            ) : null
          )}

          <button type="submit" onClick={saveTc}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
