import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'
import PropertyList from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PropertyDetails from './components/PropertyDetails';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Notification from './components/Notification';
import ProfileView from './components/ProfileView';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/host" element={<HostIndex />} />
      <Route path="/" element={<PropertyList />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/profile/:id" element={<ProfileView />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
