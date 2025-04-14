import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CodeArena from './CodeArena';
import Problems from './Problems';
import Contests from './Contests';
import AboutUs from './Aboutus';
import Contact from './Contact';
import Tutorials from './Tutorials';
import Blog from './Blog';
import ProblemPage from './ProblemPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}

      <Routes>
        <Route path="/" element={<CodeArena />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/contests" element={<Contests />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/Blog' element={<Blog />} />
        <Route path='/problem/:id' element={<ProblemPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;