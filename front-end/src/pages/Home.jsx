import React from 'react';
import "../JoyStick.css";
import 'react-h5-audio-player/lib/styles.css';
import { useState, useEffect, useRef } from 'react';

function Home() {

  const audioRef = useRef(null);
  const [isPlaying, SetIsPlaying] = useState(false);

  const mainColor = "#FEF3E2";
  const compColor = "#FAB12F";

   const MusicPlay = () => {
    const audio = audioRef.current;
    if(!audio) return;

    let musicIcon = document.getElementById("musicIcon");

    if (!isPlaying) {
      audio.volume = 0.5;
      audio.play().catch((err) => {
        console.log('Autoplay blocked or failed:', err);
      });
      SetIsPlaying(true);
    }
    else{
      audio.pause();
      SetIsPlaying(false);
      musicIcon.setAttribute("className","bi bi-music-note");
    }
  }

  return (
    <div id="HomeTop" >
      <audio ref={audioRef} src="./music/flamencoMusic.mp3" loop/>
      <div style={{padding:"25px",backgroundColor: `${mainColor}`,display:"flex", justifyContent:"center", alignContent:"center"}}>
        <div style={{width:"95%", paddingLeft:"525px"}}>
          <h1 style={{}}>Welcome to my Website!</h1>
        </div>
        <div style={{width:"5%", display:"flex", alignContent:"center", justifyContent:"center"}}>
          <div className="musicButton" onClick={MusicPlay}>
            <i id='musicIcon' style={{fontSize:"30px"}} className={isPlaying ? "bi bi-file-music-fill" : "bi bi-file-music"}></i>
            {isPlaying ? 'Pause' : 'Play'}
          </div>
        </div>
      </div>
      <div style={{backgroundColor: `${mainColor}`, display:"flex", justifyContent:"center", alignContent:"center"}}>
        <div id="CarouselDiv" className="CarouselDiv" style={{width:"180vh",marginLeft:"160px", border:"solid 5px #180f0fff"}}>
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="./assets/godofwar.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="./assets/reddead2.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="./assets/spider-man2.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      </div>
      <div id="bottom" style={{backgroundColor:"#FEF3E2"}}>
        <p style={{paddingLeft:"200px", paddingRight:"25px", paddingTop:"25px", paddingBottom:"25px"}}>
          The history of games dates to the ancient human past.[3] Games are an integral part of all cultures and are one of the oldest forms of human social interaction. Games are formalized expressions of play which allow people to go beyond immediate imagination and direct physical activity. Common features of games include uncertainty of outcome, agreed upon rules, competition, separate place and time, elements of fiction, elements of chance, prescribed goals and personal enjoyment.
        </p>
      </div>
      <div id="about" style={{paddingLeft:"100px",backgroundColor:"#FEF3E2", display:"flex", alignContent:"center", textAlign:"center", justifyContent:"center", margin:"0px"}}>
        <h1 style={{padding:"50px",paddingBottom:"0px"}}>ABOUT SECTION</h1>
      </div>
       <div id="about" style={{paddingLeft:"100px",backgroundColor:"#FEF3E2", display:"flex", alignContent:"center", textAlign:"center", justifyContent:"center", margin:"0px"}}>
        <p>
          This website was developed as a personal project by me using MERN Stack
        </p>
      </div>
    </div>
  );
}

export default Home
