import React from 'react';
import './App.css'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginSubPage from '../Pages/LoginSubPage';
import HomePage from '../Pages/HomePage';
import MoviesPage from '../Pages/MoviesPage';
import TvShowsPage from '../Pages/TvShowsPage';
import Search from '../Components/Search/Search';
import AddListPage from '../Pages/AddListPage';
import IndividualPage from '../Pages/IndividualPage';
import Video from '../Components/individual/Video/Video';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>
      <Route exact path='/home' element={<HomePage/>}></Route>
      <Route exact path="/login"  element={<LoginPage />}></Route>
      <Route exact path="/loginauth"  element={<LoginSubPage />}></Route>
      <Route exact path='/signup'  element={<SignupPage/>}></Route>
      <Route exact path='/movies'  element={<MoviesPage/>}></Route>
      <Route exact path='/tvshows'  element={<TvShowsPage/>}></Route>
      <Route exact path='/mylist'  element={<AddListPage/>}></Route>
      <Route exact path='/movie'   element={<IndividualPage/>}></Route>
      <Route exact path='/search'   element={<Search/>}></Route>
      <Route exact path='/trailer'  element={<Video></Video>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
  
}

export default App;
