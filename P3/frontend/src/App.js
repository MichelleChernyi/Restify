import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'
import PropertyList from './components/Home';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/host" element={<HostIndex />} />
      <Route path="/" element={<PropertyList />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
