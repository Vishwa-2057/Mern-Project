import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Users() {
  const [users, setusers] = useState([]);
  const location = useLocation();

  useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get("http://localhost:4000/users/");
    setusers(res.data.data);
  };

  fetchData();
}, [window.performance?.navigation?.type]);

  const deleteUser = (id) => {
    axios
     .delete(`http://localhost:4000/users/delete-user/${id}`)
     .then(() => setusers(users.filter((p) => p._id !== id)));
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
          <div style={{paddingLeft:"200px", width:"1500px"}}>
          <div style={{display:"flex", justifyContent:"center", alignContent:"center", paddingLeft:"100px"}}>
            <h1 style={{paddingTop:"25px",paddingBottom:"25px", paddingRight:"150px"}}>Users Section</h1>
          </div>
    
          <div>
            <ul className="list-group">
              {users.map((use) => (
                <li key={use._id} className="list-group-item d-flex">
                    <div style={{width:"700px", display:"flex"}}>
                      <div style={{padding:"10px",paddingLeft:"10px",width:"20%"}}>
                        <strong>Name</strong>:&nbsp; {use.name}
                      </div>
                      <div style={{width:"18%", padding:"10px"}}>
                        <img
                          src={`http://localhost:4000/users/image/${use._id}`}
                          alt={use.name}
                          style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }}
                      />
                      </div>
                      <div style={{padding:"10px",width:"15%"}}>
                       <strong>Score:</strong>&nbsp; {use.score}
                      </div>
                      <div style={{padding:"10px",width:"46%"}}>
                        <strong>GameID:</strong>&nbsp; {use.game?.name}
                      </div>
                    </div>
                    <div style={{width:"5%", display:"flex"}}>
                      <div style={{paddingLeft:"20px", paddingRight:"20px"}}>
                        <Link style={{paddingLeft:"400px"}} to={"/edit-user/" + use._id}>
                          <button style={{width:"60px"}} className="btn btn-primary btn-sm">Edit</button> 
                        </Link>
                      </div>
                      <div  style={{paddingLeft:"20px", paddingRight:"20px"}}>
                        <button onClick={() => deleteUser(use._id)} className="btn-danger btn btn-sm"> Delete </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
  )
}

export default Users
