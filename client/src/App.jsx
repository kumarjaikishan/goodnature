import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import loadere from '../src/img/loader.png'
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home';
import Promotor from './pages/addpromotor/addpromotor';
import Customer from './pages/addcustomer/addcustomer';
import Booking from './pages/addcustomer/addcustomer';
import { useState } from 'react';
import Login from './pages/login/login';
import Logout from './pages/logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Photo from './pages/photo';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../src/store/login';

function App() {
  const dispatch = useDispatch();
  const [leddetail, setleddetail] = useState([]);
  const [imgine, setimgine] = useState("");

  const log = useSelector((state) => state.login);
  const notification = {
    success: (msg, dur) => {
      toast.success(msg, {
        autoClose: dur,
      });
    },
    warn: (msg, dur) => {
      toast.warning(msg, {
        autoClose: dur,
      });
    }
  }

  // autocolse sidebar when screensize below 600px
  const sidebarclose = () => {
    const width = window.innerWidth;
    // console.log(width)
    width < 600 ? dispatch(setnarrow(true)) : null;
  }


  return (
    <>
      <ToastContainer />

      <div className="App" >
        <Navbar imgine={imgine} />
        <div className={log.narrow ? "main narrow" : "main"} onClick={sidebarclose}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/promotor" element={<Promotor notification={notification} />} />
            <Route path="/customer" element={<Customer notification={notification} />} />
            <Route path="/booking" element={<Booking notification={notification}  />} />
            <Route path="/photo" element={<Photo imgine={imgine} setimgine={setimgine} notification={notification} />} />
            <Route path="/login" element={<Login setimgine={setimgine} setleddetail={setleddetail} notification={notification} />} />
            <Route path="/logout" element={<Logout setleddetail={setleddetail} />} />
            {/* <Route path="/admin" element={<Admin notification={notification}   setleddetail={setleddetail} leddetail={leddetail} />} />
              <Route path="/print" element={<Officeexp/>} /> */}
          </Routes>
          <div style={{ display: log.loader ? "flex" : "none" }} className="loader"><img src={loadere} alt="" /></div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
