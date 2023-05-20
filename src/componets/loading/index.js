import * as React from 'react';
import * as IconsAi from 'react-icons/ai';
import './loading.css';

export default function LoadingPages() {
  return (
    <main className="loadingpages">
      <div>
        <h1>
          <IconsAi.AiOutlineLoading3Quarters /> Carregando...
        </h1>
      </div>
    </main>
  );
}
