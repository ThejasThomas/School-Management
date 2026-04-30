import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getDailyAttendanceStats } from "../../services/attendance.service";
import { Calendar, Users, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const COLORS = ["#10b981", "#ef4444"];

interface AttendanceStatsType {
  date: string;
  total: number;
  present: number;
  absent: number;
  percentage: string;
}

const AttendanceStats = () => {
  const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
const [data, setData] = useState<AttendanceStatsType | null>(null);  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;

    setLoading(true);

    getDailyAttendanceStats(date)
      .then(setData)
      .finally(() => setLoading(false));
  }, [date]);

  const chartData = data
    ? [
        { name: "Present", value: data.present },
        { name: "Absent", value: data.absent },
      ]
    : [];

  return (
    <div className="w-full">
      {/* DATE PICKER CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-blue-900" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Select Date</h2>
        </div>
        <input
          type="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* EMPTY STATE */}
      {!date && (
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-12 text-center">
          <Calendar size={48} className="mx-auto text-blue-900 mb-4 opacity-50" />
          <p className="text-gray-600 text-lg">Select a date to view attendance statistics</p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      )}

      {/* DATA DISPLAY */}
      {data && !loading && (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* TOTAL */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Students</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{data.total}</p>
                </div>
                <Users className="text-blue-900 opacity-20" size={40} />
              </div>
            </div>

            {/* PRESENT */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Present</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{data.present}</p>
                </div>
                <CheckCircle className="text-green-500 opacity-20" size={40} />
              </div>
            </div>

            {/* ABSENT */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Absent</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{data.absent}</p>
                </div>
                <XCircle className="text-red-500 opacity-20" size={40} />
              </div>
            </div>

            {/* PERCENTAGE */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 font-medium">Attendance %</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{data.percentage}%</p>
                </div>
                <TrendingUp className="text-amber-500 opacity-20" size={40} />
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-blue-900" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Attendance Distribution</h3>
            </div>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={2}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value} students`}
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NO DATA */}
      {date && !loading && data?.total === 0 && (
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-8 text-center">
          <Calendar className="mx-auto text-yellow-600 mb-3" size={40} />
          <p className="text-yellow-800 font-medium">No attendance found for this date</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceStats;