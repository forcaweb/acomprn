import * as React from 'react';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function CreateTOC() {
  const msg = document.querySelector('#formtypesOfCustomers');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [typesOfCustomers, setTypesOfCustomers] = React.useState([]);
  const token = localStorage.getItem('token');
  const saveTypesOfCustomers = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const typesOfCustomersCamp = document.getElementById('typesOfCustomers');

    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = 'Aguarde....';
    }

    const formd = new FormData();
    formd.append('typesOfCustomers', typesOfCustomersCamp.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/toc/`,
        method: 'POST',
        data: formd,
        headers
      }).then((resp) => {
        setLoadingPages(false);
        setTypesOfCustomers(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (typesOfCustomers.length > 0) {
    if (typesOfCustomers[0].msg) {
      msg.style.display = 'block';
      msg.innerHTML = typesOfCustomers[0].msg;
    }
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Adicionar Tipo de Clientes</h1>
        <form method="POST">
          <output id="formtypesOfCustomers" className="msgs" />
          <label htmlFor="typesOfCustomers">Qual Cliente?</label>
          <input
            name="typesOfCustomers"
            id="typesOfCustomers"
            type="text"
            placeholder="Digite tipo de cliente o anunciante atende. Ex.: Mulher, Homem, Gay...."
            maxLength="50"
            minLength="3"
          />
          {typesOfCustomers.map((itens) =>
            itens.typesOfCustomersError ? (
              <p className="showmsg" key={itens}>
                {itens.typesOfCustomersError}
              </p>
            ) : null
          )}

          <button type="submit" onClick={saveTypesOfCustomers}>
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
