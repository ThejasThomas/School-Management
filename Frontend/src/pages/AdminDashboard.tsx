import ClassForm from "../components/class/classForm";
import ClassList from "../components/class/ClassList";
import StudentForm from "../components/student/StudentForm";
import StudentList from "../components/student/StudentList";

const AdminDashboard = () => {
  const refresh = () => window.location.reload();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <StudentForm onSuccess={refresh} />
      <StudentList />

      <div className="grid grid-cols-2 gap-4">
        <ClassForm onSuccess={refresh} />
        <ClassList />
      </div>
    </div>

    
  );
};

export default AdminDashboard;