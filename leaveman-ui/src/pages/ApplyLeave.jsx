import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ApplyLeave() {
  const [fromDate,setFromDate]=useState("");
  const [toDate,setToDate]=useState("");
  const [reason,setReason]=useState("");

  const applyLeave = async (e) => {

    e.preventDefault();

    try{

      await API.post("/leaves",{
        fromDate,
        toDate,
        reason,
        // userId:9
      });

      alert("Leave applied successfully");

      setFromDate("");
      setToDate("");
      setReason("");

    }catch(err){

      console.error(err);
      // console.log(err);
      alert("Failed to apply leave");

    }

  }

  return (
    <div>
      <Navbar />
      <h2>Apply Leave</h2>
      <input type="date" onChange={(e)=>setFromDate(e.target.value)}/>
      <input type="date" onChange={(e)=>setToDate(e.target.value)}/>
      <input placeholder="Reason" onChange={(e)=>setReason(e.target.value)}/>
      <button onClick={applyLeave}>Apply</button>
    </div>
  );
}

export default ApplyLeave;