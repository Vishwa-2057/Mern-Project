import React, {useRef} from 'react';
import "../JoyStick.css";
import { Link } from 'react-router-dom';

function MenuBar() {

  const mainColor = "#FA4032";
  const compColor = "#FAB12F"

  let navbarContStyle = {
    backgroundColor: mainColor,
    height: "100px",
  }

  let navbarStyle = {
    display: "flex",
  }

  const audioRef = useRef(null);

  const handleClick = (e) => {
    //e.preventDefault();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <div id='top' style={navbarContStyle}>
        <div style={navbarStyle}>
          <div style={{padding:"20px",paddingTop:"10px", width:"20%"}} className="joystickicon">
            <Link to="/" onClick={handleClick}>
              <i className="bi bi-joystick joystickicon"> <audio ref={audioRef} src="./audio/joystickClick.mp3" preload="auto" />
                </i>
            </Link>
          </div>
          <div style={{width:"63%", display:"flex", justifyContent:"center"}}>
            <div className='navbaritem'>
              <Link to={"/games-list"} className="a-nav"> <h3>Games </h3> </Link>
            </div>
            <div className='navbaritem'>
              <Link to={"/create-game"} className="a-nav"> <h3>Add a Game </h3> </Link>
            </div>
            <div className='navbaritem'>
              <Link to={"/users-list"} className="a-nav"> <h3> Users </h3> </Link>
            </div>
            <div className='navbaritem'>
              <Link to={"/create-user"} className="a-nav"> <h3>Add a User </h3> </Link>
            </div>
          </div>
          <div className="profile" style={{height:"100px",width:"17%", backgroundColor:"#FA812F", display:"flex"}}>
              <div style={{width:"50%"}}>
                  <a href="https://www.linkedin.com/in/vishwa-umapathy-347702324/" target="_else">
                    <img style={{height:"100px", border:"solid 3px black"}} src="./assets/vishwa.jpg" alt="" />
                  </a>
              </div>
              <div style={{alignContent:"center", display:"table-column"}}>
                <h4 style={{fontWeight:"bold",fontFamily:"Helvatica"}}>VISHWA U</h4>
                <h5 style={{fontWeight:"bold",fontFamily:"Helvatica",paddingLeft:"20px"}}>24IT069</h5>
              </div>
          </div>
        </div>
      </div>
      <div className="sidebar" style={{position:"fixed",display:"table-column",top:"100px",border:"solid 5px crimson", left:"0", width:"150px", height:"100%", backgroundColor:`${compColor}`}}>
          <div style={{height:"106px", border:"solid 5px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <Link to="/" className="a-nav">Home</Link>
          </div>
          <div style={{height:"106px", border:"solid 5px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <a className="a-nav" href="#top">Back to Top</a>
          </div>
          <div style={{height:"106px", border:"solid 5px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <a className="a-nav" href="#about">About the Page</a>
          </div>
          <div style={{height:"106px", border:"solid 5px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <Link to="/games-list" className="a-nav">Games</Link>
          </div>
          <div style={{height:"106px", border:"solid 5px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <Link to="/users-list" className="a-nav">Users</Link>
          </div>
          <div style={{height:"106px", border:"solid 5px crimson",borderBottom:"solid 10px crimson", display:"grid", justifyContent:"center", alignContent:"center"}}>
            <a className="a-nav" href="#bottom">Go to Bottom</a>
          </div>
      </div>
    </div>
  )
}

export default MenuBar
