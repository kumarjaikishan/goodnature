import React, { useState } from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setnarrow } from '../../store/login';

const Navbar = ({ imgine}) => {
  const username = localStorage.getItem("name");
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  const fun = () => {
    if (log.narrow) {
      dispatch(setnarrow(false))
    } else {
      dispatch(setnarrow(true))
    }
  }
 
  return (
    <>
      <div className={log.narrow ? "nav narrow" : "nav"}>
        <div className="cont">
          <span onClick={fun}><MenuIcon /></span>
          <span>{log.head} </span>
        </div>
        {log.user ? <div className="info">
        <NavLink to='/photo' > <div className="photo" ><img src={ imgine} alt="" /> </div> </NavLink>
          <div className="userinfo">
            <span>{username} </span>
            <span>{log.isadmin? "Admin":"Normal"}</span>
          </div>
        </div> : null}
      </div>
    </>
  )
}

export default Navbar;