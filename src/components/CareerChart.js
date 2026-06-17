"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CareerChart({
  data = [],
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "350px",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="career"
            angle={-20}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            domain={[0, 100]}
          />

          <Tooltip />

          <Bar
            dataKey="score"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}