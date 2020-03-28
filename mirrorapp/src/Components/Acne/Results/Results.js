import React from "react";
import CanvasJSReact from "../canvas/canvasjs.react";
import "./Results.css";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const style = {
  border: "10px solid red"
};

const Results = props => {
  const newsource = "data:image/jpeg;base64," + props.imagesource;
  const datahistory = props.data;

  // const datapoint = input => {
  //   var answer = [];
  //   Object.keys(input).map((key, index) =>
  //     answer.push({ x: new Date(key), y: input[key] })
  //   );
  //   return answer;
  // };

  const datapoint = input => {
    var answer = [];
    input.map(xValue => {
      answer.push({ x: new Date(xValue[0]), y: xValue[1] });
    });
    return answer;
  };

  const options = {
    animationEnabled: true,
    //border: "10px solid red",
    title: {
      text: "Acne Analysis Over Time"
    },
    toolTip: {
      borderColor: "white" //change color
    },
    axisX: {
      valueFormatString: "MMMDD",
      lineThickness: 0,
      gridThickness: 0,
      title: "Date"
    },
    axisY: {
      title: "Measurement",
      lineThickness: 0,
      gridThickness: 0,
      prefix: ""
      // includeZero: false
    },
    data: [
      {
        yValueFormatString: "#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: datapoint(datahistory)
      }
    ]
  };

  return (
    <div className="parent">
      <div className="ImageResult">
        <img src={newsource} alt="Person" />
      </div>
      <div className="canvasjsdiv">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
      <div className="toggleButton">
        <button onClick={props.toggle}>Toggle To Webcam</button>
      </div>
    </div>
  );
};

export default Results;
