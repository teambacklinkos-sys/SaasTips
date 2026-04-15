import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);   // null | 'subscribe' | 'share'
  const [payload, setPayload] = useState(null);

  const openModal = useCallback((name, data = null) => {
    setModal(name);
    setPayload(data);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setPayload(null);
  }, []);

  // Lock body scroll while any modal is open
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  return (
    <ModalContext.Provider value={{ modal, payload, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
