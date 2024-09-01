import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { onLoggedin } from "../actions";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        return data;
      }
      localStorage.setItem("login-user", JSON.stringify(data));
      dispatch(onLoggedin(true));
      return true;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
