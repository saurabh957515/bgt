import { useContext, useState } from "react";
import { FlashContext } from "../FlashContext";
import axios from "axios";
import _ from "lodash";
import { handleError } from "../provider";

const useLogin = () => {
  const { setFlash } = useContext(FlashContext);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
        { "Content-Type": "application/json" }
      );
      if (data.error) {
        return data;
      } 
      if (data?.status === "success") {
        localStorage.setItem("user_name", data.username);
        setFlash(data?.message, data?.description);
        return data;
      }
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    // toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
