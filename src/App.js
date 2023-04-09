import Attractions from "./components/Attractions";
import NewAttraction from "./components/NewAttraction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Attractions />} />
          <Route path="/attraction/new" element={<NewAttraction />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
