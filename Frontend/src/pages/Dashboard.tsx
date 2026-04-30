import { useState } from "react";

import AttendanceForm from "../components/attendance/AttendanceForm";
import TeacherLayout from "../layout/TeacherLayout";
import AttendanceHistory from "../components/attendance/AttendenceHistory";
import AttendanceStats from "../components/attendance/attendanceStats";

const TeacherDashboard = () => {
  const [section, setSection] = useState("dashboard");

  const renderContent = () => {
    switch (section) {
      case "attendance":
        return <AttendanceForm />;

      case "history":
        return <AttendanceHistory />;

      default:
        return <AttendanceStats />;
    }
  };

  return (
    <TeacherLayout onSelect={setSection}>
      {renderContent()}
    </TeacherLayout>
  );
};

export default TeacherDashboard;