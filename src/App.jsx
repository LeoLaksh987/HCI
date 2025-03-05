import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CodeArena from './CodeArena';
import Problems from './Problems';

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}

      <Routes>
        <Route path="/" element={<CodeArena />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </Router>
  );
}

export default App;