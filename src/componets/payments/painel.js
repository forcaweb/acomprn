import * as React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import * as IconsSi from 'react-icons/si';
import * as IconsGo from 'react-icons/go';
import * as IconsIo from 'react-icons/io';
import * as IconsGr from 'react-icons/gr';
import './payments.css';
import LoadingPages from '../loading';

export default function PainelPayment() {
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [paymentData, setPaymentData] = React.useState({
    data: [{ error: null }]
  });

  const [paymentHistoryData, setPaymentHistoryData] = React.useState({
    data: [{ error: null }]
  });

  const createPayment = async (e) => {
    e.preventDefault();
    let error = false;

    const firstName = document.getElementById('first_name');
    const lastName = document.getElementById('last_name');
    const CPF = document.getElementById('CPF');
    const email = document.getElementById('email');
    const zipCode = document.getElementById('zip_code');
    const streetName = document.getElementById('street_name');
    const streetNumber = document.getElementById('street_number');
    const neighborhood = document.getElementById('neighborhood');
    const city = document.getElementById('city');
    const federalUnit = document.getElementById('federal_unit');
    const packages = document.getElementById('packages');

    if (firstName.value === '') {
      firstName.style.border = '1px solid red';
      error = true;
    } else {
      firstName.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (lastName.value === '') {
      lastName.style.border = '1px solid red';
      error = true;
    } else {
      lastName.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (CPF.value === '') {
      CPF.style.border = '1px solid red';
      error = true;
    } else {
      CPF.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (email.value === '') {
      email.style.border = '1px solid red';
      error = true;
    } else {
      email.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (zipCode.value === '') {
      zipCode.style.border = '1px solid red';
      error = true;
    } else {
      zipCode.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (streetName.value === '') {
      streetName.style.border = '1px solid red';
      error = true;
    } else {
      streetName.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (streetNumber.value === '') {
      streetNumber.style.border = '1px solid red';
      error = true;
    } else {
      streetNumber.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (neighborhood.value === '') {
      neighborhood.style.border = '1px solid red';
      error = true;
    } else {
      neighborhood.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (city.value === '') {
      city.style.border = '1px solid red';
      error = true;
    } else {
      city.style.border = '1px solid #e3e3e3';
      error = false;
    }
    if (federalUnit.value === '') {
      federalUnit.style.border = '1px solid red';
      error = true;
    } else {
      federalUnit.style.border = '1px solid #e3e3e3';
      error = false;
    }

    const match = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;

    if (!zipCode.value.match(match)) {
      zipCode.value = 'Formato errado!';
      error = true;
    } else {
      error = false;
    }

    if (error === true) return;

    const formData = new FormData();
    formData.append('plan', packages.value);
    formData.append('email', email.value);
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('cpf', CPF.value);
    formData.append('zipCode', zipCode.value);
    formData.append('streetName', streetName.value);
    formData.append('streetNumber', streetNumber.value);
    formData.append('neighborhood', neighborhood.value);
    formData.append('city', city.value);
    formData.append('federalUnit', federalUnit.value);

    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('tokenpayment')
      };
      setLoadingPages(true);
      await axios({
        url: `${process.env.REACT_APP_API_URL}/createpayment`,
        method: 'POST',
        data: formData,
        headers
      }).then((r) => {
        setLoadingPages(false);
        console.log(r);
        if (r.data.accountError) {
          localStorage.removeItem('tokenpayment');
          window.location.href = '/payment-login';
        }
        setPaymentData(r.data);
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  document.querySelector(
    'title'
  ).innerHTML = `Pagamentos ${process.env.REACT_APP_URL_DOMINIO}`;
  document.getElementsByTagName(
    'head'
  )[0].innerHTML += `<meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />`;
  const tokenpaymentstatment = localStorage.getItem('tokenpayment')
    ? localStorage.getItem('tokenpayment')
    : null;
  if (tokenpaymentstatment === null) window.location.href = '/payment-login';

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('tokenpayment');
    window.location.href = '/payment-painel';
  };

  const getPaymentHistory = async () => {
    setLoadingPages(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('tokenpayment')
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/paymenthistory`,
        method: 'GET',
        headers
      }).then((r) => {
        setLoadingPages(false);
        if (r.data.accountError) {
          localStorage.removeItem('tokenpayment');
          window.location.href = '/payment-login';
        }
        getTokenData();
        setPaymentHistoryData(r.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getPayment = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('tokenpayment')
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/payment`,
        method: 'GET',
        headers
      }).then((r) => {
        if (r.data.accountError) {
          localStorage.removeItem('tokenpayment');
          window.location.href = '/payment-login';
        }
        getTokenData();
        getPaymentHistory();
        setPaymentData(r.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getTokenData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('tokenpayment')
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/tokenisvalid`,
        method: 'POST',
        headers
      }).then((r) => {
        if (r.data.accountError) {
          localStorage.removeItem('tokenpayment');
          window.location.href = '/payment-login';
        }
        setUserData(r.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    document.querySelector('.modalPayment').style.display = 'flex';
  };

  const closeModel = () => {
    document.querySelector('.payment').addEventListener('click', (e) => {
      if (e.target.getAttribute('class') === 'modalPayment') {
        document.querySelector('.modalPayment').style.display = 'none';
      }
    });
  };

  const getAdress = () => {
    /// https://viacep.com.br/ws/01001000/json/
    setLoadingPages(true);
    const cep = document.getElementById('zip_code').value;
    if (cep.length > 9) return;
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resp) => {
        setLoadingPages(false);
        document.getElementById('zip_code').style.border = '1px solid #e3e3e3';
        document.getElementById('street_name').value = resp.data.logradouro;
        document.getElementById('neighborhood').value = resp.data.bairro;
        document.getElementById('city').value = resp.data.localidade;
        document.getElementById('federal_unit').value = resp.data.uf;
      })
      .catch((error) => {
        if (error.message) {
          document.getElementById('zip_code').style.border = '1px solid red';
          document.getElementById('street_name').value = '';
          document.getElementById('neighborhood').value = '';
          document.getElementById('city').value = '';
          document.getElementById('federal_unit').value = '';
        }
      });
  };

  const copyText = async () => {
    const qrcodeCamp = document.getElementById('qrcode').value;
    const btnCopyQrCode = document.getElementById('btnCopyQrCode');

    try {
      await navigator.clipboard.writeText(qrcodeCamp);
      btnCopyQrCode.innerText = 'Copiado!';
      btnCopyQrCode.style.background = '#01a129';
      btnCopyQrCode.style.color = '#fff';
    } catch (e) {
      btnCopyQrCode.innerText = 'QR Inválido';
    }
  };

  React.useEffect(() => {
    closeModel();
    if (userData.length <= 0) getTokenData();
    if (paymentData.data[0].error === null) {
      getPayment();
    }

    if (paymentHistoryData.data[0].error === null) getPaymentHistory();
  });

  const operation = Number(userData.expired) - Number(Date.now());

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}
      <main className="payment">
        <section className="paymentTitle">
          <button type="button" className="logout" onClick={logout}>
            <IconsGr.GrLogout /> Sair
          </button>
          <h1>
            <IconsSi.SiMoneygram /> Pagamentos
          </h1>
          <sub>www.aschiquesdebsb.com.br</sub>
        </section>

        <section className="paymentHistory">
          <h2>Em Aberto</h2>
          <p>
            Os pagamentos são feitos via <strong>Mercado Pago</strong>. Qualquer
            dúvida{' '}
            <a
              href="https://mercadopago.com.br"
              target="blank"
              aria-label="link mercado pago">
              clique aqui
            </a>
            .
          </p>
          <ul>
            {operation <= 432000000 ? (
              <li>
                <a
                  href="/"
                  aria-label="Pagment"
                  title="Pagamento Aberto"
                  className="payOpen"
                  onClick={openModal}>
                  <IconsGo.GoIssueOpened />{' '}
                  <strong>Anúncio As chiques de BSB</strong>{' '}
                  <Moment format="DD/MM/YYYY">
                    {Number(userData.expired)}
                  </Moment>{' '}
                  - Pagar Agora
                </a>
              </li>
            ) : (
              <li>Tudo em Dias!</li>
            )}
          </ul>
        </section>

        <section className="paymentHistory">
          <h2>Conluídos</h2>
          <ul>
            {paymentHistoryData.data[0].error === false ? (
              paymentHistoryData.data[1].map((itens) => (
                <li key={itens.id}>
                  <a
                    href={itens.link_ticket}
                    target="blank"
                    aria-label="Pagamento Pago"
                    title="Pagamento Pago"
                    className="payDone">
                    <IconsIo.IoMdCheckmarkCircle />
                    ID Pagamento: {itens.id_payment}, Pagamento{' '}
                    <Moment format="DD/MM/YYYY">{itens.created_at}</Moment> -
                    Abrir Ticket
                  </a>
                </li>
              ))
            ) : (
              <li>Nenhum pagamento efetuado!</li>
            )}
          </ul>
        </section>

        <section className="modalPayment">
          {paymentData.data.length <= 1 ? (
            <div className="stage-1">
              <h3>Dados de Pagamentos</h3>
              <p>
                Não salvamos seus dados. São enviado para{' '}
                <strong>Mercado Pago</strong> para criar seu{' '}
                <strong>QR Code.</strong> Após pagar retorne aqui para confirmar
                seu pagamento.
              </p>
              <form autoComplete="off" autoSave="off">
                <div className="camps_pay">
                  <label htmlFor="first_name">Primeiro nome</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Primeiro nome."
                    minLength={3}
                    maxLength={30}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="last_name">Último nome</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Último nome."
                    minLength={3}
                    maxLength={30}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="CPF">CPF</label>
                  <input
                    type="text"
                    name="CPF"
                    id="CPF"
                    placeholder="Seu CPF."
                    minLength={11}
                    maxLength={12}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Seu E-mail."
                    minLength={10}
                    maxLength={50}
                    autoComplete="off"
                    disabled
                    defaultValue={userData.email}
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="packages">Escolha um pacote</label>
                  {/* <small className="promotion">Promoção até Dezembro</small> */}
                  <select name="packages" id="packages">
                    <option value="1">Pacote Padrão: R$ 100,00</option>
                    <option value="2">Pacote Vip: R$ 190,00</option>
                    <option value="3">Pacote Premium: R$ 470,00</option>
                  </select>
                </div>

                <div className="camps_pay">
                  <label htmlFor="zip_code">Digite seu cep</label>
                  <input
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    placeholder="Seu CEP."
                    minLength={5}
                    maxLength={50}
                    autoComplete="off"
                    required
                    onBlur={getAdress}
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="street_name">Nome da rua</label>
                  <input
                    type="text"
                    name="street_name"
                    id="street_name"
                    placeholder="Sua rua."
                    minLength={5}
                    maxLength={50}
                    disabled
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="street_number">Número da rua</label>
                  <input
                    type="text"
                    name="street_number"
                    id="street_number"
                    placeholder="Número da rua."
                    minLength={5}
                    maxLength={50}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input
                    type="text"
                    name="neighborhood"
                    id="neighborhood"
                    placeholder="Bairro."
                    minLength={5}
                    maxLength={50}
                    disabled
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="city">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Cidade."
                    minLength={5}
                    maxLength={50}
                    disabled
                    required
                  />
                </div>

                <div className="camps_pay">
                  <label htmlFor="federal_unit">Estado</label>
                  <input
                    type="text"
                    name="federal_unit"
                    id="federal_unit"
                    placeholder="Estado."
                    minLength={2}
                    maxLength={2}
                    disabled
                    required
                  />
                </div>
                <div className="camps_pay">
                  <input
                    type="submit"
                    id="btn_pay"
                    value="Pagar"
                    onClick={createPayment}
                  />
                  <input type="reset" value="Resetar campos" />
                </div>
              </form>
            </div>
          ) : (
            <div className="stage-2">
              {/* <img src="data:image/png;base64, Codigo aqui" alt="QR CODE" /> */}
              <h2>Qr Code ja foi Gerado.</h2>
              {paymentData.data[1].qr_code ? (
                <img
                  src={`data:image/png;base64, ${paymentData.data[1].qr_code}`}
                  alt="QR CODE"
                />
              ) : null}
              <p>Aponte o celular para o QR Code.</p>
              <div className="copy">
                <input
                  type="hidden"
                  name="qrcode"
                  id="qrcode"
                  value={paymentData.data[1].link_qr_code}
                />
                <button type="button" id="btnCopyQrCode" onClick={copyText}>
                  Copiar QR Code
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
