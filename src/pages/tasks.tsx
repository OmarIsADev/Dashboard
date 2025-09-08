import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchTasks } from "../store/slices/tasksSlice";

function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return (
    <div>
      Tasks: {tasks.status}
      <div>
        {tasks.status === "succeeded" &&
          tasks.data.map((task) => <div key={task.id}>{task.title}</div>)}
      </div>
    </div>
  );
}

export default Tasks;
