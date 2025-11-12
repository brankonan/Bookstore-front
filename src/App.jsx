import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Publishers from "./pages/Publishers";
import Books from "./pages/Books";
import BookForm from "./pages/BookForm";
import Login from "./pages/Login";
import { PrivateRoute, RoleRoute } from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="publishers" element={<Publishers />} />
          <Route path="books" element={<Books />} />

          <Route
            path="books/new"
            element={
              <PrivateRoute>
                <BookForm />
              </PrivateRoute>
            }
          />

          <Route
            path="books/:id/edit"
            element={
              <RoleRoute role="Urednik">
                <BookForm />
              </RoleRoute>
            }
          />

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
