import { useEffect, useState } from "react";
import { studentSchema } from "../../validations/student.validation";
import { createStudent, updateStudent } from "../../services/student.service";
import { getClasses } from "../../services/class.service";
import { AlertCircle, CheckCircle, Users } from "lucide-react";

const StudentForm = ({ onSuccess, initialData, isEdit  }: any) => {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    age: "",
    contactInfo: "",
    classId: "",
  });

  interface ClassType {
  _id: string;
  name: string;
}

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);
  
  useEffect(() => {
  if (initialData) {
    setForm({
      name: initialData.name,
      rollNumber: initialData.rollNumber,
      age: initialData.age,
      contactInfo: initialData.contactInfo,
      classId: initialData.classId?._id || "",
    });
  }
}, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const parsed = studentSchema.parse({
        ...form,
        rollNumber: Number(form.rollNumber),
        age: Number(form.age),
      });

      if (isEdit) {
  await updateStudent(initialData._id, parsed);
} else {
  await createStudent(parsed);
}

      setForm({
        name: "",
        rollNumber: "",
        age: "",
        contactInfo: "",
        classId: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess();
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Users size={20} className="text-purple-900" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Add New Student</h2>
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
            <span className="text-sm">Student added successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Roll Number
            </label>
            <input
              type="number"
              placeholder="Roll No"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.rollNumber}
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Info
            </label>
            <input
              type="text"
              placeholder="Phone/Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.contactInfo}
              onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Class
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.classId}
              onChange={(e) => setForm({ ...form, classId: e.target.value })}
              disabled={loading}
            >
              <option value="">Choose a class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;