import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login/Login';
import Users from './pages/users/Users';
import Home from './pages/home/Home';
import MyRooms from './pages/my_rooms/MyRooms'
import Admin from './pages/admin/Admin';
import AddAdmin from './pages/add_admin/AddAdmin';
import reportWebVitals from './reportWebVitals';
import 'react-app-polyfill/stable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='home' element={ <Home />} />
        <Route path='login' element={ <Login /> } />
        <Route path='users' element={ <Users />} />
        <Route path='my_rooms' element={ <MyRooms /> } />
        <Route path='admin' element={ <Admin /> } />
        <Route path='add_admin' element={ <AddAdmin /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
