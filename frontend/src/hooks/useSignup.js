import { useContext, useState } from "react";
import { FlashContext } from "../FlashContext";
import { handleError } from "../provider";
import axios from "axios";

const useSignup = () => {
  const { setFlash } = useContext(FlashContext);
  const [loading, setLoading] = useState(false);
  const signup = async ({
    full_name,
    username,
    password,
    confirmPassword,
    email,
  }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/auth/signup",
        {
          full_name,
          username,
          password,
          confirmPassword,
          email,
        },
        { "Content-Type": "application/json" }
      );
      if (data.errors) {
        return data;
      }
      if (data?.status === "success") {
        setFlash(data?.message, data?.description);
        return data;
      }
    } catch (error) {
      console.log(handleError(error), "loading is complete...");

      return handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;
