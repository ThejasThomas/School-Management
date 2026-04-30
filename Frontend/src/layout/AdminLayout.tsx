import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  CreditCard,
  LogOut,
  Menu,
  X,
  Briefcase,
} from "lucide-react";
import ConfirmModal from "../components/common/ConfirmModal";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "students", label: "Students", icon: Users },
  { key: "classes", label: "Classes", icon: BookOpen },
  { key: "subjects", label: "Subjects", icon: FileText },
  { key: "teachers", label: "Teachers", icon: GraduationCap },
  { key: "payments", label: "Payments", icon: CreditCard },
];

const AdminLayout = ({ children, onSelect }: any) => {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    setActive(key);
    onSelect(key);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white p-4 flex flex-col transition-all duration-300 shadow-lg`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "hidden"}`}
          >
            <div className="bg-amber-400 text-blue-900 p-2 rounded-lg">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold">Little Flower</h2>
              <p className="text-xs text-blue-200">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                onClick={() => handleClick(item.key)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  active === item.key
                    ? "bg-amber-400 text-blue-900 shadow-lg"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
        >
          <LogOut size={18} />
          {sidebarOpen && "Logout"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {menuItems.find((m) => m.key === active)?.label || "Dashboard"}
            </h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          </div>
          

          {/* MAIN CONTENT */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
      <ConfirmModal
  isOpen={showLogoutModal}
  title="Logout Confirmation"
  message="Are you sure you want to logout?"
  confirmText="Logout"
  onCancel={() => setShowLogoutModal(false)}
  onConfirm={() => {
    logout();
    navigate("/admin/login");
  }}
/>
    </div>
  );
};

export default AdminLayout;
