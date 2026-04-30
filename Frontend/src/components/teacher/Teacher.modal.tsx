import { useEffect, useState } from "react";
import { updateTeacher } from "../../services/teacher.service";
import { getClasses } from "../../services/class.service";
import { getSubjects } from "../../services/subject.service";

const TeacherModal = ({ teacher, onClose, onSuccess }: any) => {
  const [form, setForm] = useState({
    subjectId: "",
    experience: "",
    contactInfo: "",
    qualification: "",
    classId: "",
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
  getClasses().then(setClasses);
  getSubjects({ page: 1 }).then((res) => setSubjects(res.subjects));

  if (teacher) {
    setForm({
      subjectId: teacher.subjectId?._id || "",
      experience: teacher.experience || "",
      contactInfo: teacher.contactInfo || "",
      qualification: teacher.qualification || "",
      classId: teacher.classId?._id || "",
    });
  }
}, [teacher]);

  const handleSubmit = async () => {
    await updateTeacher(teacher._id, {
      ...form,
      experience: Number(form.experience),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-3">Approve Teacher</h2>

        <select
  className="w-full mb-2 p-2 border"
  value={form.subjectId}
  onChange={(e) =>
    setForm({ ...form, subjectId: e.target.value })
  }
>
  <option value="">Select Subject</option>
  {subjects.map((sub) => (
    <option key={sub._id} value={sub._id}>
      {sub.name}
    </option>
  ))}
</select>

        <input
          placeholder="Experience"
          className="w-full mb-2 p-2 border"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <input
          placeholder="Contact"
          className="w-full mb-2 p-2 border"
          value={form.contactInfo}
          onChange={(e) =>
            setForm({ ...form, contactInfo: e.target.value })
          }
        />

        <input
          placeholder="Qualification"
          className="w-full mb-2 p-2 border"
          value={form.qualification}
          onChange={(e) =>
            setForm({ ...form, qualification: e.target.value })
          }
        />

        <select
          className="w-full mb-3 p-2 border"
          value={form.classId}
          onChange={(e) =>
            setForm({ ...form, classId: e.target.value })
          }
        >
          <option value="">Assign Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;