import React from "react";
import {
  Rectangle,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";

type Location = {
  x: number;
  y: number;
};
type TypeLocMap = {
  [key: number]: Location[];
};

const colors = [
  "#e5e7eb",
  "#05df72",
  "#51a2ff",
  "#ff8904",
  "#00d492",
  "#7c86ff",
  "#ffba00",
  "#00d5be",
  "#a684ff",
  "#fcc800",
  "#00d3f2",
  "#c27aff",
];

function maxtrixToTypeLocMap(matrix: number[][]) {
  const typeLocMap: TypeLocMap = {};
  let maxX = 0;
  let maxY = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const type = matrix[row][col];
      if (Object.hasOwn(typeLocMap, type))
        typeLocMap[type].push({ x: col, y: row });
      else typeLocMap[type] = [{ x: col, y: row }];
      maxX = Math.max(col, maxX);
      maxY = Math.max(row, maxY);
    }
  }
  return { typeLocMap, maxX, maxY };
}

function renderCustomShape({ cx, cy, xAxis: { width, domain }, fill }: any) {
  const length = width / (domain[1] + 1);
  return (
    <Rectangle
      x={cx}
      y={cy - length}
      width={length}
      height={length}
      fill={fill}
      radius={2}
    />
  );
}

type SchellingModelChartProps = {
  snapshot: number[][];
};

export default function SchellingModelChart({
  snapshot,
}: SchellingModelChartProps) {
  const { typeLocMap, maxX, maxY } = maxtrixToTypeLocMap(snapshot);
  return (
    <ResponsiveContainer aspect={1}>
      <ScatterChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        {Object.keys(typeLocMap)
          .sort()
          .map((type, idx) => (
            <Scatter
              key={`${type}-${idx}`}
              data={typeLocMap[type]}
              fill={colors[idx % colors.length]}
              shape={renderCustomShape}
              isAnimationActive={false}
            />
          ))}
        <XAxis
          dataKey="x"
          type="number"
          domain={[0, maxX + 1]}
          hide
          interval={0}
        />
        <YAxis
          dataKey="y"
          type="number"
          domain={[0, maxY + 1]}
          hide
          interval={0}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
