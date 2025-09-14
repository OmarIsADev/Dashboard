import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const initialState: {
  data: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
} = {
  data: [],
  status: "idle",
  error: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.data.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<number>) => {
      state.data.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      });
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.data.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
