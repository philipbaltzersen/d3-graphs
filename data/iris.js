export const data = await d3.csv("data/iris.csv", (d) => ({
    sepalLength: +d.sepalLength,
    sepalWidth: +d.sepalWidth,
    petalLength: +d.petalLength,
    petalWidth: +d.petalWidth,
    species: d.species,
}));
