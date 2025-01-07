import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SensorDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        ...newData
      }].slice(-20));
    };

    return () => ws.close();
  },[]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Environmental Monitor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Temperature (°C)</h2>
          <LineChart width={350} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[20, 30]} />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff0000" dot={false} />
          </LineChart>
        </div>

        {/* Humidity Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Humidity (%)</h2>
          <LineChart width={350} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[50, 70]} />
            <Tooltip />
            <Line type="monotone" dataKey="humidity" stroke="#0000ff" dot={false} />
          </LineChart>
        </div>

        {/* Pressure Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Pressure (hPa)</h2>
          <LineChart width={350} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[1000, 1020]} />
            <Tooltip />
            <Line type="monotone" dataKey="pressure" stroke="#00ff00" dot={false} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;