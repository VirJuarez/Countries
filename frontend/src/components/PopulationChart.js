import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PopulationChart({ populationData }) {
  return (
    <div className="population-chart">
      <h2>Population Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={populationData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}