import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosConfig from "../axiosConfig";

export default function SearchVolumes() {
  const [search, setSearch] = useState("");
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter search text.");
      return;
    }

    setLoading(true);
    setError("");
    setVolumes([]);

    try {
      const response = await AxiosConfig.get(
        `/volumes/search?search=${encodeURIComponent(search)}`
      );
      setVolumes(response.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Error while searching volumes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewIssues = (volumeId) => {
    navigate(`/volumes/${volumeId}/issues`);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Search volumes</h2>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          value={search}
          placeholder="Volume name (e.g. Spider-Man)"
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px 8px", marginRight: "8px", minWidth: 240 }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {volumes.length > 0 && (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Publisher</th>
              <th>Start year</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volumes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.publisher}</td>
                <td>{v.startYear}</td>
                <td>
                  {v.imageUrl && (
                    <img
                      src={v.imageUrl}
                      alt={v.name}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleViewIssues(v.id)}>
                    View issues
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && volumes.length === 0 && (
        <p>No volumes yet. Try searching by name.</p>
      )}
    </div>
  );
}
