import { useEffect, useState } from "react";
import { getClasses } from "../../services/class.service";

const ClassList = () => {
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="font-bold mb-2">Classes</h2>

      {classes.map((cls) => (
        <div key={cls._id} className="border-b py-2">
          {cls.name}
        </div>
      ))}
    </div>
  );
};

export default ClassList;