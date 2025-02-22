import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useApp";
import { logout } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch(logout());
    navigate("/login");
    toast("log out successful");
  };

  return handleLogout;
};

export default useLogout;
