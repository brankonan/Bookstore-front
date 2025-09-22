import React from "react";
import { useState, useEffect } from "react";
import { getAllBooks, deleteBook } from "../services/bookService";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      setErrorMsg("Doslo je do greske prilikom ucitavanja knjiga");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da zelite da obrisete knjigu?"))
      return;
    try {
      await deleteBook(id);
      await fetchData();
    } catch (err) {
      alert("greska pri brisanju knjige");
    }
  };

  if (loading) return <div style={{ padding: 12 }}>Ucitavanje knjiga…</div>;
  if (errorMsg)
    return <div style={{ padding: 12, color: "crimson" }}>{errorMsg}</div>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Books</h2>
      <Link to="/books/new">Create book</Link>
      {books.length === 0 ? (
        <p>Nema knjiga u bazi.</p>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table style={{ borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Title</th>
                <th style={th}>Pages</th>
                <th style={th}>Published</th>
                <th style={th}>ISBN</th>
                <th style={th}>Author</th>
                <th style={th}>Publisher</th>
                <th style={th}>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td style={td}>{b.id}</td>
                  <td style={td}>{b.title}</td>
                  <td style={td}>{b.pageCount}</td>
                  <td style={td}>
                    {b.publishedDate
                      ? new Date(b.publishedDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td style={td}>{b.isbn}</td>
                  <td style={td}>{b.author ? b.author.fullName : "—"}</td>
                  <td style={td}>{b.publisher ? b.publisher.name : "—"}</td>
                  <td style={td}>
                    <button onClick={() => handleDelete(b.id)}>Delete</button>
                  </td>
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
