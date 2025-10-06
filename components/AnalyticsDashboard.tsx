"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
// 模拟获取动态数据的函数，可以替换为真实 API
async function fetchAnalyticsData() {
    // 示例：从后端接口获取数据
    // const res = await fetch("/api/analytics");
    // return res.json();

    // 模拟数据返回
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                metrics: {
                    uniqueVisitors: 22400,
                    uniqueClicks: 18500,
                    totalVisitors: 29000,
                    bounceRate: 8,
                    emailSubscribers: 1300,
                },
                chart: [
                    { name: "Mon", uv: 12000 },
                    { name: "Tue", uv: 16000 },
                    { name: "Wed", uv: 10000 },
                    { name: "Thu", uv: 8000 },
                    { name: "Fri", uv: 12000 },
                    { name: "Sat", uv: 10000 },
                    { name: "Sun", uv: 11000 },
                ],
                sources: [
                    { name: "Facebook", value: 6800 },
                    { name: "TikTok", value: 5500 },
                    { name: "Instagram", value: 4900 },
                    { name: "Direct", value: 4200 },
                ],
                countries: [
                    { name: "Albania", value: 7200 },
                    { name: "United States", value: 6300 },
                    { name: "Kosovo", value: 5100 },
                    { name: "Germany", value: 4100 },
                ],
            });
        }, 800);
    });
}

export default function AnalyticsDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData().then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0e1116] text-white">
                <p className="text-slate-400 animate-pulse">加载中...</p>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-5xl bg-[#151a21] border-none shadow-2xl">
            <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold flex items-center gap-2">
                            <span className="text-white">Analytics</span>
                            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                                thelink.bio/SabriHakuli
                            </Badge>
                        </h1>
                    </div>
                    <div className="text-slate-400 text-sm">Jun 18 – Jun 25 ▾</div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-5 gap-6 mt-6 text-center text-white">
                    <Metric label="Unique Visitors" value={`${(data.metrics.uniqueVisitors / 1000).toFixed(1)}k`} />
                    <Metric label="Unique Clicks" value={`${(data.metrics.uniqueClicks / 1000).toFixed(1)}k`} />
                    <Metric label="Total Visitors" value={`${(data.metrics.totalVisitors / 1000).toFixed(0)}k`} />
                    <Metric label="Bounce Rate" value={`${data.metrics.bounceRate}%`} />
                    <Metric label="Email Subscribers" value={`${(data.metrics.emailSubscribers / 1000).toFixed(1)}k`} />
                </div>

                {/* Chart */}
                <div className="mt-6 h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.chart}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#334155" tickLine={false} axisLine={false} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                                labelStyle={{ color: "#94a3b8" }}
                            />
                            <Area type="monotone" dataKey="uv" stroke="#2563eb" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Sources & Countries */}
                <div className="grid grid-cols-2 gap-8 mt-8 text-white">
                    <DataList title="Sources" items={data.sources} />
                    <DataList title="Countries" items={data.countries} />
                </div>
            </CardContent>
        </Card>

    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-slate-400 text-sm">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    );
}

function DataList({ title, items }: { title: string; items: { name: string; value: number }[] }) {
    return (
        <div>
            <h2 className="text-slate-400 text-sm mb-2">{title}</h2>
            <ul className="space-y-1 text-sm">
                {items.map((item) => (
                    <li key={item.name} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-slate-400">{(item.value / 1000).toFixed(1)}k</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export function LineChart(){
    return <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[
            { name: "Mon", uv: 12000 },
            { name: "Tue", uv: 16000 },
            { name: "Wed", uv: 10000 },
            { name: "Thu", uv: 8000 },
            { name: "Fri", uv: 12000 },
            { name: "Sat", uv: 10000 },
            { name: "Sun", uv: 11000 },
        ]}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#334155" tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                labelStyle={{ color: "#94a3b8" }}
            />
            <Area type="monotone" dataKey="uv" stroke="#2563eb" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    </ResponsiveContainer>
}