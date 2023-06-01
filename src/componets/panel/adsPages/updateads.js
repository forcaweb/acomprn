import * as React from 'react';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import validator from 'validator';
import axios from 'axios';
import LoadingPages from '../../loading';

export default function UpdateAds() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const token = localStorage.getItem('token');
  const [userUpdate, setUserUpdate] = React.useState([
    {
      active: '',
      age: '',
      andressrelations: '',
      biography: '',
      callTypesrelations: '',
      created_at: '',
      endofday: '',
      etRelations: '',
      expired: '',
      height: '',
      id: null,
      name: '',
      phone: '',
      schedules: '',
      servicelocations: '',
      updated_at: '',
      weight: ''
    }
  ]);
  const [cat, setCat] = React.useState('');
  const [andress, setAndress] = React.useState('');
  const [typesOfCustomers, setTypesOfCustomers] = React.useState('');
  const [andressSelected, setAndressSelected] = React.useState([]);
  const [typeCallsSelected, settypeCallsSelected] = React.useState([]);
  const [typesOfCustomersSelected, setTypesOfCustomersSelected] =
    React.useState([]);
  const msg = document.querySelector('#formmsg');
  const msgupdate = document.querySelector('#formmsgupdate');
  const [timExpired, setTimExpired] = React.useState(null);
  const [dateExpired, setDateExpired] = React.useState(null);
  const changeSelectAndress = (event) => {
    setAndress(event.target.value);
  };

  const changeSelectTOC = (event) => {
    setTypesOfCustomers(event.target.value);
  };

  const changeSelectCat = (event) => {
    setCat(event.target.value);
  };

  const getUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');

    if (
      validator.isEmpty(email.value.trim()) ||
      !validator.isEmail(email.value.trim())
    )
      return;
    setLoadingPages(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${
          process.env.REACT_APP_API_URL
        }/userupdate/${email.value.trim()}`,
        method: 'GET',
        headers
      }).then((resp) => {
        if (resp.data.msg) {
          msgupdate.innerHTML = '';
          msgupdate.style.display = 'block';
          msgupdate.innerHTML = resp.data.msg;
          setLoadingPages(false);
        } else {
          msgupdate.style.display = 'none';
          setUserUpdate(resp.data.user);
          setTimExpired(Number(resp.data.user[0].expired));
          setLoadingPages(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTypesOfCustomers = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tocs/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setTypesOfCustomersSelected(resp.data.typesOfCustomers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTypeCalls = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tc/`,
        method: 'GET',
        headers
      }).then((resp) => {
        settypeCallsSelected(resp.data.typesCalls);
        getTypesOfCustomers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAndress = async () => {
    if (andressSelected.length > 0) return;
    try {
      const headers = { 'Content-Type': 'application/json' };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/andress/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setAndressSelected(resp.data.andress);
        if (resp.data.andress.length > 0) {
          getTypeCalls();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const height = document.getElementById('height');
    const weight = document.getElementById('weight');
    const schedules = document.getElementById('schedules');
    const biography = document.getElementById('biography');
    const endofday = document.getElementById('endofday');
    const phone = document.getElementById('phone');
    const servicelocations = document.getElementById('servicelocations');
    const andressid = document.getElementById('andress_id');
    const ctp = document.getElementById('ctp');
    const typesOfCustomersc = document.getElementById('typesOfCustomers');
    const email = document.getElementById('email');
    const confirm = document.getElementById('confirm');
    const premium = document.getElementById('premium');

    if (confirm.checked === false) {
      if (msgupdate) {
        msgupdate.style.display = 'block';
        msgupdate.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterções.';
      }

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

    const date = document.getElementById('date').value;

    const formd = new FormData();
    formd.append('name', name.value);
    formd.append('age', age.value);
    formd.append('height', height.value);
    formd.append('weight', weight.value);
    formd.append('schedules', schedules.value);
    formd.append('biography', biography.value);
    formd.append('endofday', endofday.value);
    formd.append('phone', phone.value);
    formd.append('servicelocations', servicelocations.value);
    formd.append('andress_id', andressid.value);
    formd.append('ctp', ctp.value);
    formd.append('typesOfCustomers', typesOfCustomersc.value);
    formd.append('premium', premium.value);
    formd.append('expired', `${date} 23:00:00`);
    formd.append('email', email.value);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/user/`,
        method: 'PUT',
        data: formd,
        headers
      }).then((resp) => {
        setUser(resp.data);
        if (msg) msg.style.display = 'none';
        if (resp.data.msg) {
          msg.style.display = 'none';
          msg.style.display = 'block';
          msg.innerHTML = resp.data.msg;
          setLoadingPages(false);
        } else {
          setUser(resp.data);
        }
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (andressSelected.length <= 0) {
    getAndress();
  }

  if (user.length > 0) {
    if (user[0].msg) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML = user[0].msg;
      }
    }
  }

  if (timExpired !== null) {
    const x = new Date(timExpired);
    const formtMilInDate = moment(x.toISOString()).format('yyyy-MM-DD');
    if (dateExpired === null) setDateExpired(formtMilInDate);
  }

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <main className="formConatiner">
        <h1>Atualizar usuário</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>ATUALIZAR</strong>, você esta de acordo com a alteração.{' '}
        </p>
        {userUpdate[0].id === null ? (
          <form method="POST" className="effectFade">
            <output id="formmsgupdate" className="msgs" />
            <label htmlFor="email">Email do anunciante:</label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Digite o email do anunciante."
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
            <button type="submit" onClick={getUser}>
              Buscar
            </button>
          </form>
        ) : (
          <form method="POST" className="effectFade">
            <output id="formmsg" className="msgs" />
            <label htmlFor="email">Email do anunciante:</label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Digite o email do anunciante."
              maxLength="50"
              minLength="3"
              disabled
              required
            />
            {user.map((itens) =>
              itens.emailError ? (
                <p className="showmsg" key={itens}>
                  {itens.emailError}
                </p>
              ) : null
            )}
            <label htmlFor="name">Titulo do anúncio:</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Digite o Titulo do anúncio."
              maxLength="150"
              minLength="3"
              defaultValue={userUpdate[0].name}
              required
            />
            {user.map((itens) =>
              itens.nameError ? (
                <p className="showmsg" key={itens}>
                  {itens.nameError}
                </p>
              ) : null
            )}
            <label htmlFor="age">Idade:</label>
            <input
              name="age"
              id="age"
              type="text"
              placeholder="Digite a idade do anunciante."
              maxLength="3"
              minLength="3"
              defaultValue={userUpdate[0].age}
              required
            />
            {user.map((itens) =>
              itens.ageError ? (
                <p className="showmsg" key={itens}>
                  {itens.ageError}
                </p>
              ) : null
            )}
            <label htmlFor="height">Altura:</label>
            <input
              name="height"
              id="height"
              type="text"
              placeholder="Digite a altura do anunciante."
              maxLength="50"
              minLength="3"
              defaultValue={userUpdate[0].height}
              required
            />
            {user.map((itens) =>
              itens.heightError ? (
                <p className="showmsg" key={itens}>
                  {itens.heightError}
                </p>
              ) : null
            )}
            <label htmlFor="weight">Peso:</label>
            <input
              name="weight"
              id="weight"
              type="text"
              placeholder="Digite o peso do anunciante."
              maxLength="50"
              minLength="3"
              defaultValue={userUpdate[0].weight}
              required
            />
            {user.map((itens) =>
              itens.weightError ? (
                <p className="showmsg" key={itens}>
                  {itens.weightError}
                </p>
              ) : null
            )}
            <label htmlFor="biography">Biografia:</label>
            <textarea
              name="biography"
              id="biography"
              type="text"
              placeholder="Digite a biografia do anunciante."
              maxLength="2500"
              minLength="3"
              defaultValue={userUpdate[0].biography}
              required
            />
            {user.map((itens) =>
              itens.biographyError ? (
                <p className="showmsg" key={itens}>
                  {itens.biographyError}
                </p>
              ) : null
            )}
            <label htmlFor="schedules">Inicio Expediente:</label>
            <input
              name="schedules"
              id="schedules"
              type="time"
              defaultValue={userUpdate[0].schedules}
              required
            />
            {user.map((itens) =>
              itens.schedulesError ? (
                <p className="showmsg" key={itens}>
                  {itens.schedulesError}
                </p>
              ) : null
            )}
            <label htmlFor="endofday">Fim Expediente:</label>
            <input
              name="endofday"
              id="endofday"
              type="time"
              defaultValue={userUpdate[0].endofday}
              required
            />
            {user.map((itens) =>
              itens.endofdayError ? (
                <p className="showmsg" key={itens}>
                  {itens.endofdayError}
                </p>
              ) : null
            )}
            <label htmlFor="phone">Contato:</label>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="Digite o contato do anunciante."
              maxLength="50"
              minLength="3"
              defaultValue={userUpdate[0].phone}
              required
            />
            {user.map((itens) =>
              itens.phoneError ? (
                <p className="showmsg" key={itens}>
                  {itens.phoneError}
                </p>
              ) : null
            )}
            <label htmlFor="servicelocations">Locais de atendimentos:</label>
            <input
              name="servicelocations"
              id="servicelocations"
              type="text"
              placeholder="Digite os locais de atendimento. Ex.: Moteis, Possui local e etc.."
              maxLength="50"
              minLength="3"
              defaultValue={userUpdate[0].servicelocations}
              required
            />
            {user.map((itens) =>
              itens.servicelocationsError ? (
                <p className="showmsg" key={itens}>
                  {itens.servicelocationsError}
                </p>
              ) : null
            )}
            <label htmlFor="andress_id">Endereço de atendimento:</label>
            {andressSelected.length > 0 ? (
              <select
                name="andress_id"
                id="andress_id"
                defaultValue={userUpdate[0].andressrelations[0].andress.id}
                required
                onChange={changeSelectAndress}>
                <option value="" disabled>
                  Selecione um endereço
                </option>

                {andressSelected.map((itens) => (
                  <option
                    key={itens.id}
                    value={itens.id}>{`${itens.city_and_state}`}</option>
                ))}
              </select>
            ) : (
              <select
                name="andress_id"
                id="andress_id"
                value={andress}
                required
                onChange={changeSelectAndress}>
                <option value="" disabled>
                  Sem endereço
                </option>
              </select>
            )}
            {user.map((itens) =>
              itens.andressidError ? (
                <p className="showmsg" key={itens}>
                  {itens.andressidError}
                </p>
              ) : null
            )}
            <label htmlFor="ctp">Categorias:</label>
            {typeCallsSelected.length > 0 ? (
              <select
                name="ctp"
                id="ctp"
                defaultValue={userUpdate[0].callTypesrelations[0].typecall.id}
                required
                onChange={changeSelectCat}>
                <option value="" disabled>
                  Selecione uma Categoria
                </option>
                {typeCallsSelected.map((itens) => (
                  <option
                    key={itens.id}
                    value={itens.id}>{`${itens.name}`}</option>
                ))}
              </select>
            ) : (
              <select
                name="ctp"
                id="ctp"
                value={cat}
                required
                onChange={changeSelectCat}>
                <option value="" disabled>
                  Sem Tipos de atendimentos
                </option>
              </select>
            )}
            {user.map((itens) =>
              itens.ctpError ? (
                <p className="showmsg" key={itens}>
                  {itens.ctpError}
                </p>
              ) : null
            )}
            <label htmlFor="typesOfCustomers">Atende:</label>
            {typesOfCustomersSelected.length > 0 ? (
              <select
                name="typesOfCustomers"
                id="typesOfCustomers"
                defaultValue={userUpdate[0].tOCRelations[0].typesOfCustomers.id}
                required
                onChange={changeSelectTOC}>
                <option value="" disabled>
                  Selecione tipo de cliente(s)
                </option>
                {typesOfCustomersSelected.map((itens) => (
                  <option
                    key={itens.id}
                    value={itens.id}>{`${itens.typesOfCustomers}`}</option>
                ))}
              </select>
            ) : (
              <select
                name="typesOfCustomers"
                id="typesOfCustomers"
                value={typesOfCustomers}
                required
                onChange={changeSelectTOC}>
                <option value="" disabled>
                  Sem gêneros salvos
                </option>
              </select>
            )}
            {user.map((itens) =>
              itens.etError ? (
                <p className="showmsg" key={itens}>
                  {itens.etError}
                </p>
              ) : null
            )}

            <label htmlFor="premium">Premium:</label>
            <select
              name="premium"
              id="premium"
              defaultValue={userUpdate[0].premium}
              required>
              <option value="0">Padrão</option>
              <option value="1">Vip</option>
              <option value="2">Premium</option>
            </select>

            <label htmlFor="date">Data de expiração:</label>
            <small id="dateOld">
              Expira em:{' '}
              <Moment format="DD/MM/YYYY" tz="America/Sao_Paulo" local>
                {timExpired}
              </Moment>
            </small>
            <input
              name="date"
              id="date"
              type="date"
              defaultValue={dateExpired}
              required
            />
            {user.map((itens) =>
              itens.expiredError ? (
                <p className="showmsg" key={itens}>
                  {itens.expiredError}
                </p>
              ) : null
            )}
            <button type="submit" onClick={updateUser}>
              Atualizar
            </button>
          </form>
        )}
      </main>
    </>
  );
}
