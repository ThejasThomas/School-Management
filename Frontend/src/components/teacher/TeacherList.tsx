import { useEffect, useState } from "react";
import {
  getTeachers,
  updateTeacherStatus,
  deleteTeacher,
} from "../../services/teacher.service";
import DataTable from "../common/DataTable";
import TeacherModal from "./Teacher.modal";
import { Search, Filter, Edit2, Lock, Unlock, Trash2 } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, [search, status, page]);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await getTeachers({ page, search, status });

      const formatted = data.teachers.map((t: any) => ({
        ...t,
        className: t.classId?.name || "N/A",
        subjectName: t.subjectId?.name || "N/A",
      }));

      setTeachers(formatted);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, newStatus: string) => {
    await updateTeacherStatus(id, newStatus);
    fetchTeachers();
  };

  const handleDelete = async () => {
    if (!selectedTeacherId) return;

    await deleteTeacher(selectedTeacherId);

    setShowDeleteModal(false);
    fetchTeachers();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subjectName", label: "Subject" },
    { key: "className", label: "Class" },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTeacher(row)}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 transition"
            title="Edit"
          >
            <Edit2 size={14} />
          </button>

          {row.status === "blocked" ? (
            <button
              onClick={() => handleStatus(row._id, "active")}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded text-sm hover:bg-green-100 transition"
              title="Activate"
            >
              <Unlock size={14} />
            </button>
          ) : (
            <button
              onClick={() => handleStatus(row._id, "blocked")}
              className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-sm hover:bg-yellow-100 transition"
              title="Block"
            >
              <Lock size={14} />
            </button>
          )}

          <button
            onClick={() => {
              setSelectedTeacherId(row._id);
              setShowDeleteModal(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Teachers List</h3>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* STATUS FILTER */}
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-3 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : teachers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No teachers found</div>
        ) : (
          <DataTable columns={columns} data={teachers} />
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200 flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-600">
            Page <span className="font-bold">{page}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onSuccess={fetchTeachers}
        />
      )}
      <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete Teacher"
  message="Are you sure you want to delete this teacher?"
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
/>
    </div>
  );
};

export default TeacherList;
