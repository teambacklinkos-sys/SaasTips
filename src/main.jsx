import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ModalProvider } from './context/ModalContext';
import ToastContainer from './components/ui/ToastContainer';
import ModalRenderer from './components/ModalRenderer';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ModalProvider>
          <App />
          <ToastContainer />
          <ModalRenderer />
        </ModalProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
