import React, { useState } from "react";
import axios from "axios";

const JoinForm = ({ refreshQueue }) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://54.85.93.164:8000/join_queue/`, null, {
      params: { name, priority },
    });
    setName("");
    setPriority(0);
    refreshQueue(); // Actualiza la cola
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Prioridad:
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          min="0"
        />
      </label>
      <button type="submit">Unirse a la Cola</button>
    </form>
  );
};

export default JoinForm;
