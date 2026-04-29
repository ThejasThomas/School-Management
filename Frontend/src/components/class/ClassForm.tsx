import { useState } from "react";
import { createClass } from "../../services/class.service";

const ClassForm = ({ onSuccess }: any) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Class name is required");
      return;
    }

    try {
      await createClass(name);
      setName("");
      setError("");
      onSuccess(); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create class");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Add Class</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Class name (e.g., 10A)"
        className="w-full mb-2 p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Class
      </button>
    </form>
  );
};

export default ClassForm;