/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks",
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
    );
    const data = await response.json();
    return data;
  },
);

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
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "completed">>) => {
      state.data.push({
        ...action.payload,
        id: (state.data.at(-1)?.id || 0) + 1,
        completed: false,
      });
    },

    toggleTask: (state, action: PayloadAction<number>) => {
      state.data.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      });
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
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

    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.status = "succeeded";

        action.payload.forEach((task: Task) => {
          state.data.some((t) => t.id === task.id) || state.data.push(task);
        });
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
