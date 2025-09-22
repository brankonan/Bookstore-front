import { useState, useEffect } from "react";
import { getAllPublishers } from "../services/publisherService";
import React from "react";
export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllPublishers();
      setPublishers(data);
    } catch (error) {
      setErrorMsg("Doslo je do greske");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: 12 }}>Ucitavanje izdavaca...</div>;
  if (errorMsg)
    return <div style={{ padding: 12, color: "crimson" }}>{errorMsg}</div>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Publishers</h2>
      {publishers.length === 0 ? (
        <p>Nema podataka.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((p) => (
                <tr key={p.id}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #eee",
  padding: "8px",
};
const td = { borderBottom: "1px solid #f2f2f2", padding: "8px" };
