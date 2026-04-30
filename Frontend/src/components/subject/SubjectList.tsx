import { useEffect, useState } from "react";
import {
  getSubjects,
  deleteSubject,
} from "../../services/subject.service";
import DataTable from "../common/DataTable";
import { Search, Trash2 } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, [search, page]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await getSubjects({ page, search });
      setSubjects(data.subjects);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  if (!selectedId) return;

  await deleteSubject(selectedId);

  setShowDeleteModal(false);
  fetchSubjects();
};

  const columns = [
    { key: "name", label: "Subject Name" },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <button
          onClick={() => {
  setSelectedId(row._id);
  setShowDeleteModal(true);
}}
          className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Subjects List</h3>

        {/* SEARCH */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search subject..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : subjects.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No subjects found</div>
        ) : (
          <DataTable columns={columns} data={subjects} />
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
  title="Delete Subject"
  message="Are you sure you want to delete this subject?"
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
/>
    </div>
  );
};

export default SubjectList;