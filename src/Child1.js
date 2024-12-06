import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate() {
    var data = [
      { radius: 12, category: 0 },
      { radius: 4, category: 1 },
      { radius: 19, category: 2 },
      { radius: 9, category: 0 },
      { radius: 7, category: 1 },
      { radius: 14, category: 2 },
      { radius: 5, category: 0 },
      { radius: 23, category: 1 },
      { radius: 16, category: 2 },
      { radius: 2, category: 0 },
      { radius: 25, category: 1 },
      { radius: 11, category: 2 },
      { radius: 6, category: 0 },
      { radius: 20, category: 1 },
      { radius: 18, category: 2 },
      { radius: 13, category: 0 },
      { radius: 24, category: 1 },
      { radius: 10, category: 2 },
      { radius: 8, category: 0 },
      { radius: 22, category: 1 },
      { radius: 17, category: 2 },
      { radius: 3, category: 0 },
      { radius: 21, category: 1 },
      { radius: 15, category: 2 },
      { radius: 1, category: 0 },
      { radius: 16, category: 1 },
      { radius: 5, category: 2 },
      { radius: 9, category: 0 },
      { radius: 7, category: 1 },
      { radius: 19, category: 2 },
      { radius: 10, category: 0 },
      { radius: 13, category: 1 },
      { radius: 14, category: 2 },
      { radius: 6, category: 0 },
      { radius: 12, category: 1 },
      { radius: 23, category: 2 },
      { radius: 25, category: 0 },
      { radius: 11, category: 1 },
      { radius: 8, category: 2 },
      { radius: 20, category: 0 },
      { radius: 18, category: 1 },
      { radius: 15, category: 2 },
      { radius: 1, category: 0 },
      { radius: 17, category: 1 },
      { radius: 2, category: 2 },
    ];
    var colorScale = ["#66c2a5", "#fc8d62", "#8da0cb"];
    var catCenters = [100, 200, 300];
    d3.forceSimulation(data)
      .force("y",d3.forceY((d) => catCenters[d.category])
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
