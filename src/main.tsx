import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BookmarkProvider } from './context/BookmarkContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookmarkProvider>
      <App />
    </BookmarkProvider>
  </StrictMode>
);
