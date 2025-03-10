import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Online Account", sales: 400 },
  { name: "Payment", sales: 300 },
  { name: "Credit Score", sales: 500 },
];

const ChartIncPer = () => (
    <div id="incTypeChartContainer">
        <h2 className="chartTitle">Incidents by Type</h2>
        <ResponsiveContainer width="100%" aspect={2}>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default ChartIncPer;