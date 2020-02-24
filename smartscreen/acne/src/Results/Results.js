import React from "react";
import defaultperson from "./default.jpg";
//import nishantimage from "./test_nishant.jpg";

//FIX, page is refreshing so not allowing for change to occur
//Tertiary status where it says processing before rendering final image

const Imageresult = props => {
  const base64image = props.imagesource;
  const toggleShow = props.shouldshow;

  if (toggleShow) {
    //change this so that my face is shown, not default image

    //return <p>image</p>;

    const newsource = "data:image/jpeg;base64," + base64image;

    return <img src={newsource} alt="Person" />;
  } else {
    return (
      <div>
        <img src={defaultperson} alt="Person" />;
      </div>
    );
  }
};

export default Imageresult;
