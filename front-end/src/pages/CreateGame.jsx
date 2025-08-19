import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateGame() {
    const [name, setGameName] = useState("");
    const [image, setImage] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        
        axios
            .post("http://localhost:4000/games/create-game", formData)
            .then(() => {
              setGameName("");
              setImage(null);
            })
            .catch(() => alert("Enter all the details!"));
    };

  return (
    <div style={{marginLeft:"250px", marginRight:"100px", marginTop:"50px"}}>
      <h4>Create Game</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label> Game Name </label>
            <input type="text" className="form-control" value={name} onChange={(e) => setGameName(e.target.value)} />
             <label>Game Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        required
                    />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateGame;
