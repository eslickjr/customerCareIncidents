import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MyPieChart = () => (
    <>
        <div id="solChartTitleContainer">
            <h2 id="solChartTitle" className="chartTitle">Solutions for</h2>
            <div id="selectContainer">
                <div id="statsSolBar">
                    <select id="statsSolSelect" >
                        <option value="1">Online Account</option>
                        <option value="2">Payment</option>
                        <option value="3">Credit Score</option>
                    </select>
                </div>
            </div>
        </div>
        <ResponsiveContainer width="100%" aspect={1}>
            <PieChart width={400} height={400}>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </>
);

export default MyPieChart;