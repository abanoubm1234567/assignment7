import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = {
    colorScale : 'Sentiment',
  };

  componentDidMount() {}

  componentDidUpdate() {
    var data = this.props.csv_data;
    console.log(data);
    const sentimentColorScale = d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"]);
    const subjectivityColorScale = d3.scaleLinear().domain([0,1]).range(["#ECECEC","#4467C4"]);
    var catCenters = [100, 300, 500];
    d3.forceSimulation(data)
      .force("y",d3.forceY((d) => catCenters[d.Month == "March" ? 0 : (d.Month == "April" ? 1 : 2)])
      )
      .force(
        "collision",
        d3.forceCollide(5)
      )
      .on("tick", () => {
        d3.select("g")
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r",  5)
          .attr("fill", (d) => this.colorScale=='Sentiment'? sentimentColorScale(d.Sentiment): subjectivityColorScale(d.Subjectivity))

          ;
      });
  }

  handleChange = (event) => {
    this.setState({
      colorScale:event.target.value
    })
    console.log(this.state.colorScale)
  };

  render() {
    return(
    <div className="child1">
      <div className="dropdown">
        <p className="select-text">Color By:</p>
        <select className="select-menu" onChange={this.handleChange}>
          <option value="Sentiment">Sentiment</option>
          <option value="Subjectivity">Subjectivity</option>
        </select>
      </div>
      <svg width="1000" height="700">
        <g transform="translate(500,0)"></g>
      </svg>
    </div>
    );
  }
}

export default Child1;
