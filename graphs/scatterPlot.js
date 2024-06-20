import { data } from "../data/iris.js"

const width = 400;
const height = 250;
const margin = {top: 20, right: 30, bottom: 30, left: 40}

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px solid black");

const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xValue = (d) => d.petalLength;
const yValue = (d) => d.petalWidth;

const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, width]);

const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([height, 0]);

const colorScale = d3
    .scaleOrdinal()
    .domain(Array.from(new Set(data.map((d) => d.species))))
    .range(["red", "blue", "green"]);

g.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 3)
    .attr("cx", d => xScale(xValue(d)))
    .attr("cy", d => yScale(yValue(d)))
    .style("fill", d => colorScale(d.species));