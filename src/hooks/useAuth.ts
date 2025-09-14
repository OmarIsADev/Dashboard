import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import {
  removeUserAndToken,
  setToken,
  setUser,
  type LoginUser,
} from "../store/slices/userSlice";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

interface returns {
  login: (email: string, password: string) => void;
  logout: () => void;
  user: LoginUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string;
  setError: React.Dispatch<string>;
}

function useAuth(): returns {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!["/"].includes(pathname) && !user.token) {
      navigate("/");
    } else if (pathname === "/" && user.token) {
      navigate("/dashboard");
    }

    if (user.token) {
      // pass img if exists or it creates default placeholder with first letter of each firstName and lastName
      dispatch(
        setUser({
          email: "admin@example.com",
          firstName: "John",
          lastName: "Doe",
          img: "",
        }),
      );
    }
  }, [navigate, pathname, user.token]);

  const login = (email: string, password: string) => {
    setIsLoading(true);

    // Call API endpoint instead
    if (email === "admin@example.com" && password === "admin") {
      // Handle api response
      dispatch(setToken("mocked-jwt-" + email));

      navigate("/dashboard");
      setIsLoading(false);
      toast.success("Logged in successfully");
    } else {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  const logout = () => dispatch(removeUserAndToken());

  return {
    login,
    logout,
    user,
    isLoading,
    isLoggedIn: !!user.token,
    error,
    setError,
  };
}

export default useAuth;
