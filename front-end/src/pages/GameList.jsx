import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GamesList() {
  
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/games/")
      .then((res) => setGames(res.data.data));
  }, []);

  const deleteGame = (id) => {
    axios
     .delete(`http://localhost:4000/games/delete-game/${id}`)
     .then(() => setGames(games.filter((c) => c._id !== id)));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div style={{ paddingLeft: "200px", width: "1500px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingLeft: "100px",
          }}
        >
          <h1
            style={{
              paddingTop: "25px",
              paddingBottom: "25px",
              paddingRight: "150px",
            }}
          >
            Games Section
          </h1>
        </div>

        <div>
          <ul className="list-group">
            {games.map((e) => (
              <li className="list-group-item d-flex" key={e._id}>
                <div style={{ width: "30%" }}>
                  <img
                    src={`http://localhost:4000/games/image/${e._id}`}
                    alt={e.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    paddingRight:"0px"
                  }}
                >
                  <strong>{e.name}</strong>
                </div>

                <div style={{width:"20%", display: "flex", alignItems: "center" }}>
                  <Link to={`/update-game/${e._id}`}>
                    <button className="btn btn-primary btn-sm me-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteGame(e._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GamesList
