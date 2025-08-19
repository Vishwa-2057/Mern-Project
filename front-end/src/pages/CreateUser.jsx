import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({name: "", score: "", game: ""});
  const [games, setGames] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/games/")
      .then((res) => setGames(res.data.data));
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("score", user.score);
        formData.append("game", user.game);
        if (image) formData.append("image", image);

        axios.post("http://localhost:4000/users/create-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setUser({ name: "", score: "", game: "" });
          setImage(null);
        });
    };

  return (
    <div style={{marginLeft:"250px", marginRight:"100px", marginTop:"50px"}}>
      <h4>Create User</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label>UserName</label>
            <input type="text" className="form-control" name="name" value={user.name} onChange={onChange} />
        </div>

        <div className="mb-3">
            <label>Score</label>
            <input type="number" className="form-control" name="score" value={user.score} onChange={onChange} />
        </div>

        <div>
          <label>Profile Photo:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
        </div>

        <div className="mb-3">
            <label>Game</label>
            <select name="game" className="form-control" value={user.game} onChange={onChange}>
              <option value="">Select</option>
              {games.map((e) => (
                <option key={e._id} value={e._id}>
                      {e.name}
                </option>
              ))}
            </select>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateUser
