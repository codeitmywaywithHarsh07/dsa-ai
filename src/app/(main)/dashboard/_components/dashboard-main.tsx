"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import {
  FaUserCircle,
  FaFire,
  FaChartLine,
  FaSyncAlt,
  FaCheckCircle
} from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import Container from "@/components/Container";
import { COLORS, difficultyData, topicData } from "./allData";
import Integration from "./integration";



export default function DashboardMain() {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <Container>
      <main className="min-h-screen dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-500 dark:text-white">
              Welcome back,{" "}
              <span className="text-gray-800 dark:text-blue-400">Harsh!</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here's your coding progress
            </p>
          </div>
          {/* <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <FaSyncAlt className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div> */}
        </div>

        {/* Profile Card */}
        <section className="bg-gradient-to-tr from-gray-600 to-gray-900 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <div className="relative">
              <FaUserCircle className="text-8xl opacity-90" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-md">
                <div className="bg-white rounded-full p-1">
                  <FaChartLine className="text-emerald-500 text-xs" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Harsh Tripathi</h2>
              <p className="opacity-90 mb-3 text-gray-100">Full Stack Developer</p>
              <div className="flex gap-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FaFire className="text-yellow-300" /> 12 day streak
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Level 3 Coder
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Attempted",
              value: 150,
              icon: FaCheckCircle,
              change: "+12%",
              color: "text-blue-500",
            },
            {
              title: "Completed",
              value: 120,
              icon: FaCheckCircle,
              change: "+8%",
              color: "text-emerald-500",
            },
            {
              title: "Revisited",
              value: 30,
              icon: FaRotate,
              change: "+5%",
              color: "text-purple-500",
            },
            {
              title: "Streaks",
              value: "12 days",
              icon: FaFire,
              change: "+3%",
              color: "text-amber-500",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <p className={`text-3xl font-bold mt-1 text-gray-800`}>
                    {item.value}
                  </p>
                </div>
                {/* <span className="text-2xl">{item.icon}</span> */}
                <item.icon className="size-7 text-gray-600"/>
              </div>
              {/* <p className="text-xs mt-2 text-emerald-500 dark:text-emerald-400 flex items-center">
                <span className="inline-block mr-1">↑</span>
                {item.change} from last week
              </p> */}
            </div>
          ))}
        </section>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {["stats", "topics", "activity"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-gray-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Difficulty Breakdown */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Solved Difficulty Breakdown
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-[65%] h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      animationDuration={800}
                      label={({ name, percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                      }
                      cornerRadius={100}
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => (
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                          <p className="font-bold">{payload?.[0]?.name}</p>
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              Solved:{" "}
                            </span>
                            <span className="font-semibold">
                              {payload?.[0]?.value}
                            </span>
                          </p>
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                {difficultyData.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${hexToRgba(COLORS[index], 0.1)}`,
                      borderLeft: `4px solid ${COLORS[index]}`,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4
                          className="font-semibold"
                          style={{ color: COLORS[index] }}
                        >
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.value}/{item.total} solved
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                          {Math.round((item.value / item.total) * 100)}%
                        </p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(item.value / item.total) * 100}%`,
                              backgroundColor: COLORS[index],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Topics Progress */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Topics Progress
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topicData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                  
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip
                      content={({ payload }) => (
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                          <p className="font-bold">{payload?.[0]?.name}</p>
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              Solved:{" "}
                            </span>
                            <span className="font-semibold">
                              {payload?.[0]?.value}
                            </span>
                          </p>
                        </div>
                      )}
                    />
                  <Bar dataKey="solved" fill="#8884d8" radius={[0, 12, 12, 0]}>
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getTopicColor(index)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <Integration/>
      </main>
    </Container>
  );
}

// Helper function to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Helper function to get topic colors
function getTopicColor(index: number): string {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];
  return colors[index % colors.length];
}
