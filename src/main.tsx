import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    );
