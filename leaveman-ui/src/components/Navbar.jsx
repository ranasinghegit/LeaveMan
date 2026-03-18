import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/apply">Apply Leave</Link>{" | "}
      <Link to="/admin">Admin Panel</Link>{" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;