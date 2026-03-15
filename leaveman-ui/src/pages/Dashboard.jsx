import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves/my-leaves");

      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  // for cancl
  const cancelLeave = async (id) => {
    try {
      await API.delete(`/leaves/${id}`);

      alert("cancelled");

      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  // for up
  const updateLeave = async (leave) => {
    const newReason = prompt("Update reason", leave.reason);

    if (!newReason) return;

    try {
      await API.put(`/leaves/${leave.id}`, {
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        reason: newReason,
      });

      alert("updated");

      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>My Leaves</h2>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>

              <td>
                {leave.status === "Pending" && (
                  <>
                    <button onClick={() => updateLeave(leave)}>Edit</button>

                    <button onClick={() => cancelLeave(leave.id)}>Cancel</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ----------- */}
    </div>
  );
}

export default Dashboard;
