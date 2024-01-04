import React, { useState } from 'react'
import { useEffect } from 'react';
import './addcustomer.css';
import swal from 'sweetalert'
import Pagination from './pagination';
import Modalbox from './custmodalbox';
import Ledpage from './ledpage';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setloader, setcustomer } from '../../store/login';


const Customer = ({ notification }) => {
  let navigate = useNavigate();
  const log = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!log.user) {
      navigate('/login');
      return;
    }
    // setloader(true)
    // fetching();
  }, [])



  const date = new Date;
  const [serinp, setserinp] = useState("");
  const [isupdate, setisupdate] = useState(false);
  let dfbdf = (date.getMonth() + 1);
  let dfbfvfddf = date.getUTCDate();
  if (dfbdf < 10) {
    dfbdf = "0" + dfbdf;
  }
  if (dfbfvfddf < 10) {
    dfbfvfddf = "0" + dfbfvfddf;
  }

  const today = date.getFullYear() + "-" + dfbdf + "-" + dfbfvfddf;

  const init = {
    promotor: "",
    name: "",
    cust_id: "",
    contact: "",
    address: ""
  }
  const [isledupdate, setisledupdate] = useState(false);
  const [inp, setinp] = useState(init);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);

  const just = () => {

  }


  const [modal, setmodal] = useState(false);

  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinp({ ...inp, [name]: value })
  }

  // for creating/inserting data
  const sub = async () => {
    let { promotor, name, cust_id, contact, address } = inp;
    // alert(name);
    if (!name || !cust_id || !contact || !address || !promotor) {
      let dvd = document.querySelector('.box');
      dvd.classList.add("shake");
      setTimeout(() => {
        dvd.classList.remove("shake");
      }, 420);
      console.log(dvd)
      // dispatch(setloader(false));
      return notification.warn("Kindly Fill all Fields", 2100)
    } else {
      // dispatch(setloader(true));
      try {
        const result = await fetch('http://localhost:5000/addcustomer', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            promotor, name, cust_id, contact, address
          })
        })
        const data = await result.json();
        notification.success("New Customer Added", 1600);
        setmodal(false);
        setinp(init);
        fetching();
        console.log(data);
      } catch (error) {
        console.log(error);
      }

    }
  }
  // for creating/inserting data ends here

  const fetching = async () => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      console.log("user id not found");
    } else {
      const result = await fetch('http://localhost:5000/customerlist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid
        })
      })
      const datae = await result.json();
      console.log(datae);
      dispatch(setloader(false));
      dispatch(setcustomer(datae.customer));
    }
  }

  let lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const currentpost = log.customer[0].slice(firstpostindex, lastpostindex);

  let sum = 0;
  return (
    <>
      <div className="exp">
        <div className="add"> <i title='Add Expense' className="fa fa-plus" onClick={() => setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
        <div className="head">
          <span>Expense Voucher List</span>
          <span>
            Record :  <select name="" id="" value={postperpage} onChange={just}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
          </span>
          <span><input type="text" placeholder='Type to search...' /></span>
        </div>
        <div className="table">
          <table cellSpacing="15">
            <thead >
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Promotor</th>
                <th>Id</th>
                <th>Contact</th>
                <th>Address</th>
                <th style={{ display: "none" }}>View</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>All  : <input type="checkbox" id="allcheck" /></th>
              </tr>
            </thead>
            <tbody id="tablecontent">

              {currentpost.filter((item) => {
                return serinp.toLowerCase() === "" ? item : item.narration.toLowerCase().includes(serinp) || item.ledger.toLowerCase().includes(serinp);
              }).map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{firstpostindex + ind + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.promotor}</td>
                    <td>{val.cust_id}</td>
                    <td>{val.contact}</td>
                    <td>{val.address}</td>
                    <td style={{ display: "none" }} title='view'><i className="fa fa-eye" aria-hidden="true"></i></td>
                    <td title='edit'><i onClick={() => edit(val._id)} className="fa fa-pencil" aria-hidden="true"></i></td>
                    <td title='delete' ><i onClick={() => delet(val._id)} className="fa fa-trash-o" aria-hidden="true"></i></td>
                    <td><input type="checkbox" id={val._id} /></td>
                  </tr>
                )
              })}

            </tbody>
            <tfoot>
              <tr id="foot">
                <th colSpan="1" ></th>
                <th colSpan="1" >Total</th>
                <th colSpan="1" id="totalhere">
                  {/* {
                    currentpost.filter((item) => {
                      return serinp.toLowerCase() === "" ? item : item.narration.toLowerCase().includes(serinp) || item.ledger.toLowerCase().includes(serinp);
                    }).reduce((accu, val, ind) => {
                      return accu = accu + val.amount;
                    }, 0)

                  } */}

                </th>
                <th colSpan="4" ></th>
                <th colSpan="1" id="alldelete" title="Delete"><i className="fa fa-trash" aria-hidden="true"></i></th>
                <th colSpan="1" ></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="foot">
          {/* <span>Showing Result From {firstpostindex + 1} To {lastpostindex >= log.explist[0].length ? lastpostindex = log.explist[0].length : lastpostindex} of  {log.explist[0].length} Results</span> */}
          <span>Pages :
            {/* <Pagination currentpage={currentpage} changepageno={changepageno} totalpost={log.explist[0].length} postperpage={postperpage} /> */}
          </span>
        </div>
        <Modalbox notification={notification} setisledupdate={setisledupdate} init={init} setinp={setinp} setisupdate={setisupdate} setmodal={setmodal} sub={sub} modal={modal} handler={handler} inp={inp} isupdate={isupdate} />
        {/* <Ledpage notification={notification} setmodal={setmodal} setisledupdate={setisledupdate} fetching={fetching} isledupdate={isledupdate} setleddetail={setleddetail} leddetail={leddetail} /> */}
      </div>

    </>
  )
}

export default Customer;
