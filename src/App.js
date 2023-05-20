import * as React from 'react';
import './App.css';
import {
  RoutesWebPublic,
  RoutesWebPrivateError,
  RoutesWebPrivateErrorPayment
} from './routes';

export default function App() {
  if (window.location.pathname === '/panel' && !localStorage.getItem('token')) {
    return <RoutesWebPrivateError />;
  }

  if (
    window.location.pathname === '/payment-painel' &&
    !localStorage.getItem('tokenpayment')
  ) {
    return <RoutesWebPrivateErrorPayment />;
  }

  return <RoutesWebPublic />;
}
