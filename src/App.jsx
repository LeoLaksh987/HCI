import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './Navbar';
import CodeArena from './CodeArena';
import Problems from './Problems';
import Contests from './Contests';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Tutorials from './Tutorials';
import Blog from './Blog';
import ProblemPage from './ProblemPage';
import Profile from "./components/Profile";

// In your router configuration
{/* <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/problems" element={<Problems />} />
  <Route path="/contests" element={<Contests />} />
  
  other routes */}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CodeArena />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;