import { Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/display" element={<DisplayPage />} />
    </Routes>
  );
}

export default App;
