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
import RoomDetail from './pages/room_detail/RoomDetail'
import RoomResults from './pages/room_results/RoomResult'
import RoomInfo from './pages/room_info/RoomInfo'
import RoomVoting from './pages/room_voting/RoomVoting'
import VoteSuccess from './pages/vote_success/VoteSuccess'
import VoteError from './pages/vote_error/VoteError'
import ShowLists from './pages/show_lists/ShowLists'
import ShowRooms from './pages/show_rooms/ShowRooms'
import DeleteCandidate from './pages/delete_candidate/DeleteCandidate'
import ReviewerHome from './pages/reviewer_home/ReviewerHome';
import AddReviewer from './pages/add_reviewer/addReviewer';
import DeleteReviewer from './pages/delete_reviewer/DeleteReviewer';
import ShowReviews from './pages/show_reviews/ShowReviews';
import ShowReviewsDetail from './pages/show_reviews_detail/ShowReviewsDetail';
import FinishRooms from './pages/finish_rooms/FinishRooms';


import reportWebVitals from './reportWebVitals';
import 'react-app-polyfill/stable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FinishRoom from './pages/finish_room/FinishRoom';

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
        <Route path='room_detail/:roomId' element={ <RoomDetail /> } />
        <Route path='room_info/:roomId' element={ <RoomInfo /> } />
        <Route path='room_results/:roomId' element={ <RoomResults /> } />
        <Route path='room_vote/:roomId/list/:listId' element={ <RoomVoting /> } />
        <Route path='vote_success' element={ <VoteSuccess /> } />
        <Route path='vote_error' element={ <VoteError /> } />
        <Route path='show_lists' element={ <ShowLists />} />
        <Route path='show_rooms' element={ <ShowRooms />} />
        <Route path='delete_candidate' element={ <DeleteCandidate />} />
        <Route path='reviewer_home' element={ <ReviewerHome />} />
        <Route path='add_reviewer' element={ <AddReviewer />} />
        <Route path='delete_reviewer' element={ <DeleteReviewer />} />
        <Route path='show_reviews' element={ <ShowReviews />} />
        <Route path='show_reviews_detail/:roomId' element={ <ShowReviewsDetail />} />
        <Route path='finish_rooms' element={ <FinishRooms />} />
        <Route path='finish_room/:roomId' element={ <FinishRoom />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
