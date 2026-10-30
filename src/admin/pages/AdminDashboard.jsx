import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { FaBook, FaPeopleGroup, FaUser } from "react-icons/fa6";
import { getAllBooksAPI } from "../../services/allServices";
import {
  ResponsiveContainer,
  AreaChart,
  ReferenceLine,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Pie,
  PieChart,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { generateMockData, RechartsDevtools } from "@recharts/devtools";

const data = generateMockData(6, 823);
// #region Sample data
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

function AdminDashboard() {
  const [bookCount, setBookCount] = useState(0);
  useEffect(() => {
    getAllBooksAPI().then((res) => {
      setBookCount(res.data.length);
    });
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="md: grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 p-10">
          {/* grid card */}
          <div className="md: grid grid-cols-3 my-4">
            {/* card-1 */}

            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-orange-100 px-4 py-8 flex justify-center items-center text-5xl rounded">
                <FaBook />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Books</h3>
                  <h3 className="text-2xl">{bookCount}</h3>
                </div>
              </div>
            </div>
            {/* card-2 */}
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-blue-100 px-4 py-8 flex justify-center items-center text-5xl rounded">
                <FaUser />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Users</h3>
                  <h3 className="text-2xl">100+</h3>
                </div>
              </div>
            </div>
            {/* card-3 */}
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-green-100 px-4 py-8 flex justify-center items-center text-5xl rounded">
                <FaPeopleGroup />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Employees</h3>
                  <h3 className="text-2xl">10+</h3>
                </div>
              </div>
            </div>
          </div>
          {/* grid chart */}

          <div className="md: grid grid-cols-2 my-4 p-5">
            <div>
              {/* Book purchase Ration- Barchart */}

              <ResponsiveContainer width={"100%"} height={"300"}>
                {/* <AreaChart
                  data={data}
                >
                  <XAxis dataKey="name" />
                  <YAxis width="auto" />
                  <CartesianGrid />
                  <Tooltip />
                  <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                  <ReferenceLine
                    y={4000}
                    label="Max"
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="uv"
                  />
                </AreaChart> */}
                 <BarChart
      data={data}
    >
      <CartesianGrid />
      <XAxis dataKey="label" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="x" radius={[10, 10, 0, 0]} />
      <Bar dataKey="y" radius={[10, 10, 0, 0]} />
      <RechartsDevtools />
    </BarChart>
              </ResponsiveContainer>
            </div>
            <div>{/* growth ratio - pie chart */}
              <ResponsiveContainer width={"100%"} height={"300"}>
 <PieChart
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        stroke="white"
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        stroke="white"
        label
      />
    </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
