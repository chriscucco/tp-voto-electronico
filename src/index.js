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
import AddRoom from './pages/add_room/AddRoom';
import AddList from './pages/add_list/AddList';
import AddCandidate from './pages/add_candidate/AddCandidate';
import AddVoters from './pages/add_voters/AddVoters';
import AddListToRoom from './pages/add_list_to_room/AddListToRoom'
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
        <Route path='add_room' element={ <AddRoom /> } />
        <Route path='add_list' element={ <AddList /> } />
        <Route path='add_candidate' element={ <AddCandidate /> } />
        <Route path='add_voters' element={ <AddVoters /> } />
        <Route path='add_list_to_room' element={ <AddListToRoom /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
