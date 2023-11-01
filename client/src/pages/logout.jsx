import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../store/login';
import {  useDispatch } from 'react-redux';

const Logout = ({setleddetail}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
    useEffect(() => {
      localStorage.clear("name");
      localStorage.clear("email");
      dispatch(login(false));
      document.title="AccuSoft";
      setleddetail([]);
      navigate('/login');
      return;
    }, [])
}

export default Logout