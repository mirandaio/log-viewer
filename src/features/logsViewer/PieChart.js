import * as d3 from "d3";

const WIDTH = 280;
const HEIGHT = 280;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - 30;
const LABEL_RADIUS = RADIUS * 0.65;

function PieChart({ stats }) {
  const data = [];
  Object.keys(stats).forEach((key) =>
    data.push({ name: key, value: stats[key] })
  );

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const arcs = pie(data);
  const arc = d3.arc().innerRadius(0).outerRadius(RADIUS);
  const arcLabel = d3.arc().innerRadius(LABEL_RADIUS).outerRadius(LABEL_RADIUS);

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(d3.schemePastel1);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={WIDTH}
      height={HEIGHT}
      viewBox={`${-WIDTH / 2} ${-HEIGHT / 2} ${WIDTH} ${HEIGHT}`}
    >
      <g>
        {arcs.map((a) => {
          return (
            <path key={a.data.name} fill={color(a.data.name)} d={arc(a)} />
          );
        })}
      </g>
      <g fontSize="13" textAnchor="middle">
        {arcs.map((a) => {
          return (
            <text
              key={a.data.name}
              y="-0.4em"
              transform={`translate(${arcLabel.centroid(a)})`}
            >
              {a.data.name} ({a.data.value})
            </text>
          );
        })}
      </g>
    </svg>
  );
}

export default PieChart;
