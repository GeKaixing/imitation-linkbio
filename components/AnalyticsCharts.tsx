"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "./ui/card";

const chartData = {
  devices: [
    { name: "Desktop", value: 45, color: "#3b82f6" },
    { name: "Mobile", value: 35, color: "#ec4899" },
    { name: "Tablet", value: 10, color: "#22c55e" },
    { name: "Other", value: 10, color: "#a855f7" },
  ],
  browsers: [
    { name: "Chrome", value: 40, color: "#3b82f6" },
    { name: "Safari", value: 20, color: "#22c55e" },
    { name: "Edge", value: 10, color: "#8b5cf6" },
    { name: "Firefox", value: 10, color: "#f97316" },
    { name: "Opera", value: 10, color: "#ec4899" },
    { name: "Other", value: 10, color: "#06b6d4" },
  ],
  os: [
    { name: "Android", value: 25, color: "#3b82f6" },
    { name: "iOS", value: 20, color: "#22c55e" },
    { name: "Windows", value: 15, color: "#9333ea" },
    { name: "MacOS", value: 15, color: "#f97316" },
    { name: "Linux", value: 15, color: "#ec4899" },
    { name: "Other", value: 10, color: "#06b6d4" },
  ],
};

function ChartCard({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="bg-[#141517] rounded-2xl border border-[#1f2023] p-6 flex flex-col items-center text-white w-full">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">Mar 30 - Apr 29</p>

      <div className="w-full h-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={0}
              stroke="none"
              dataKey="value"
            >
              {data.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#1f2023", border: "none", color: "#fff", }} itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#9ca3af" }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AnalyticsCharts() {
  return (
    <Card className="w-full max-w-5xl bg-[#151a21] border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <ChartCard title="Devices" data={chartData.devices} />
          <ChartCard title="Browsers" data={chartData.browsers} />
          <ChartCard title="Operating Systems" data={chartData.os} />
        </div>
      </CardContent>
    </Card>

  );
}
