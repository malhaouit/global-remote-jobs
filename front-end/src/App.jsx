import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import './App.css';
import JobDetails from "./pages/JobDetails";
import JobListings from './pages/JobListings';
import SignUpSeeker from './pages/SignUpSeeker';
import SignUpCompany from "./pages/SignUpCompany";
import ChooseRole from './pages/ChooseRole';
import ConfirmEmail from './pages/ConfirmEmail';
import CreateSeekerProfile from './pages/CreateSeekerProfile';
import CreateCompanyProfile from './pages/CreateCompanyProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ModifySeekerProfile from './pages/ModifySeekerProfile';
import ModifyCompanyProfile from './pages/ModifyCompanyProfile';
import FindMyJob from './pages/FindMyJob';
import About from './components/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
        <Route path='/confirm-email' element={<ConfirmEmail />} />
        <Route path='/create-profile/seeker' element={<CreateSeekerProfile />} />
        <Route path='/create-profile/company' element={<CreateCompanyProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/modify-profile/seeker" element={<ModifySeekerProfile />} />
        <Route path="/modify-profile/company" element={<ModifyCompanyProfile />} />
        <Route path='/find-my-job' element={<FindMyJob />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact /> } />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;