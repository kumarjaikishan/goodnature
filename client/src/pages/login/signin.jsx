import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login,setloader,setadmin,setexplist,setledger,header } from '../../store/login';
import {useDispatch } from 'react-redux';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Signin = ({  setleddetail,  notification, setimgine }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const init = {
        email: "",
        password: ""
    } 
    useEffect(() => {
        dispatch(setloader(false));
       }, [])
    const [signinp, setsigninp] = useState(init);
    const [loginpass, setloginpass] = useState(true);
    const [btnclick, setbtnclick] = useState(false);

    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }

    const submit = async () => {
        // dispatch(login(true));
        setbtnclick(true);
        const { email, password } = signinp;

        if (!email || !password) {
            notification.warn("All fields are Required", 1300);
            setbtnclick(false);
            return;
        }
        try {
            dispatch(setloader(true));
            const res = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const datae = await res.json();
            console.log(datae);
            const username = datae.data[0].name;
            const profileurl = datae.data[0].imgsrc;
            
            if(datae.data[0].usertype==="admin"){
                console.log("ha admin hai");
                dispatch(setadmin(true));
            }
            if(datae.data[0].usertype==="user"){
                console.log("ha user hai")
                dispatch(setadmin(false));
            }
            document.title = "AccuSoft - " + datae.data[0].name;
            const mail = datae.data[0].email;
            const id = datae.data[0]._id;

            notification.success("Login Successfully", 1300);

            dispatch(login(true));
            dispatch(setledger(datae.data[0].ledger));
            setleddetail(datae.data[0].ledger);
            if (datae.data[0].imgsrc == "" || !datae.data[0].imgsrc) {
                setimgine("just.png");
            } else {
                setimgine(datae.data[0].imgsrc);
            }

            dispatch(setexplist(datae.explist));
            localStorage.setItem("name", username);
            localStorage.setItem("image", datae.data[0].imgsrc);
            localStorage.setItem("email", mail);
            localStorage.setItem("id", id);
            navigate('/');
        } catch (error) {
            notification.warn("No user found", 1900);
            setbtnclick(false);
            dispatch(setloader(false));
        }
    }

    return (
        <>

            <div className="logine">
                <TextField
                    label="Email*"
                    size="small"
                    className='filled'
                    onChange={signhandle}
                    name="email"
                    value={signinp.email}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>,

                    }}
                />
                <TextField
                    label="Password*"
                    className='filled'
                    size="small"
                    type={loginpass ? "password" : null}
                    onChange={signhandle}
                    name="password"
                    value={signinp.password}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => loginpass ? setloginpass(false) : setloginpass(true)}>
                            {loginpass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                        </InputAdornment>
                    }}

                />
                <button disabled={btnclick} style={btnclick ? { background: "#cccccc", color: "#666666" } : { background: "#0984e3", color: "white" }} onClick={submit}>Login</button>
             
            </div>
        </>
    )
}

export default Signin;