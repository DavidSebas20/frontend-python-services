import React, { useEffect, useState } from "react";
import axios from "axios";
import JoinForm from "./components/JoinForm";
import QueueTable from "./components/QueueTable";
import './App.css';


function App() {
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState("");

  const fetchQueue = async () => {
    const response = await axios.get(`http://54.85.93.164:8000/get_queue/`);
    setQueue(response.data);
  };

  const handleProcessNext = async () => {
    try {
      const response = await axios.post(`http://54.85.93.164:8000/process_next/`);
      setMessage(response.data.message);
      fetchQueue(); // Actualizar la cola
    } catch (error) {
      setMessage("No hay clientes en la cola.");
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div>
      <h1>Gestión de Turnos</h1>
      <JoinForm refreshQueue={fetchQueue} />
      <button onClick={handleProcessNext}>Atender Siguiente Cliente</button>
      {message && <p>{message}</p>}
      <QueueTable queue={queue} refreshQueue={fetchQueue} />
    </div>
  );
}

export default App;
