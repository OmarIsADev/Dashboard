import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUsers, type User } from "../store/slices/usersSlice";
import { fetchPosts } from "../store/slices/postsSlice";
import { Card, CardGroup } from "../components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DataTable, { type columnType } from "../components/ui/data-table";
import { fetchTasks, type Task } from "../store/slices/tasksSlice";
import Chip from "../components/ui/chip";

const chartData = [
  { name: "Jan", sales: 4000, expenses: 2400 },
  { name: "Feb", sales: 3000, expenses: 1398 },
  { name: "Mar", sales: 2000, expenses: 9800 },
  { name: "Apr", sales: 2780, expenses: 3908 },
  { name: "May", sales: 1890, expenses: 4800 },
  { name: "Jun", sales: 2390, expenses: 3800 },
  { name: "Jul", sales: 3490, expenses: 4300 },
];

const usersChartData = [
  { name: "Jan", users: 80 },
  { name: "Feb", users: 22 },
  { name: "Mar", users: 27 },
  { name: "Apr", users: 33 },
  { name: "May", users: 19 },
  { name: "Jun", users: 15 },
  { name: "Jul", users: 40 },
];

const columns: columnType<Task & { user: User }>[] = [
  {
    header: "ID",
    accessorKey: "id",
    id: "id",
  },
  {
    header: "Title",
    id: "title",
    Cell: ({ data }) => <p className="line-clamp-2">{data.title}</p>,
  },
  {
    header: "Completed",
    Cell: ({ data }) =>
      data.completed ? (
        <Chip color="success">Completed</Chip>
      ) : (
        <Chip color="error">Incomplete</Chip>
      ),
    id: "completed",
  },
  {
    header: "assignee",
    id: "user",
    Cell: ({ data }) => <p className="line-clamp-2">{data.user.name}</p>,
  },
];

function Dashboard() {
  const data = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!data.users.data.length) {
      dispatch(fetchUsers());
    }

    if (!data.posts.data.length) {
      dispatch(fetchPosts());
    }

    if (!data.tasks.data.length) {
      dispatch(fetchTasks());
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <CardGroup>
        <Card analytic title="Posts">
          {data.posts.data.length}
        </Card>
        <Card analytic title="Users">
          {data.users.data.length}
        </Card>
        <Card analytic title="test">
          63
        </Card>
      </CardGroup>

      <div className="grid grid-cols-3 gap-4 max-2xl:grid-cols-1">
        <div className="col-span-2 space-y-4 max-2xl:col-span-1">
          <Card
            className="text-base"
            classNames={{ title: "text-xl text-text-dark font-bold mb-4" }}
            title="Sales"
          >
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#666666" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  wrapperClassName="rounded-lg shadow-md"
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "0.75rem",
                  }}
                />
                <Legend />
                <Line
                  activeDot={{ r: 8 }}
                  dataKey="sales"
                  stroke="#007bff"
                  type="monotone"
                />
                <Line
                  activeDot={{ r: 8 }}
                  dataKey="expenses"
                  stroke="#dc3545"
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card
            className="text-base"
            classNames={{ title: "text-xl text-text-dark font-bold mb-4" }}
            title="Engagement"
          >
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={usersChartData}>
                <CartesianGrid stroke="#666666" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  wrapperClassName="rounded-lg shadow-md"
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "0.75rem",
                  }}
                />
                <Legend />
                <Line
                  activeDot={{ r: 8 }}
                  dataKey="users"
                  stroke="#007bff"
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <DataTable
          striped
          columns={columns}
          header={<h2 className="text-xl font-bold">Tasks</h2>}
          data={
            data.tasks.data.map((task) => ({
              ...task,
              user: data.users.data.find((user) => user.id === task.userId),
            })) as unknown as (Task & { user: User })[]
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;
