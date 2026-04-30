import { useEffect, useState } from "react";
import {
  getTeacherStudents,
  saveAttendance,
  getAttendanceByDate,
} from "../../services/attendance.service";
import { Calendar, Users, CheckCircle, XCircle, AlertCircle, Save } from "lucide-react";
import { toast } from "react-toastify";

const AttendanceForm = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTeacherStudents().then((data) => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!students.length) return;
    loadAttendance();
  }, [date, students]);

  const loadAttendance = async () => {
    try {
      const data = await getAttendanceByDate(date);

      if (data.length > 0) {
        const existing: any = {};

        data.forEach((rec: any) => {
          existing[rec.studentId._id] = rec.status;
        });

        setAttendance(existing);
        setIsEditMode(true);
        setIsLocked(true);
      } else {
        const initial: any = {};
        students.forEach((s) => {
          initial[s._id] = "present";
        });

        setAttendance(initial);
        setIsEditMode(false);
        setIsLocked(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = (id: string) => {
    if (isLocked) return;

    setAttendance((prev: any) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  const handleSubmit = async () => {
    const records = Object.keys(attendance).map((id) => ({
      studentId: id,
      status: attendance[id],
    }));

    setSubmitting(true);
    await saveAttendance({ date, records });

    toast.success(isEditMode ? "Attendance updated ✏️" : "Attendance saved ✅");

    setIsLocked(true);
    setSubmitting(false);
    loadAttendance();
  };

  const presentCount = Object.values(attendance).filter((s: any) => s === "present").length;
  const absentCount = Object.values(attendance).filter((s: any) => s === "absent").length;

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
          onChange={(e) => {
            setDate(e.target.value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* STATUS ALERT */}
      {isEditMode && isLocked && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-4">
          <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
          <div className="flex-1">
            <p className="text-amber-900 font-semibold mb-3">
              Attendance already marked for this date
            </p>
            <button
              onClick={() => setIsLocked(false)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition"
            >
              Edit Attendance
            </button>
          </div>
        </div>
      )}

      {isEditMode && !isLocked && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="text-blue-600" size={24} />
          <p className="text-blue-900 font-medium">Edit mode enabled - You can modify entries</p>
        </div>
      )}

      {/* STATS SUMMARY */}
      {students.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Users size={20} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-800">{students.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-green-500">
            <CheckCircle size={20} className="mx-auto text-green-500 mb-2" />
            <p className="text-sm text-green-600">Present</p>
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center border-l-4 border-red-500">
            <XCircle size={20} className="mx-auto text-red-500 mb-2" />
            <p className="text-sm text-red-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mb-4"></div>
          <p className="text-gray-600">Loading student list...</p>
        </div>
      )}

      {/* STUDENT LIST */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Student Attendance</h3>
          </div>

          {students.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto text-gray-300 mb-3" size={40} />
              <p className="text-gray-500">No students assigned</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {students.map((s) => (
                <div
                  key={s._id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-sm text-gray-500">Roll #{s.rollNumber}</p>
                  </div>

                  <button
                    disabled={isLocked}
                    onClick={() => toggleStatus(s._id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                      attendance[s._id] === "present"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {attendance[s._id] === "present" ? (
                      <>
                        <CheckCircle size={18} />
                        Present
                      </>
                    ) : (
                      <>
                        <XCircle size={18} />
                        Absent
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      {!loading && (
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLocked || submitting}
            className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              isLocked || submitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white"
            }`}
          >
            {submitting && (
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            )}
            <Save size={20} />
            {isEditMode ? "Update Attendance" : "Save Attendance"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;