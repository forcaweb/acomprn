import * as React from 'react';
import * as IconsAi from 'react-icons/ai';
import axios from 'axios';
import './notice.css';

export default function Notice() {
  const [noticeData, setNoticeData] = React.useState({
    error: true,
    notice: []
  });

  const getNoticies = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/notice/`);
    setNoticeData(result.data);
  };

  const saveClick = () => {
    const notice = document.querySelector('#notice');
    const dateExpired = noticeData.notice.expired_in;
    const compareDates = Number(dateExpired) - Number(Date.now());
    localStorage.setItem('XCLK', true);
    const pausedDateModal = Number(Date.now()) + 3600000;
    localStorage.setItem('XPM', pausedDateModal);
    if (compareDates <= 0) {
      notice.style.display = 'none';
    }
  };

  const handleClick = () => {
    const close = document.querySelector('#close');
    const closeIcon = document.querySelector('#close-icon');
    const notice = document.querySelector('#notice');
    const itemStoregy = localStorage.getItem('XCLK');
    if (itemStoregy) notice.style.display = 'none';
    document.addEventListener('click', (e) => {
      if (e.target === close) {
        notice.style.display = 'none';
        saveClick();
      }
      if (e.target === closeIcon) {
        notice.style.display = 'none';
        saveClick();
      }
      if (e.target === notice) {
        notice.style.display = 'none';
        saveClick();
      }
    });
  };

  const refreshModal = () => {
    const modalTime = localStorage.getItem('XPM');
    const compareDates = Number(modalTime) - Number(Date.now());
    if (compareDates <= 0) {
      localStorage.removeItem('XCLK');
    }
  };

  React.useEffect(() => {
    getNoticies();
    handleClick();
    refreshModal();
  });
  return (
    <div>
      {noticeData.error === false ? (
        <div className="notice" id="notice">
          <div className="content">
            <button type="button" id="close" title="Fechar">
              <IconsAi.AiOutlineClose id="close-icon" />
            </button>
            <a
              href={noticeData.notice.linksite}
              aria-label={noticeData.notice.linksite}
              title={noticeData.notice.linksite}>
              <img
                src={`${process.env.REACT_APP_API_URL}/public/uploads/${noticeData.notice.image}`}
                alt={noticeData.notice.linksite}
                crossOrigin="anonymous"
              />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
