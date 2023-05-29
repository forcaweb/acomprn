import * as React from 'react';
import * as IconsMd from 'react-icons/md';
import axios from 'axios';
import Moment from 'react-moment';
import LoadingPages from '../../loading';

export default function DeleteNotice() {
  const msg = document.querySelector('#formmsg');
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [noticeData, setNoticeData] = React.useState([]);
  const token = localStorage.getItem('token');

  const getNotice = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/notice/`,
        method: 'GET',
        headers
      }).then((resp) => {
        setNoticeData(resp.data);
        setLoadingPages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotice = async (ev) => {
    ev.preventDefault();
    setLoadingPages(true);

    const confirm = document.getElementById('confirm');
    if (confirm.checked === false) {
      if (msg) {
        msg.style.display = 'block';
        msg.innerHTML =
          'Confirme que realmente esta de acordo em fazer alterações.';
      }
      setLoadingPages(false);
      return;
    }
    const id = ev.target.dataset.idlg;
    try {
      const headers = {
        'Content-Type': 'application/json',
        authorization: token
      };
      await axios({
        url: `${process.env.REACT_APP_API_URL}/notice/${id}`,
        method: 'DELETE',
        headers
      }).then((resp) => {
        setLoadingPages(false);
        msg.style.display = 'block';
        msg.innerHTML = resp.data.msg;
        getNotice();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (noticeData.length <= 0) getNotice();
  });

  return (
    <>
      {loadingPages === true ? <LoadingPages /> : null}

      <div className="formConatiner">
        <h1>Delete Avisos</h1>
        <p className="warning">
          <input type="checkbox" name="confirm" id="confirm" /> Ao clicar em{' '}
          <strong>DELETAR</strong>, você esta de acordo com a alteração.{' '}
        </p>
        <nav className="deleteContainer">
          <output id="formmsg" className="msgs" />
          {noticeData.error === false ? (
            <li>
              <img
                src={`${process.env.REACT_APP_API_URL}/public/uploads/${noticeData.notice.image}`}
                alt="aviso"
                crossOrigin="anonymous"
              />
              <p>
                <IconsMd.MdDelete /> Aviso:{' '}
                <small>
                  Postado:{' '}
                  <Moment format="DD/MM/YYYY">
                    {noticeData.notice.updated_at}
                  </Moment>{' '}
                </small>
              </p>

              <a
                href="/"
                aria-label={`${noticeData.notice.name}`}
                data-idlg={noticeData.notice.id}
                onClick={deleteNotice}>
                Deletar
              </a>
            </li>
          ) : (
            <p>Nada aqui!</p>
          )}
        </nav>
      </div>
    </>
  );
}
