import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customFetch from './utils/customFetch.js'



// customFetch is calling via axios too.
// const resp = await customFetch.get('/test');
// console.log(resp);
// fetch('/api/v1/test').then((res) => res.json()).then((data) => console.log(data));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
