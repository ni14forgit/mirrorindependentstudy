import Webcam from "react-webcam";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import "./Videocam.css";
import "../Results/Results.css";
import io from "socket.io-client";
import { ClipLoader } from "react-spinners";
let socket;

const ENDPOINT = "10.197.88.190:5000";

const videoConstraints = {
  //1280
  //500,500
  width: 600,
  height: 600,
  facingMode: "user"
};

const styles = {
  display: "flex",
  flexDirection: "row"
};

const Videocam = props => {
  const webcamRef = React.useRef(null);
  const [booth, setBooth] = useState(null);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("acne", () => {
      console.log("acneanalysis raspberry");
      capture();
    });
    socket.emit("join");
  }, []);

  const takePhoto = async () => {
    const wrapper = () => {
      var timesRun = 1;
      setBooth(timesRun);
      var interval = setInterval(function() {
        if (timesRun === 3) {
          setRendering(true);
          clearInterval(interval);
          capture();
        } else {
          timesRun += 1;
          setBooth(timesRun);
        }
      }, 1000);
    };

    await wrapper();
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    $.ajax({
      type: "GET",
      //url: "http://127.0.0.1:5000?base64=" + imageSrc,
      //changed URL TO 5001 remember, 190 is dukeBlue?!!
      url: "http://10.197.88.190:5001?base64=" + imageSrc,
      // url: "http://10.194.24.88:5001?base64=" + imageSrc,
      dataType: "json",
      data: JSON.stringify(),
      //success: function(data, e) {
      success: data => {
        console.log(data);
        props.setlastimage(data["image"]);
        props.sethistory(oldArray => [...oldArray, data["image"].slice(0, 5)]);
        props.toggle();
        setRendering(false);
      }
    });
  }, [webcamRef]);

  let boothdisplaylogo1;
  let boothdisplaylogo2;

  if (rendering) {
    boothdisplaylogo1 = (
      // <LoadingOverlay
      //   active={rendering}
      //   spinner
      //   text="Analyzing"
      //   style={{ color: "green" }}
      // >
      //   {/* <p>Some content or children or something.</p> */}
      // </LoadingOverlay>
      <ClipLoader size={100} color={"#126fbc"} loading={rendering} />
    );
    boothdisplaylogo2 = (
      <ClipLoader size={100} color={"#126fbc"} loading={rendering} />
    );
  } else {
    boothdisplaylogo1 = <p>{booth}</p>;
    boothdisplaylogo2 = <p>{booth}</p>;
  }

  return (
    <div>
      <div>
        <div className="horiz1">{boothdisplaylogo1}</div>
        <Webcam
          className="stylecam"
          audio={false}
          height={750}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={750}
          videoConstraints={videoConstraints}
        />
        <div className="horiz2">{boothdisplaylogo2}</div>
      </div>
      <div>
        <button type="button" onClick={takePhoto}>
          Capture photo
        </button>
      </div>
    </div>
  );
};

export default Videocam;
