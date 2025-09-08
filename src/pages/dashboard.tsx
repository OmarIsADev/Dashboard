import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchUsers } from "../store/slices/usersSlice";

function Dashboard() {
  const users = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      users: {users.status}
      <div>
        {users.data.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
