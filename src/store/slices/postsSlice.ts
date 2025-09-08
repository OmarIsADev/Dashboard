import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: {
    id: number;
    name: string;
    email: string;
    body: string;
  };
}

const initialState: {
  data: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
} = {
  data: [],
  status: "idle",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { removePost } = postsSlice.actions;
export default postsSlice.reducer;
