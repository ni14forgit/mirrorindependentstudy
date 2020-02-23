import Webcam from "react-webcam";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import "./Videocam.css";
import "../Results/Results.css";
import Imageresult from "../Results/Results";

const videoConstraints = {
  //1280
  width: 500,
  height: 500,
  facingMode: "user"
};

const styles = {
  display: "flex",
  flexDirection: "row"
};

const WebcamCapture = () => {
  const [face, setFace] = useState(false);

  const webcamRef = React.useRef(null);

  const toggle = () => {
    setFace(!face);
    console.log(face);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:5000?base64=" + imageSrc,
      dataType: "json",
      data: JSON.stringify(),
      //success: function(data, e) {
      success: data => {
        console.log(data);
        console.log("successful transfer to flask");
        toggle();
        //this.setFace(!face)
      }
    });
  }, [webcamRef, toggle]);

  //<div className="ResultImage">{imageresult(face)}</div>

  return (
    <div className="navo" style={styles}>
      <div className="Videocam">
        <>
          <Webcam
            audio={false}
            height={828}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={800}
            videoConstraints={videoConstraints}
          />
          <button type="button" onClick={capture}>
            Capture photo
          </button>
          <button onClick={toggle}>toggle</button>
        </>
      </div>
      <Imageresult toggleStatus={face} />
    </div>
  );
};

export default WebcamCapture;
