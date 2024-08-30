import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const loading = userContext?.loading;

  if (loading) {
    return <p>Loading...</p>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
