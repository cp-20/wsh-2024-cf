import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

const main = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    const fallback = JSON.parse(document.querySelector('#inject-data')?.innerHTML ?? '{}');
    ReactDOM.hydrateRoot(
      document.querySelector('#root')!,
      <SWRConfig value={{ fallback, revalidateOnFocus: false, revalidateOnReconnect: false }}>
        <BrowserRouter>
          <ClientApp />
        </BrowserRouter>
      </SWRConfig>,
    );
  });
};

main().catch(console.error);
