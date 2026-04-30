import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getDashboard } from "../services/dashboard.service";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

interface DashboardType {
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
  };
  charts: {
    studentsPerClass: {
      className: string;
      count: number;
    }[];
    teacherStatus: {
      _id: string;
      count: number;
    }[];
  };
}

const AdminHome = () => {
const [data, setData] = useState<DashboardType | null>(null);  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
    
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!data) return <p className="text-gray-500">Unable to load dashboard data</p>;

  const statCards = [
    {
      icon: Users,
      label: "Total Students",
      value: data.stats.totalStudents,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: GraduationCap,
      label: "Total Teachers",
      value: data.stats.totalTeachers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      icon: BookOpen,
      label: "Total Classes",
      value: data.stats.totalClasses,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "45%",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-lg`}>
                    <Icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400">This Month</span>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="h-1 w-4 bg-blue-900 rounded"></div>
            Students per Class
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.charts.studentsPerClass}>
              <XAxis dataKey="className" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#1e40af" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="h-1 w-4 bg-purple-900 rounded"></div>
            Teacher Status Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.charts.teacherStatus}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                innerRadius={60}
              >
                {data.charts.teacherStatus.map((_: any, i: number) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6">
            {["Active", "Pending", "Blocked"].map((label, idx) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx] }}
                ></div>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;