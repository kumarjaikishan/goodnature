import React, { useState } from 'react'
import swal from 'sweetalert'
import './modalbox.css';
import { useSelector } from 'react-redux';

const Modalbox = ({ notification, setisledupdate, modal, fetching, init, handler, inp, isupdate, sub, setmodal, setisupdate, setinp }) => {
    const [ledarr, setledarr] = useState([]);
    const log = useSelector((state) => state.login);
    // for updating data fetched above 
   
    // for updating data fetched above ends here
    const jkh = () => {
        setisledupdate(true);
        setmodal(false)
    }
    var modale = document.querySelector(".modal");
    const sdef = function (event) {
        if (event.target == modale) {
            setmodal(false);
        }
    }
    return (
        <div className="modal" onClick={sdef} style={{ display: modal ? "block" : "none" }}>
            <div className="box">
                <h1>Add Promotor</h1>
                <div className="ledgeredit"><i onClick={jkh} className="fa fa-pencil" aria-hidden="true"></i></div>
                <div>
                    <span>Promotor :</span>
                    <span>
                        <select name="promotor" onChange={handler} value={inp.promotor}>
                            <option value="" selected>----Select Senior----</option>
                            {log.promotor[0].map((val, ind) => {
                                return <option value={val.id}>{val.name}</option>
                            })}
                        </select>
                    </span>
                </div>
                <div>
                    <span>Name :</span>
                    <span>
                        <input name="name" type="text" value={inp.name} onChange={handler} />
                    </span>
                </div>
                <div>
                    <span>Curtomer Id :</span>
                    <span>
                        <input name="cust_id" type="text" value={inp.cust_id} onChange={handler} />
                    </span>
                </div>
                <div>
                    <span>Contact :</span>
                    <span>
                        <input name="contact"
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            type="tel" value={inp.contact} onChange={handler} />
                    </span>

                </div>
                <div>
                    <span>Address :</span>
                    <span>
                        <input name="address" value={inp.address} type="text" onChange={handler} />
                    </span>
                </div>
                <div>
                    {isupdate ? <button onClick={() => updatee(inp._id)}>Update</button> : <button onClick={sub}>Submit</button>}
                    <button onClick={() => {
                        setmodal(false);
                        setisupdate(false);
                        setinp(init);
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modalbox;