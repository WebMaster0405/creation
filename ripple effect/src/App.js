import { Player, Controls } from "@lottiefiles/react-lottie-player";
import React, { useState } from 'react';
import Lottie from "react-lottie";
import ripple from "./assets/Ripples-02.json";

import Button from "@material-ui/core/Button";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

export default function App() {

  const [index, setIndex] = useState(0);


  var defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ripple,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }

  };


  
  return (
    <>
      <div className="App">
        <div style={{ width: "50%",textAlign: "center", margin: "auto", background : "black" }}>


          <Lottie autoplay loop options={defaultOptions} mouseDown={false}
            style={{ height: "100%", textAlign: "center", border: "1px solid black", margin: "auto" }}
          />
           
        </div>
      </div>
    </>
  );
}
