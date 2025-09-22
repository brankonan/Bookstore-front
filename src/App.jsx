import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Publishers from "./pages/Publishers";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="publishers" element={<Publishers />} />
          <Route path="books" element={<Books />} />
          <Route poth="books/new" element={<CreateBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
