/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { store, type AppDispatch, type RootState } from "../store/store";
import { useEffect, useState } from "react";
import {
  addUser,
  fetchUsers,
  removeUser,
  type User,
} from "../store/slices/usersSlice";
import DataTable, { type columnType } from "../components/ui/data-table";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../components/ui/popover";
import { Ellipsis, Search } from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from "../components/ui/modal";
import { toast } from "sonner";
import { Link } from "react-router";

const usersColumns: columnType<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "UID",
  },
  {
    id: "name",
    header: "Name",
    Cell: ({ data }) => (
      <div className="flex flex-col">
        <p>{data.name}</p>
        <small>{data.email}</small>
      </div>
    ),
  },
  {
    id: "city",
    header: "city",
    Cell: ({ data }) => data.address.city,
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    Cell: ({ data }) => (
      <Popover>
        <PopoverTrigger className="flex w-full items-center justify-center">
          <Ellipsis />
        </PopoverTrigger>
        <PopoverContent>
          <Link to={`/users/${data.id}`}>
            <PopoverItem>View</PopoverItem>
          </Link>
          <Link to={`/users/${data.id}?mode=edit`}>
            <PopoverItem>Modify</PopoverItem>
          </Link>
          <PopoverItem
            className="transition duration-75 hover:text-red-500"
            onClick={() => {
              store.dispatch(removeUser(data.id));
              toast.success("User deleted");
            }}
          >
            Delete
          </PopoverItem>
        </PopoverContent>
      </Popover>
    ),
  },
];

function Users() {
  const users = useSelector((state: RootState) => state.users);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (users.data.length > 0) return;
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const event = e.target as {
      name: { value: string };
      username: { value: string };
      email: { value: string };
      street: { value: string };
      suite: { value: string };
      city: { value: string };
      zipcode: { value: string };
      phone: { value: string };
      website: { value: string };
    } & HTMLFormElement;

    const {
      name: { value: name },
      username: { value: username },
      email: { value: email },
      street: { value: street },
      suite: { value: suite },
      city: { value: city },
      zipcode: { value: zipcode },
      phone: { value: phone },
      website: { value: website },
    }: {
      name: { value: string };
      username: { value: string };
      email: { value: string };
      street: { value: string };
      suite: { value: string };
      city: { value: string };
      zipcode: { value: string };
      phone: { value: string };
      website: { value: string };
    } = event;

    const data: Omit<User, "id" | "img"> = {
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
      phone,
      website,
    };

    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error adding user");
    } else {
      dispatch(addUser(await res.json()));
      toast.success("User added successfully");
    }

    setIsLoading(false);
    setIsAddingUser(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          Prefix={Search}
          className="h-10"
          classNames={{ base: "max-w-64" }}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1">
          <Modal isOpen={isAddingUser} setIsOpen={setIsAddingUser}>
            <ModalTrigger className="w-fit truncate" variant="bordered">
              Add User
            </ModalTrigger>
            <ModalContent title="Add User">
              <UserForm handleAddUser={handleAddUser} isLoading={isLoading} />
            </ModalContent>
          </Modal>
          <Button
            className="w-fit"
            isLoading={users.status === "loading"}
            onClick={() => dispatch(fetchUsers())}
          >
            Refresh
          </Button>
        </div>
      </div>
      <DataTable<User>
        columns={usersColumns}
        data={users.data.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
        )}
      />
    </div>
  );
}

const UserForm = ({
  handleAddUser,
  isLoading,
}: {
  handleAddUser: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleAddUser(e)}>
      <p className="text-text-secondary text-lg">User Details</p>

      <div className="flex gap-4">
        <Input required label="Name" name="name" placeholder="e.g. John Doe" />
        <Input
          required
          label="Username"
          name="username"
          placeholder="e.g. johndoe"
        />
      </div>
      <Input
        required
        label="Email"
        name="email"
        placeholder="e.g. 8yTJ3@example.com"
        type="email"
      />
      <Input label="phone" name="phone" placeholder="e.g. 123456789" />
      <Input
        label="Website"
        name="website"
        placeholder="e.g. https://johndoe.com"
      />

      <p className="text-text-secondary mt-2 text-lg">Address Details</p>

      <div className="flex gap-4">
        <Input label="Street" name="street" placeholder="e.g. 123 Main St" />
        <Input label="Suite" name="suite" placeholder="e.g. Suite 123" />
      </div>
      <div className="flex gap-4">
        <Input required label="City" name="city" placeholder="e.g. New York" />
        <Input label="Zip Code" name="zipcode" placeholder="e.g. 12345" />
      </div>

      <div className="mt-2 flex gap-4">
        <ModalClose disabled={isLoading}>Cancel</ModalClose>
        <Button isLoading={isLoading}>Submit</Button>
      </div>
    </form>
  );
};

export default Users;
