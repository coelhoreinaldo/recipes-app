import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Provider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <HashRouter>
      <Provider>
        <App />
      </Provider>
    </HashRouter>,
  );
