import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = ({ className }) => {
  const { loading, logout } = useLogout();

  return (
    <div className={`mt-auto ${className}`}>
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-gray-400 cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
