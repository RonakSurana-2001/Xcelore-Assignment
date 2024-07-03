import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserDetailsPage from './pages/UserDetailsPage';

import { Toaster } from 'react-hot-toast';

import {useSelector} from "react-redux"

function App() {

  const isLogin=useSelector((state)=>state.isLogin)

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/userdetails" element={isLogin ?<UserDetailsPage />:<SignInPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
