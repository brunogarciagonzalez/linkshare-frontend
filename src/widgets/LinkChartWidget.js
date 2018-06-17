import React from "react";
import { Line } from "react-chartjs-2";

class LinkChartWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      x_axis: [],
      y_axis: []
    };
  }

  componentDidMount() {
    let current_num = 0;
    let current_sum = 0;
    let x = [];
    let y = [];
    this.props.reviews.forEach(review => {
      current_num++;
      current_sum += review.review.rating;
      let avg = parseFloat((current_sum / current_num).toFixed(1));
      x.push(current_num);
      y.push(avg);
    });

    this.setState({ x_axis: x, y_axis: y });
  }

  render() {
    return (
      <div className="chart_size">
        <Line
          data={{
            labels: this.state.x_axis,
            datasets: [
              {
                label: `Change in Rating as Reviews Added, for ${
                  this.props.link
                }`,
                data: this.state.y_axis,
                max: 10,
                min: 1,
                borderColor: "rgb(217,154,1)",
                backgroundColor: "rgb(217,154,1,0.25)"
              }
            ]
          }}
          width={40}
          height={20}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            legend: {
              display: true,
              labels: {
                boxWidth: 0,
                fontColor: "rgb(0, 0, 0)"
              }
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Average Rating"
                  },
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 10
                  }
                }
              ],
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Number of Reviews"
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default LinkChartWidget;
