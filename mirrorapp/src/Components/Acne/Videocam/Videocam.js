import Webcam from "react-webcam";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import "./Videocam.css";
import "../Results/Results.css";
import io from "socket.io-client";
import { ClipLoader } from "react-spinners";
import addMeasurement from "../input";
let socket;

const ENDPOINT = "https://pacific-atoll-21289.herokuapp.com";

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
    socket.on("acneAnalyze", () => {
      console.log("acneAnalyze-client");
      takePhoto();
    });
    socket.emit("join");
  }, []);

  const changeScreen = () => {
    props.toggle();
  };

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
          console.log(timesRun);
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
      type: "POST",
      //changed URL TO 5001 remember, 190 is dukeBlue?!!
      url: "http://radiant-ravine-74747.herokuapp.com/",
      contentType: "application/json",
      //url: "http://192.168.1.13:5000",
      dataType: "json",
      data: JSON.stringify({
        base64: imageSrc
      }),
      success: data => {
        console.log(data);
        const year_month = data["date"];
        const acne_count = Number(data["acne"]);

        addMeasurement(year_month, acne_count);

        props.setlastimage(data["image"]);

        //Check to see string format of data, and convert that to a list like how firebase does

        // props.sethistory(new_list => {
        //   new_list.push([])
        // })

        props.toggle();
        setRendering(false);
      }
    });
  }, [webcamRef]);

  const storeCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    $.ajax({
      type: "GET",
      //SHOULD BE A POST METHOD!!!
      url: "https://radiant-ravine-74747.herokuapp.com/?base64=" + imageSrc,
      dataType: "json",
      data: JSON.stringify(),
      //success: function(data, e) {
      success: data => {
        console.log(data);
        const year_month = data["date"];
        const acne_count = data["acne"];
        props.setlastimage(data["image"]);

        props.sethistory(new_dict => {
          // var new_dict = _.clone(oldDictionary);
          if (year_month in new_dict) {
            new_dict[year_month] = (new_dict[year_month] + acne_count) / 2;
          } else {
            new_dict[year_month] = acne_count;
          }

          return new_dict;
        });
        props.toggle();
        setRendering(false);
      }
    });
  }, [webcamRef]);

  let boothdisplaylogo1;
  let boothdisplaylogo2;

  if (rendering) {
    boothdisplaylogo1 = (
      <ClipLoader size={100} color={"#126fbc"} loading={rendering} />
    );
    boothdisplaylogo2 = (
      <ClipLoader size={100} color={"#126fbc"} loading={rendering} />
    );
  } else {
    boothdisplaylogo1 = <p style={{ color: "white" }}>{booth}</p>;
    boothdisplaylogo2 = <p style={{ color: "white" }}>{booth}</p>;
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
        {/* <button type="button" onClick={storeCapture}>
          Store Photo
        </button> */}
        {/* <button type="button" onClick={addMeasurement}>
          Firebase
        </button> */}
        <button type="button" onClick={changeScreen}>
          See History
        </button>
      </div>
    </div>
  );
};

export default Videocam;
