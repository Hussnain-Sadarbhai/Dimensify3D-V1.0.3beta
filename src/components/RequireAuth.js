import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
const isLoggedIn = Boolean(localStorage.getItem("dimensify3duserphoneNo"));
console.log("RequireAuth: isLoggedIn =", isLoggedIn);
if (!isLoggedIn) {
  return (
    <>
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
}


  return children;
};

export default RequireAuth;
