import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { removeUser, setUser, type LoginUser } from "../store/slices/userSlice";
import { useLocation, useNavigate } from "react-router";

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
    if (!["/"].includes(pathname) && !user.email) {
      navigate("/");
    }
  }, [navigate, pathname, user.email]);

  const login = (email: string, password: string) => {
    setIsLoading(true);

    // Call API endpoint instead
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem("token", "mocked-JWT-" + email);

      setTimeout(() => {
        // Handle api response
        // pass img if exists or it creates default placeholder with first letter of each firstName and lastName
        dispatch(
          setUser({ email, firstName: "John", lastName: "Doe", img: "" }),
        );

        navigate("/dashboard");
        setIsLoading(false);
      }, 100);
    } else {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
  };

  return {
    login,
    logout,
    user,
    isLoading,
    isLoggedIn: !!user.email,
    error,
    setError,
  };
}

export default useAuth;
