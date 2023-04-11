import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostIndex from './components/Host'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/host" element={<HostIndex />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
