

import { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ChartProps {
  chartTitle: string;
  incidents: number;
}

const ChartIncPer = (chartProps: ChartProps) => {
  const { chartTitle, incidents } = chartProps;

  const [data, setData] = useState<{ name: string; sales: number }[]>([]);

  useEffect(() => {
    const generateData = (length: number) => {
      let curIncidents = incidents;
      const dataSet = [];

      for (let i = 0; i < length; i++) {
        const data = {
          name: (i + 1).toString(),
          sales: Math.floor(Math.random() * (curIncidents*0.1) + 1),
        }
        curIncidents -= data.sales;
        dataSet.push(data);
      }

      return dataSet;
    };

    if (chartTitle === "24 hours") {
      setData(generateData(24));
    } else if (chartTitle === "Week") {
      setData(generateData(7));
    } else {
      setData(generateData(31));
    }
  }, [chartTitle]);

  return (
    <div id="incPerChart">
      <h2 className="chartTitle">Incidents from the Last {chartTitle}</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartIncPer;