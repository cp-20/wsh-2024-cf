import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp } from '@wsh-2024/app/src/index';

const main = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot(document.querySelector('#root')!).render(<AdminApp />);
    } else {
      ReactDOM.hydrateRoot(
        document.querySelector('#root')!,
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>,
      );
    }
  });
};

main().catch(console.error);
