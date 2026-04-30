import { useEffect, useState } from "react";
import { getClasses } from "../../services/class.service";
import DataTable from "../common/DataTable";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClasses()
      .then(setClasses)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Class Name" },
    {
      key: "createdAt",
      label: "Created",
      render: (row: any) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Classes</h3>
      </div>
      <DataTable columns={columns} data={classes} />
      {classes.length === 0 && (
        <div className="p-6 text-center text-gray-500">No classes found</div>
      )}
    </div>
  );
};

export default ClassList;