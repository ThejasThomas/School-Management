import { useState } from "react";
import { studentSchema } from "../../validations/student.validation";
import { createStudent } from "../../services/student.service";

const StudentForm = ({ onSuccess }: any) => {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    age: "",
    contactInfo: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsed = studentSchema.parse({
        ...form,
        rollNumber: Number(form.rollNumber),
        age: Number(form.age),
      });

      await createStudent(parsed);

      setForm({
        name: "",
        rollNumber: "",
        age: "",
        contactInfo: "",
      });

      onSuccess();
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Validation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Add Student</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        placeholder="Name"
        className="w-full mb-2 p-2 border"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Roll Number"
        className="w-full mb-2 p-2 border"
        value={form.rollNumber}
        onChange={(e) =>
          setForm({ ...form, rollNumber: e.target.value })
        }
      />

      <input
        placeholder="Age"
        className="w-full mb-2 p-2 border"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <input
        placeholder="Contact"
        className="w-full mb-2 p-2 border"
        value={form.contactInfo}
        onChange={(e) =>
          setForm({ ...form, contactInfo: e.target.value })
        }
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;