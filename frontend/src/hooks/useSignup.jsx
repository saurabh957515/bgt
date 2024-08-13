import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    full_name,
    username,
    password,
    confirmPassword,
    email
  }) => {
    const success = handleInputErrors({
      full_name,
      username,
      password,
      confirmPassword,
      email,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
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
      console.log(data)
      if (data.error) {
        toast.error(data.error)
        return;
      }
      setAuthUser(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  full_name,
  username,
  password,
  confirmPassword,
  email,
}) {
  if (!full_name || !username || !password || !confirmPassword || !email) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
