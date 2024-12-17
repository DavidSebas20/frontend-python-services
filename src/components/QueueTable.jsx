import React from "react";
import axios from "axios";

const QueueTable = ({ queue, refreshQueue }) => {
  const handleDelete = async (clientId) => {
    await axios.delete(`http://54.85.93.164:8000/remove_client/${clientId}`);
    refreshQueue(); // Actualiza la cola
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Prioridad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {queue.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.priority}</td>
            <td>
              <button onClick={() => handleDelete(client.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueTable;
