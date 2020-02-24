import Webcam from "react-webcam";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import "./Videocam.css";
import "../Results/Results.css";
import Imageresult from "../Results/Results";
import io from "socket.io-client";
let socket;

const ENDPOINT = "10.197.88.190:5000";

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
  const [face, setFace] = useState(null);
  const [show, setShow] = useState(false);

  const webcamRef = React.useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("acne", () => {
      console.log("acneanalysis raspberry");
    });
    socket.emit("join");
  }, []);

  // const toggle = () => {
  //   setFace(!face);
  //   console.log(face);
  // };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    $.ajax({
      type: "GET",
      //url: "http://127.0.0.1:5000?base64=" + imageSrc,
      url: "http://10.194.24.88:5000?base64=" + imageSrc,
      dataType: "json",
      data: JSON.stringify(),
      //success: function(data, e) {
      success: data => {
        console.log(data);
        setFace(data["image"]);
        setShow(true);
        //this.setFace(!face)
      }
    });
  }, [webcamRef]);

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
          {/* <button onClick={toggle}>toggle</button> */}
        </>
      </div>
      <Imageresult imagesource={face} shouldshow={show} />
    </div>
  );
};

export default WebcamCapture;
