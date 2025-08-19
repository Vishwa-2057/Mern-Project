import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const [user, setUser] = useState({ name: "", score: "", game: "" });
  const [games, setGames] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);


  useEffect(() => {
    axios
      .get("http://localhost:4000/games/")
      .then((res) => setGames(res.data.data));

    axios.get("http://localhost:4000/users/get-user/" + id).then((res) =>
      setUser({
        name: res.data.data.name,
        score: res.data.data.score,
        game: res.data.data.game,
      })
    );
  }, [id]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("score", user.score);
    formData.append("game", user.game);
    if (image) formData.append("image", image);

    axios.put(`http://localhost:4000/users/update-user/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => navigate("/users-list"))
  };

  return (
    <div style={{marginLeft:"250px", marginRight:"100px", marginTop:"50px"}}>
      <h4>Edit user</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>user Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label>user Name</label>
          <img
            src={`http://localhost:4000/users/image/${id}`}
            alt="Current"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
        </div>
        
        
        <div className="mb-3">
          <label>score</label>
          <input
            type="number"
            className="form-control"
            name="score"
            value={user.score}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label>game</label>
          <select
            name="game"
            className="form-control"
            value={user.game}
            onChange={onChange}
          >
            <option value="">Select</option>
            {games.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
