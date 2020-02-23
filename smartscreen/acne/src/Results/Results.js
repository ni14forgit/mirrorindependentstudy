import React from "react";
import defaultperson from "./default.jpg";
import nishantimage from "./test_nishant.jpg";

//FIX, page is refreshing so not allowing for change to occur
//Tertiary status where it says processing before rendering final image

const Imageresult = props => {
  const toShow = props.toggleStatus;
  console.log("toShow" + toShow);
  if (toShow) {
    //change this so that my face is shown, not default image
    return <img src={nishantimage} alt="Person" />;
  } else {
    return (
      <div>
        <img src={defaultperson} alt="Person" />;
      </div>
    );
  }
};

export default Imageresult;
