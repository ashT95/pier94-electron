import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Controller from './components/ControllerScreen/controller';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Controller />} />
      </Routes>
    </Router>
  );
}
