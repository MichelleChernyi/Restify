import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'
import PropertyList from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PropertyDetails from './components/PropertyDetails';
import Logout from './components/Logout';
import Profile from './components/Profile';

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
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
