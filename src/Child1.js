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
    //console.log(data);
    const sentimentColorScale = d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"]);
    const subjectivityColorScale = d3.scaleLinear().domain([0,1]).range(["#ECECEC","#4467C4"]);
    var catCenters = [100, 300, 500];
    d3.forceSimulation(data)
      .force("y",d3.forceY((d) => catCenters[d.Month === "March" ? 0 : (d.Month === "April" ? 1 : 2)])
      )
      .force(
        "collision",
        d3.forceCollide(6)
      )
      .on("tick", () => {
        d3.select("g")
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr('class', 'circles')
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r",  5)
          .attr("fill", (d) => this.state.colorScale==='Sentiment'? sentimentColorScale(d.Sentiment): subjectivityColorScale(d.Subjectivity));
      });
    
      const svg = d3.select('.my-svg');

    svg.selectAll('.months')
    .data(['March', 'April', 'May'])
    .join('text')
    .attr('class', 'months')
    .attr('x',100)
    .attr('y',(d,i)=> (100+i*200))
    .text(d=> (d))
    .attr('font-size',23)
    .attr('font-weight','bold');

    svg.selectAll('rect')
    .data(this.state.colorScale==='Sentiment'? [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1] : [1, 0.95, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0]
    )
    .join('rect')
    .attr('x', 1300)
    .attr('y', (d,i)=> (100+i*20))
    .attr('fill', d=> this.state.colorScale==='Sentiment'? sentimentColorScale(d): subjectivityColorScale(d))
    .attr('width', 40)
    .attr('height', 20)

    
    svg.selectAll('.scale')
    .data(['Positive', 'Negative'])
    .join('text')
    .attr('class','scale')
    .attr('x',1350)
    .attr('y',(d,i)=>(110+(i*390)))
    .text(d=>d)

  }

  handleChange = (event) => {
    const sentimentColorScale = d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"]);
    const subjectivityColorScale = d3.scaleLinear().domain([0,1]).range(["#ECECEC","#4467C4"]);

    d3.selectAll('.circles')
    .data(this.props.csv_data)
    .attr('fill', (d) => event.target.value === 'Sentiment' ? sentimentColorScale(d.Sentiment) : subjectivityColorScale(d.Subjectivity));

    const svg = d3.select('.my-svg');

    svg.selectAll('rect')
    .data(event.target.value==='Sentiment'? [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1] : [1, 0.95, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0]
    )
    .attr('fill', d=> event.target.value==='Sentiment'? sentimentColorScale(d): subjectivityColorScale(d));



    svg.selectAll('.scale')
    .data(event.target.value==='Sentiment' ? ['Positive', 'Negative'] : [ 'Subjective', 'Objective',])
    .join('text')
    .attr('class','scale')
    .attr('x',1350)
    .attr('y',(d,i)=>(110+(i*390)))
    .text(d=>d)

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
      <svg className='my-svg' width="1800" height="700">
        <g transform="translate(700,0)"></g>
      </svg>
    </div>
    );
  }
}

export default Child1;
