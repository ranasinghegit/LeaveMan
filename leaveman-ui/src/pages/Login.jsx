import { useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        username: username,
        passwordHash: passwordHash,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      alert("Login Successful");
// //ddecode and create role based
      const decoded = jwtDecode(token);
      console.log(decoded);

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(role);
      if (role === "Admin") 
        window.location.href = "/admin";
      else 
        window.location.href = "/dashboard";

      // window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <h2>Login</h2>

        {error && <p>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
