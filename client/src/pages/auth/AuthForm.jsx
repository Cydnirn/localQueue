import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
    <div className="main">
        <Outlet />
    </div>
  );
}

export default AuthPage;