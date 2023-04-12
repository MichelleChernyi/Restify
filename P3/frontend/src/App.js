import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'
import PropertyList from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/host" element={<HostIndex />} />
      <Route path="/" element={<PropertyList />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
