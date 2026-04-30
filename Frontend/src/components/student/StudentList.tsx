import { useEffect, useState } from "react";
import { deleteStudent, getStudents } from "../../services/student.service";
import { getClasses } from "../../services/class.service";
import DataTable from "../common/DataTable";
import { useDebounce } from "../common/debounce.hook";
import { Search, Filter, Trash2, Pencil } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";
import StudentForm from "./StudentForm";

interface ClassType {
  _id: string;
  name: string;
}

interface StudentType {
  _id: string;
  name: string;
  rollNumber: number;
  age: number;
  contactInfo: string;
  classId?: {
    _id: string;
    name: string;
  };
}

const StudentList = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [editStudentData, setEditStudentData] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [selectedClass, debouncedSearch, page]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents({
        page,
        search: debouncedSearch,
        classId: selectedClass,
      });

      const formatted = data.students.map((s: any) => ({
        ...s,
        className: s.classId?.name || "N/A",
      }));

      setStudents(formatted);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
  if (!selectedStudentId) return;

  await deleteStudent(selectedStudentId);

  setShowDeleteModal(false);
  fetchStudents();
};

const handleEdit = (student: StudentType) => {
  setEditStudentData(student);
  setShowEditModal(true);
};

const columns = [
  { key: "name", label: "Name" },
  { key: "rollNumber", label: "Roll No" },
  { key: "age", label: "Age" },
  { key: "contactInfo", label: "Contact" },
  { key: "className", label: "Class" },
  {
    key: "actions",
    label: "Actions",
    render: (row: StudentType) => (
      <div className="flex gap-2">
        {/* EDIT */}
        <button
          onClick={() => handleEdit(row)}
          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
        >
          <Pencil size={16} />
        </button>

        {/* DELETE */}
        <button
          onClick={() => {
            setSelectedStudentId(row._id);
            setShowDeleteModal(true);
          }}
          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Students List</h3>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* CLASS FILTER */}
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-3 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedClass}
              onChange={(e) => {
                setPage(1);
                setSelectedClass(e.target.value);
              }}
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : students.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No students found</div>
        ) : (
          <DataTable columns={columns} data={students} />
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
      <ConfirmModal
  isOpen={showDeleteModal}
  title="Delete Student"
  message="Are you sure you want to delete this student?"
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
/>

{showEditModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold mb-4">Edit Student</h2>

      <StudentForm
        initialData={editStudentData}
        isEdit
        onSuccess={() => {
          setShowEditModal(false);
          fetchStudents();
        }}
      />

      <button
        onClick={() => setShowEditModal(false)}
        className="mt-4 text-sm text-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default StudentList;
