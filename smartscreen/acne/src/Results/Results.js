import React from "react";
import defaultperson from "./default.jpg";
//import nishantimage from "./test_nishant.jpg";

//FIX, page is refreshing so not allowing for change to occur
//Tertiary status where it says processing before rendering final image

const Results = props => {
  const newsource = "data:image/jpeg;base64," + props.imagesource;

  return (
    <div>
      <img src={newsource} alt="Person" />
      <p>{props.data}</p>
      <button onClick={props.toggle}>Toggle To Webcam</button>
    </div>
  );
};

export default Results;
