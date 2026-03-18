import { useState } from "react";
import API from "../services/api";

function Register() {
  const [username,setUsername] = useState("");
  const [passwordHash,setPasswordHash]=useState("");
  const [role,setRole]=useState("Employee");

  const handleRegister = async () => {
    try {
      await API.post("/users", { username,passwordHash,role });
      alert("Registered Successfully");
      // to login
      window.location.href="/";
    } catch (error) {
  console.error(error);
  alert("Registration Failed");
}
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={(e)=>setPasswordHash(e.target.value)}/>
      <select onChange={(e)=>setRole(e.target.value)}>
        {/* saparate later below */}
        <option>Employee</option>
        <option>Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;