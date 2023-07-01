import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Panel from './componets/panel';
import Home from './componets/home';
import Page404 from './componets/page404';
import Header from './componets/header';
import Footer from './componets/footer';
import Information from './componets/information';
import PrivacyPolicy from './componets/policy';
import Contact from './componets/contact';
import About from './componets/about';
import AdsClient from './componets/ads';
import WarningSite from './componets/warning';
import Login from './componets/login';
import ErrorPanelPage from './componets/pageErrorPanel';
import SearchAds from './componets/search';
import LoginPayment from './componets/payments';
import TokenPayment from './componets/payments/token';
import PainelPayment from './componets/payments/painel';
import LogoutPaymentPage from './componets/pagelogoutpayment';

function PrivateRoute() {
  return localStorage.getItem('token') ? <Panel /> : <Navigate to="/login" />;
}

function PrivatePaymentRoute() {
  return localStorage.getItem('tokenpayment') ? (
    <PainelPayment />
  ) : (
    <Navigate to="/payment-login" />
  );
}

export function RoutesWebPublic() {
  const WarningResp = () => {
    const resp = localStorage.getItem('WarningResp');
    if (resp) return true;
    return false;
  };
  return (
    <>
      {WarningResp() === false ? <WarningSite /> : null}
      <Header />
      <Routes>
        <Route path="/panel" element={<PrivateRoute />} />
        <Route path="/panel/:p" element={<PrivateRoute />} />
        <Route path="/" element={<Home />} />
        <Route
          path="acompanhantes-do-rio-grande-do-norte-rn-pernambuco-pe-paraiba-pb"
          element={<Home />}
        />
        <Route path="/:cat/:id/:name" element={<Information />} />
        <Route path="/policy/" element={<PrivacyPolicy />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/about/" element={<About />} />
        <Route path="/ads/" element={<AdsClient />} />
        <Route path="/search/:qadrs/:qtc" element={<SearchAds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-login" element={<LoginPayment />} />
        <Route path="/payment-token" element={<TokenPayment />} />
        <Route path="/payment-painel" element={<PrivatePaymentRoute />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export function RoutesWebPrivateError() {
  return (
    <Routes>
      <Route path="/panel" element={<ErrorPanelPage />} />
    </Routes>
  );
}

export function RoutesWebPrivateErrorPayment() {
  return (
    <Routes>
      <Route path="/payment-painel" element={<LogoutPaymentPage />} />
    </Routes>
  );
}
