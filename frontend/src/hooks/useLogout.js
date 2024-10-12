import { useContext, useState } from "react";
import { FlashContext } from "../FlashContext";
import axios from 'axios';

const useLogout = () => {
  const { setFlash } = useContext(FlashContext);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const {data} = await axios.post("api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (data.errors) {
        throw new Error(data.error);
      }
   setFlash(data?.message,data?.description);
      return true;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
