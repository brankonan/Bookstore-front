import React, { useState } from "react";
import AxiosConfig from "../axiosConfig";

export default function ReviewModal({ book, onClose, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await AxiosConfig.post("reviews", {
        bookId: book.id,
        rating,
        comment,
      });
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError("Greska pri slanju recenzije.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Recenzija za: {book.title}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ocena (1-5):{" "}
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              required
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Komentar:
            <br />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              cols={32}
              placeholder="Opcioni komentar"
            />
          </label>
          <br />
          <button type="submit" disabled={loading}>
            Pošalji
          </button>{" "}
          <button type="button" onClick={onClose} disabled={loading}>
            Otkaži
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff; padding: 24px; border-radius: 6px; min-width: 320px;
        }
      `}</style>
    </div>
  );
}
