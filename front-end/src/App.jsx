import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import './App.css';
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/job/:id' element={<JobDetails />} />
      </Routes>
    </Router>
  );
};

export default App;