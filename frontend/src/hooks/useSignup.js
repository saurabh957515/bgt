import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
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
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          username,
          password,
          confirmPassword,
          email,
        }),
      });

      const data = await res.json();
      return data
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;
