import React, { useState, useEffect } from "react";
import "./Acne.css";
import Videocam from "./Videocam/Videocam";
import Results from "./Results/Results";
import firebase from "./firestore";

function Acne() {
  const [webcamShow, setWebcamShow] = useState(true);
  const [history, setHistory] = useState([]);
  const [lastImage, setLastImage] = useState(null);

  useEffect(() => {
    var today = new Date();
    var newList = [];
    // potentially delete below setHistory method
    setHistory([]);
    const db = firebase.firestore();
    db.collection("measurements")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //console.log(`${doc.id} => ${doc.data().date}`);
          if (checkWithinMonth(today, doc.data().date)) {
            var newElement = [doc.data().date, doc.data().value];
            newList.push(newElement);
            //setHistory(history => [...history, newElement]);
            console.log("added element to state");
          }
          //console.log(`${doc.id} => ${doc.data().value}`);
        });
      })
      .then(setHistory(newList));
  }, []);

  const checkWithinMonth = (todayDate, dataDate) => {
    var realMonth = Number(todayDate.getMonth()) + 1;
    if (realMonth - Number(dataDate[1]) > 1) {
      return false;
    } else if (realMonth - Number(dataDate[1]) == 1) {
      if (Number(todayDate.getDate()) > Number(dataDate[2])) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

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

export default Acne;
