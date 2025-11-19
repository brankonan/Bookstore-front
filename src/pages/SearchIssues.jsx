import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosConfig from "../axiosConfig";

export default function SearchIssues() {
  const { volumeId } = useParams();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      if (!volumeId) return;

      setLoading(true);
      setError("");
      setIssues([]);
      setSelectedIssue(null);
      setPrice("");
      setStock("");
      setSaveMessage("");

      try {
        const response = await AxiosConfig.get(
          `/volumes/issues?volumeId=${encodeURIComponent(volumeId)}`
        );
        setIssues(response.data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.response?.data ||
            err.message ||
            "Error while loading issues."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [volumeId]);

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setPrice("");
    setStock("");
    setSaveMessage("");
  };

  const handleSaveLocal = async (e) => {
    e.preventDefault();
    setSaveMessage("");

    if (!selectedIssue) {
      setSaveMessage("Please select an issue first.");
      return;
    }

    if (!price || !stock) {
      setSaveMessage("Please enter price and stock.");
      return;
    }

    try {
      const payload = {
        comicVineIssueId: selectedIssue.id,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      };

      const response = await AxiosConfig.post("/volumes/local-issues", payload);
      setSaveMessage(
        `Issue "${selectedIssue.name}" saved locally with id ${
          response.data.id || ""
        }.`
      );
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data || err.message || "Error while saving local issue.";
      setSaveMessage(msg);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Issues for volume {volumeId}</h2>

      {loading && <p>Loading issues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {issues.length > 0 && (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Issue #</th>
              <th>Release date</th>
              <th>Pages</th>
              <th>Cover</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.issueNumber}</td>
                <td>{i.releaseDate}</td>
                <td>{i.pageCount}</td>
                <td>
                  {i.coverUrl && (
                    <img
                      src={i.coverUrl}
                      alt={i.name}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleSelectIssue(i)}>
                    Save locally
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && issues.length === 0 && (
        <p>No issues for this volume (or nothing loaded).</p>
      )}

      {selectedIssue && (
        <div style={{ marginTop: "16px" }}>
          <h3>Save issue locally</h3>
          <p>
            Selected: <strong>{selectedIssue.name}</strong> (#
            {selectedIssue.issueNumber})
          </p>

          <form onSubmit={handleSaveLocal}>
            <div style={{ marginBottom: "8px" }}>
              <label>
                Price:{" "}
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div style={{ marginBottom: "8px" }}>
              <label>
                Stock:{" "}
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Save</button>
          </form>

          {saveMessage && (
            <p style={{ marginTop: "8px", color: "blue" }}>{saveMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
