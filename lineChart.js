const lineData = [0, 10, 5, 20]

const width = 400;
const height = 250;
const margin = {top: 20, right: 30, bottom: 30, left: 40}

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px solid black");

const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3
    .scaleLinear()
    .domain([0, 3])
    .range([0, width])
    .nice();

const yScale = d3
    .scaleLinear()
    .domain(d3.extent(lineData))
    .range([height, 0])
    .nice();

g.append("g").call(d3.axisLeft(yScale));

g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(width / 50));

const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d));

g.append("path")
    .datum(lineData)
    .attr("d", line)
    .style("stroke", "steelblue")
    .style("stroke-width", 3)
    .style("fill", "none");
