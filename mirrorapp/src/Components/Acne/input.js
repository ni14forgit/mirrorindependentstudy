import firebase from "./firestore";

const addMeasurement = (dateInput, valueInput) => {
  // e.preventDefault();
  console.log("Triggered!");
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const measurementsRef = db.collection("measurements").add({
    date: dateInput,
    value: valueInput
  });
};

export default addMeasurement;
