import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'
import PropertyList from './components/PropertyList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/host" element={<HostIndex />} />
      <Route path="/" element={<PropertyList />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
