import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, createBook, updateBook } from "../services/bookService";
import { getAllPublishers } from "../services/publisherService";
import { getAllAuthors } from "../services/authorService";
import React from "react";

export default function BookForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    pageCount: 0,
    publishedDate: "",
    isbn: "",
    authorId: 0,
    publisherId: 0,
  });

  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const pubs = await getAllPublishers();
        setPublishers(pubs);
        const auths = await getAllAuthors();
        setAuthors(auths);

        if (isEdit) {
          const book = await getBookById(id);
          setForm({
            title: book.title,
            pageCount: book.pageCount,
            publishedDate: book.publishedDate.slice(0, 10),
            isbn: book.isbn,
            authorId: book.authorId,
            publisherId: book.publisherId,
          });
        } else {
          setForm((f) => ({
            ...f,
            publisherId: pubs[0]?.id ?? 0,
            authorId: pubs[0]?.id ?? 0,
          }));
        }
      } catch (err) {
        setErrorMsg("greska pri ucitavanju podataka");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        Title: form.title,
        PageCount: form.pageCount,
        PublishedDate: form.publishedDate,
        ISBN: form.isbn,
        AuthorId: form.authorId,
        PublisherId: form.publisherId,
      };
      if (isEdit) {
        payload.id = Number(id);
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }
      navigate("/books");
    } catch (err) {
      setErrorMsg("Greska pri ucitavanju");
      console.error("Save error:", err);
    }
  }

  if (loading) return <div style={{ padding: 12 }}>Ucitavanje…</div>;
  if (errorMsg)
    return <div style={{ padding: 12, color: "crimson" }}>{errorMsg}</div>;

  return (
    <div style={{ padding: 12 }}>
      <h2>{isEdit ? "Edit book" : "Create book"}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 400 }}
      >
        <label>
          Title:
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label>
          Page count:
          <input
            type="number"
            value={form.pageCount}
            onChange={(e) =>
              setForm({ ...form, pageCount: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Published date:
          <input
            type="date"
            value={form.publishedDate}
            onChange={(e) =>
              setForm({ ...form, publishedDate: e.target.value })
            }
          />
        </label>
        <label>
          ISBN:
          <input
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          />
        </label>
        <label>
          Author:
          <select
            value={form.authorId}
            onChange={(e) =>
              setForm({ ...form, authorId: Number(e.target.value) })
            }
          >
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.fullName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Publisher:
          <select
            value={form.publisherId}
            onChange={(e) =>
              setForm({ ...form, publisherId: Number(e.target.value) })
            }
          >
            {publishers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/books")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
