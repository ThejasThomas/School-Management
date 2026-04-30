import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import ClassForm from "../components/class/ClassForm";
import ClassList from "../components/class/ClassList";
import StudentForm from "../components/student/StudentForm";
import StudentList from "../components/student/StudentList";
import SubjectList from "../components/subject/SubjectList";
import TeacherList from "../components/teacher/TeacherList";
import SubjectForm from "../components/subject/SubjectForm";
import PaymentAdmin from "../components/payment/PaymentAdmin";
import AdminHome from "./AdminHome";

const AdminDashboard = () => {
  const [section, setSection] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  const renderContent = () => {
    switch (section) {
      case "students":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <StudentForm onSuccess={refresh} />
            </div>
            <StudentList key={refreshKey} />
          </div>
        );

      case "classes":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ClassForm onSuccess={refresh} />
            </div>
            <ClassList key={refreshKey} />
          </div>
        );

      case "teachers":
        return <TeacherList />;

      case "subjects":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SubjectForm onSuccess={refresh} />
            </div>
            <SubjectList key={refreshKey} />
          </div>
        );

      case "payments":
        return <PaymentAdmin />;

      default:
        return <AdminHome />;
    }
  };

  return <AdminLayout onSelect={setSection}>{renderContent()}</AdminLayout>;
};

export default AdminDashboard;