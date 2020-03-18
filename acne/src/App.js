import React, { useState, useEffect } from "react";
import "./App.css";
import Videocam from "./Videocam/Videocam";
import Results from "./Results/Results";

function App() {
  const [webcamShow, setWebcamShow] = useState(true);
  const [history, setHistory] = useState({});
  const [lastImage, setLastImage] = useState(null);

  let display;
  if (webcamShow) {
    display = (
      <Videocam
        toggle={setWebcamShow}
        sethistory={setHistory}
        setlastimage={setLastImage}
      />
    );
  } else {
    display = (
      <Results data={history} imagesource={lastImage} toggle={setWebcamShow} />
    );
  }

  return <div>{display}</div>;
}

export default App;
