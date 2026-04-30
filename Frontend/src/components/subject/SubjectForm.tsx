import { useState } from "react";
import { createSubject } from "../../services/subject.service";
import { AlertCircle, CheckCircle, BookOpen } from "lucide-react";

const SubjectForm = ({ onSuccess }: any) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Subject name is required");
      return;
    }

    setLoading(true);
    try {
      await createSubject(name);
      setName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <BookOpen size={20} className="text-emerald-900" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Add New Subject</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <CheckCircle size={18} />
            <span className="text-sm">Subject created successfully!</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subject Name
          </label>
          <input
            type="text"
            placeholder="e.g., Mathematics, English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;