import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import './App.css';
import JobDetails from "./pages/JobDetails";
import JobListings from './pages/JobListings';
import SignUpSeeker from './pages/SignUpSeeker';
import Login from './pages/Login';
import SignUpCompany from "./pages/SignUpCompany";
import ChooseRole from './pages/ChooseRole';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path='/signup' element={<ChooseRole />} />
        <Route path='/signup/seeker' element={<SignUpSeeker />} />
        <Route path='/signup/company' element={<SignUpCompany />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;