import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/student.service";

const StudentList = () => {
  const [students, setStudents] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    fetchData();
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-bold mb-2">Students</h2>

      {students.map((s) => (
        <div
          key={s._id}
          className="flex justify-between border-b py-2"
        >
          <span>{s.name} ({s.rollNumber})</span>

          <button
            onClick={() => handleDelete(s._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;