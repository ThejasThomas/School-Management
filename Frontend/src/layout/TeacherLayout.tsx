import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, ClipboardList, History, Home } from "lucide-react";
import ConfirmModal from "../components/common/ConfirmModal";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "attendance", label: "Mark Attendance", icon: ClipboardList },
  { key: "history", label: "Attendance History", icon: History },
];

const TeacherLayout = ({ children, onSelect }: any) => {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    setActive(key);
    onSelect(key);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-blue-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-blue-900">
                LF
              </div>
              <div className="text-sm">
                <p className="font-bold">Little Flower</p>
                <p className="text-xs text-blue-200">Teacher Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active === item.key
                    ? "bg-amber-500 text-blue-900 font-semibold shadow-lg"
                    : "hover:bg-blue-700 text-white"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {active === "dashboard" && "Dashboard"}
              {active === "attendance" && "Mark Attendance"}
              {active === "history" && "Attendance History"}
            </h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
      <ConfirmModal
  isOpen={showLogoutModal}
  title="Logout Confirmation"
  message="Are you sure you want to logout?"
  onCancel={() => setShowLogoutModal(false)}
  onConfirm={() => {
    setShowLogoutModal(false);
    logout();
    navigate("/login");
  }}
/>
    </div>
  );
};

export default TeacherLayout;
