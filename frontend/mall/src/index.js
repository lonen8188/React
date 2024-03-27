import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';  // p351 추가
import store from './store' // p351 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  {/* <React.StrictMode> //p135 두번 호출 해결 */}
    <App />
  {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
