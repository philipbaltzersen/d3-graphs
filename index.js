import { data } from "./data/iris.js"

const width = 400;
const height = 250;
const margin = {top: 20, right: 30, bottom: 30, left: 40}

const div = htl.html`<div></div>`;

const categories = d3.groups(data, d => d.species);

const buttons = d3.select(div)
    .selectAll("button")
    .data(categories)
    .join("button");

buttons.text(d => d[0]);

const svg = d3.select(div)
    .append("div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px solid black");

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xValues = d => d.sepalLength;
const yValues = d => d.sepalWidth;

const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValues))
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValues))
    .range([height, 0]);

const colorScale = d3.scaleOrdinal()
    .domain(categories.map(d => d[0]))
    .range(d3.schemeDark2);

g.append("g")
    .call(d3.axisLeft(yScale));

g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

const circles = g.selectAll("circle")
    .data(data.filter(d => d.species == "setosa"))
    .join("circle")
    .attr("r", 4)
    .style("stroke", "black")
    .attr("cx", d => xScale(xValues))
    .attr("cy", d => yScale(yValues))
    .style("fill", d => colorScale(d.species));
