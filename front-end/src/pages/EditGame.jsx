import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditGame() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch game details to prefill form
  useEffect(() => {
    axios
      .get("http://localhost:4000/games/get-game/" + id)
      .then((res) => {
        setName(res.data.data.name);
        setImage(res.data.data.image);
      })
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    axios
      .put("http://localhost:4000/games/update-game/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => navigate("/games-list"))
      .catch((err) => console.error("Error updating game:", err));
  };

  return (
    <div style={{ marginLeft: "250px", marginTop: "0px", marginRight:"100px" }}>
      <h4>Edit Game</h4>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Game Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Game Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button className="btn btn-primary">Update Game</button>
      </form>
    </div>
  );
}

export default EditGame;
