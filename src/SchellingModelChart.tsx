import React from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

type Location = {
  x: number;
  y: number;
};
type TypeLocMap = {
  [key: number]: Location[];
};

const colors = [
  '#ff6467', '#05df72', '#51a2ff',
  '#ff8904', '#00d492', '#7c86ff',
  '#ffba00', '#00d5be', '#a684ff',
  '#fcc800', '#00d3f2', '#c27aff'
];

function maxtrixToTypeLocMap(matrix: number[][]) {
  const typeLocMap: TypeLocMap = {};
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const type = matrix[row][col];
      if (Object.hasOwn(typeLocMap, type)) typeLocMap[type].push({ x: col, y: row });
      else typeLocMap[type] = [{ x: col, y: row }];
    }
  }
  return typeLocMap;
}

function renderCustomShape(props: any) {
  return <></>
}

type SchellingModelChartProps = {
  community: number[][];
};

export default function SchellingModelChart({ community }: SchellingModelChartProps) {
  const typeLocMap = maxtrixToTypeLocMap(community);
  return (
    <ResponsiveContainer>
      <ScatterChart>
        {Object.keys(typeLocMap).sort().map((type, idx) => (
          <Scatter
            data={typeLocMap[type]}
            fill={colors[idx % colors.length]}
            legendType="square"
            shape={renderCustomShape}
          />
        ))}
        <CartesianGrid />
        <XAxis dataKey='x' />
        <YAxis dataKey='y' />
        <Legend />
      </ScatterChart>
    </ResponsiveContainer>
  );
}