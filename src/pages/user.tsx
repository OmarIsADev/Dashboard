/* eslint-disable react-hooks/exhaustive-deps */
import { Edit2, Ellipsis, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  type SetURLSearchParams,
} from "react-router";
import { toast } from "sonner";
import Button from "../components/ui/button";
import { Card } from "../components/ui/card";
import Input from "../components/ui/input";
import {
  fetchUserPosts,
  removePost,
  type Post,
} from "../store/slices/postsSlice";
import { modifyUser, type User as UserType } from "../store/slices/usersSlice";
import type { AppDispatch, RootState } from "../store/store";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../components/ui/popover";

function User() {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch: AppDispatch = useDispatch();

  const data = useSelector((state: RootState) => state);

  const user: UserType | undefined = data.users.data?.find(
    (user) => user.id === Number(userId),
  );
  const posts: Post[] = data.posts.data.filter(
    (post) => post.userId === Number(userId),
  );

  const mode: "default" | "edit" =
    (searchParams.get("mode") as "edit" | undefined) ?? "default";

  useEffect(() => {
    if (posts.length > 0 || !user?.id) return;

    dispatch(fetchUserPosts(user?.id));
  }, [user]);

  if (data.users.status === "loading") return <div>Loading...</div>;

  if (!user || data.users.status === "failed")
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <h1 className="font-boldl text-lg">404 User Not found</h1>
        <Button className="w-fit">
          <Link to="/users">Go back?</Link>
        </Button>
      </div>
    );

  if (mode === "default")
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <UserHero
          mode="default"
          setSearchParams={setSearchParams}
          user={user}
        />

        <Card title="Recent posts:">
          {posts.length > 0
            ? posts.map((post) => (
                <Post key={post.id} post={post} user={user} />
              ))
            : "No posts"}
        </Card>
      </div>
    );
  else
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <UserHero mode="edit" setSearchParams={setSearchParams} user={user} />

        <Card title="Edit user:">
          <Form setSearchParams={setSearchParams} user={user} />
        </Card>
      </div>
    );
}

const UserHero = ({
  user,
  setSearchParams,
  mode,
}: {
  user: UserType;
  setSearchParams: SetURLSearchParams;
  mode: "default" | "edit";
}) => {
  return (
    <div className="bg-primary-dark text-text-light relative flex flex-col items-center justify-center gap-4 rounded-lg p-4 text-center">
      <img
        alt={user.name}
        className="border-border-light bg-primary-light size-24 rounded-full border"
        src={user.img}
      />
      <div>
        <h1 className="text-xl font-semibold">{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <img
        className="absolute top-0 left-0 z-10 h-full w-full rounded-lg object-cover"
        src="/bg-mockup.png"
      />

      {mode === "default" ? (
        <Edit2
          className="absolute top-4 right-4 z-50 cursor-pointer hover:scale-110"
          onClick={() => setSearchParams({ mode: "edit" })}
        />
      ) : (
        <X
          className="absolute top-4 right-4 z-50 cursor-pointer hover:scale-110"
          onClick={() => setSearchParams({ mode: "default" })}
        />
      )}
    </div>
  );
};

const Post = ({ post, user }: { post: Post; user: UserType }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    toast.info(`Deleting post ${post.id}...`);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      dispatch(removePost(post.id));
      toast.success("Post deleted");
    }
  };

  return (
    <div
      className="border-border-light flex flex-col gap-2 border-b p-4 nth-last-[1]:border-0"
      key={post.id}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-end">
          <img
            alt={post.title}
            className="size-12 rounded-full"
            src={user.img}
          />
          <div>
            <p className="text-sm">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <Ellipsis className="cursor-pointer" />
          </PopoverTrigger>

          <PopoverContent>
            <PopoverItem onClick={handleDelete}>Delete</PopoverItem>
          </PopoverContent>
        </Popover>
      </div>
      <h3 className="font-semibold">{post.title}</h3>
      <p className="text-pretty">{post.body}</p>
    </div>
  );
};

const Form = ({
  user,
  setSearchParams,
}: {
  user: UserType;
  setSearchParams: SetURLSearchParams;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [form, setForm] = useState<UserType>(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // handle api
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + user.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      dispatch(modifyUser(await res.json()));
      setSearchParams({ mode: "default" });

      toast.success("User updated");
    }

    setIsLoading(false);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <Input
          required
          label="Name"
          name="name"
          placeholder="e.g. John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          required
          label="Username"
          name="username"
          placeholder="e.g. johndoe"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <Input
        required
        label="Email"
        name="email"
        placeholder="e.g. 8yTJ3@example.com"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Phone"
        name="phone"
        placeholder="e.g. 123456789"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <Input
        label="Website"
        name="website"
        placeholder="e.g. https://example.com"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />

      <div className="flex gap-4">
        <Input
          required
          label="Street"
          name="street"
          placeholder="e.g. 123 Main St"
          value={form.address.street}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, street: e.target.value },
            })
          }
        />
        <Input
          required
          label="Suite"
          name="suite"
          placeholder="e.g. Suite 123"
          value={form.address.suite}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, suite: e.target.value },
            })
          }
        />
      </div>
      <div className="flex gap-4">
        <Input
          required
          label="City"
          name="city"
          placeholder="e.g. New York"
          value={form.address.city}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, city: e.target.value },
            })
          }
        />
        <Input
          required
          label="Zipcode"
          name="zipcode"
          placeholder="e.g. 12345"
          value={form.address.zipcode}
          onChange={(e) =>
            setForm({
              ...form,
              address: { ...form.address, zipcode: e.target.value },
            })
          }
        />
      </div>

      <Button isLoading={isLoading} type="submit">
        Save
      </Button>
    </form>
  );
};

export default User;
