import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

function AdminPanel() {
  const [leaves,setLeaves] = useState([]);

  //jwt decde role
  const token = localStorage.getItem("token");

const decoded = jwtDecode(token);

const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

if(role !== "Admin"){
    window.location.href="/dashboard";
}
  // apve adn reject 

  const loadLeaves = async () => {
    const res = await API.get("/leaves");
    setLeaves(res.data);
  };

  const approve = async (id) => { await API.put(`/leaves/approve/${id}`); loadLeaves(); };
  const reject = async (id) => { await API.put(`/leaves/reject/${id}`); loadLeaves(); };

  useEffect(()=>{ loadLeaves(); },[]);

  return (
    <div>
      <Navbar />
      <h2>Admin Panel</h2>
      {leaves.map(l=>(
        <div key={l.id}>
          {l.reason} - {l.status}
          <button onClick={()=>approve(l.id)}>Approve</button>
          <button onClick={()=>reject(l.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;