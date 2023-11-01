import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Edit from './pages/edit/Edit';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
