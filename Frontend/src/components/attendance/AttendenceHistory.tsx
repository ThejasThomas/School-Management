import { useEffect, useState } from "react";
import { getAttendanceHistory } from "../../services/attendance.service";
import { Calendar, Search, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const AttendanceHistory = () => {
  const [records, setRecords] = useState<any[]>([]);
const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    fetchHistory();
  }, [date, search, page]);

  const fetchHistory = async () => {
    const data = await getAttendanceHistory({
      page,
      search,
      date,
    });

    setRecords(data.records);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  return (
    <div className="w-full">
      {/* FILTERS CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="space-y-4">
          {/* DATE PICKER */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-blue-900" />
              Select Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={date}
              onChange={(e) => {
                setPage(1);
                setDate(e.target.value);

                if (!e.target.value) {
                  setRecords([]);
                }
              }}
            />
          </div>

          {/* SEARCH */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search size={18} className="text-blue-900" />
              Search Student
            </label>
            <input
              placeholder="Enter student name..."
              disabled={!date}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg transition ${
                !date
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* EMPTY STATE - NO DATE SELECTED */}
      {!date && (
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl border-2 border-dashed border-blue-200 p-12 text-center">
          <Calendar size={48} className="mx-auto text-blue-900 mb-4 opacity-50" />
          <p className="text-gray-600 text-lg">Select a date to view attendance history</p>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mb-4"></div>
          <p className="text-gray-600">Loading attendance records...</p>
        </div>
      )}

      {/* DATA DISPLAY */}
      {date && !loading && (
        <>
          {records.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <CheckCircle size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                {search
                  ? "No students found matching your search"
                  : "No attendance records found for this date"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* TABLE HEADER */}
              <div className="hidden md:grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold">
                <div>Student Name</div>
                <div>Date</div>
                <div className="text-right">Status</div>
              </div>

              {/* TABLE BODY */}
              <div className="divide-y divide-gray-200">
                {records.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 md:grid md:grid-cols-3 md:gap-4 md:items-center hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.studentId?.name}</p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {new Date(r.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="hidden md:block text-gray-600">
                      {new Date(r.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-0 md:justify-end">
                      <span className="text-xs font-semibold text-gray-500 md:hidden">Status:</span>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${
                          r.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status === "present" ? (
                          <>
                            <CheckCircle size={16} />
                            <span>Present</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} />
                            <span>Absent</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGINATION */}
          {date && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="text-gray-700 font-semibold">
                Page <span className="text-blue-900">{page}</span> of{" "}
                <span className="text-blue-900">{totalPages}</span>
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceHistory;