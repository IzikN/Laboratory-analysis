import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputForm from "./pages/InputForm";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/results/:reference_id" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
