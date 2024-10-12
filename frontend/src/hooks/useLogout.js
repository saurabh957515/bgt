import { useContext, useState } from "react";
import { FlashContext } from "../FlashContext";
import axios from 'axios';

const useLogout = () => {
  const { setFlash } = useContext(FlashContext);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("login-user");
      return true;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
