
import { Outlet } from "react-router-dom";
import HeaderTop from "../components/globals/HeaderTop";
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <HeaderTop />
      {children}
    </div>
  );
};

export default AuthLayout;
