import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate() {
    var data = this.props.csv_data;
    console.log(data);
    var colorScale = ["#66c2a5", "#fc8d62", "#8da0cb"];
    var catCenters = [100, 200, 300];
    d3.forceSimulation(data)
      .force("y",d3.forceY((d) => catCenters[d.Month == "March" ? 0 : (d.Month == "April" ? 1 : 2)])
      )
      .force(
        "collision",
        d3.forceCollide((d) => d.radius)
      )
      .on("tick", () => {
        d3.select("g")
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", (d) => d.radius)
          .attr("fill", (d) => colorScale[d.category]);
      });
  }

  render() {
    return(
    <svg width="1000" height="1000">
      <g transform="translate(300,0)"></g>
    </svg>)
    ;

  }
}

export default Child1;
