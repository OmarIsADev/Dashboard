import { useEffect } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePost } from "../store/slices/postsSlice";

function Posts() {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      Posts: {posts.status}
      <div>
        {posts.data.map((post) => (
          <div key={post.id} onClick={() => dispatch(removePost(post.id))}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
