// src/main.tsx (o src/index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Asegúrate de que esta ruta apunte bien a tu App.tsx
import './index.css'; // Si borraste este archivo, quita esta línea

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);