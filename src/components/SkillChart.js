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

export default function SkillChart({
  data = [],
  title = "Skill Assessment",
  maxScore = 100,
}) {
  if (!data.length) {
    return (
      <div className="rounded-xl border p-6">
        <h3 className="mb-4 text-lg font-semibold">
          {title}
        </h3>

        <div className="flex h-[250px] items-center justify-center">
          <p className="text-gray-500">
            No data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="skill"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, maxScore]}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Score",
              ]}
            />

            <Bar
              dataKey="score"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}