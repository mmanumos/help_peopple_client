import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/navbar';
import Persona from './components/persona/persona';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/persona" element={<Persona />} />
        </Routes>
      </Router>
      
      
    </div>
    
  );
}

export default App;
