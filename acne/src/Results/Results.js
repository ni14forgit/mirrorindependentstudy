import React from "react";
import CanvasJSReact from "../canvas/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Results = props => {
  const newsource = "data:image/jpeg;base64," + props.imagesource;
  const datahistory = props.data;

  const datapoint = input => {
    var answer = [];
    Object.keys(input).map((key, index) =>
      answer.push({ x: new Date(key), y: input[key] })
    );
    return answer;
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "Acne Analysis Over Time"
    },
    axisX: {
      valueFormatString: "DD",
      title: "Date"
    },
    axisY: {
      title: "Measurement",
      prefix: "",
      includeZero: false
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: datapoint(datahistory)
      }
    ]
  };

  return (
    <div>
      <img src={newsource} alt="Person" />
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      <button onClick={props.toggle}>Toggle To Webcam</button>
    </div>
  );
};

export default Results;
