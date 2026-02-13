import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import "./index.css";
import { useState } from "react";


function App() {

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Home 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
         />} />
        <Route path = "/quiz" element={<Quiz 
        selectedCategory={selectedCategory}
         />} /> 
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );

  

}

export default App;