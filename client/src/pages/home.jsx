import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { header, setloader } from '../store/login';

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  useEffect(() => {
    if (!log.user) {
      navigate('/login');
      return;
    }
    // dispatch(setloader(true));
    dispatch(header("Dashboard"))
  }, [])



  return (
    <>
      <div className="home">
        this is home page
      </div>
    </>
  )
}

export default Home