import * as React from 'react';
import * as IconsCg from 'react-icons/cg';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './welcome.css';

export default function Welcome() {
  const [getUsersMethod, setGetUsersMethod] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [noActive, setNoAactive] = React.useState(null);

  const getAllUsers = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/usersct/`).then((res) => {
      setGetUsersMethod(true);
      if (res.data.active) {
        setActive(res.data.active);
        setNoAactive(res.data.noActive);
      }
    });
  };

  const chartExcute = async () => {
    const ctx = document.querySelector('#myChart');

    if (ctx) {
      const data = {
        labels: ['Contas Não Ativas', 'Contas Ativas'],
        datasets: [
          {
            label: 'Total',
            data: [noActive, active],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4
          }
        ]
      };

      const config = {
        type: 'doughnut',
        data
      };

      const chart = new Chart(ctx, config);
      chart.render();
    }
  };

  React.useEffect(() => {
    if (getUsersMethod === false) getAllUsers();
    if (getUsersMethod === true) chartExcute();
  });

  return (
    <main className="welcome">
      <div className="tittle">
        <h1>Seja Bem vindo</h1>
      </div>
      <p>
        Seja Bem Vindo ao painel de controle. Clique no menu com este icone{' '}
        <IconsCg.CgMenuGridR />, e selecione uma opção.
      </p>
      <small>
        Qualquer conteúdo postado que não está dentro das regras exigidas. Será
        banido a conta do usúario e o poste deletado.
      </small>
      <div className="graficUsers">
        <canvas id="myChart" />
      </div>
    </main>
  );
}
