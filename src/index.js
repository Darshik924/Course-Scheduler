import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const supabase=createClient(
  "https://dngvqmoklefoxrzrqmqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZ3ZxbW9rbGVmb3hyenJxbXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDUyNjcsImV4cCI6MjA3NjYyMTI2N30.MdMQwCCZnZ9mvfjQdIytiVjqLoX1ds4ft9pkeUEUFYI"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      
      <App />
     
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
